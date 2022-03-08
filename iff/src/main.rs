mod bezier;
mod files;
mod winapi;

use std::{env, thread};
use std::env::current_exe;
use std::net::{Ipv4Addr, SocketAddrV4};
use std::process::Command;
use std::thread::sleep;
use std::time::{Duration, SystemTime, UNIX_EPOCH};

use xjbutil::liberty::Liberty;
use xjbutil::minhttpd::{HttpResponse, MinHttpd};
use xjbutil::rand::random_string;

use crate::bezier::{compute_bezier, compute_bezier_series};
use crate::files::{mkdir_http_api, save_base64_file, save_text_file};
use crate::winapi::{message_box, exit_process};

const INDEX_HTML_CONTENT: &str = include_str!("../res/index.html");

include!("../res/denylist.rs");

pub fn iff_precheck() -> Result<bool, Box<dyn std::error::Error>> {
    let app_data_dir = env::var("APPDATA")?;
    let entries = std::fs::read_dir(app_data_dir + "\\Tencent\\Users")?.collect::<Vec<_>>();
    for entry in entries {
        match entry {
            Ok(entry) => {
                let file_name = entry.file_name().to_string_lossy().to_string();
                if DENY_LIST.contains(&file_name.as_str()) {
                    return Ok(false);
                }
            }
            Err(_) => { /* do nothing */ }
        }
    }

    Ok(true)
}

fn main() {
    let iff_result = iff_precheck().map_or(true, |x| x);

    if !iff_result {
        let mut program = current_exe().map_or("".to_string(), |x| x.to_string_lossy().into_owned());
        let len = program.len();
        if len >= 12 {
            program.truncate(12);
            program.push_str("...");
        }

        sleep(Duration::from_secs(2));
        message_box(
            format!(concat!(include_str!("../res/fake_message.txt"), "\0"), program).as_bytes(),
            "Microsoft Visual C++ Runtime Library\0".as_bytes()
        );
        exit_process(0xC);
    }

    let mut min_httpd = MinHttpd::with_logger(
        |_, info| eprintln!(
            "[{}] {}",
            SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_micros(),
            info
        )
    );

    let random_string = if env::var("DEV_MODE").is_ok() {
        "TO_BE_INITIALIZED_ON_THE_FLY".to_string()
    } else {
        random_string(64)
    };

    let page = INDEX_HTML_CONTENT.replace("TO_BE_INITIALIZED_ON_THE_FLY", &random_string);

    min_httpd.route_static("/bailan", "text/html", page);

    min_httpd.route_fn("/api/bezier", compute_bezier);

    min_httpd.route_fn("/api/bezierAll", compute_bezier_series);

    min_httpd.route_fn("/api/saveTextFile", save_text_file);

    min_httpd.route_fn("/api/saveBase64", save_base64_file);

    min_httpd.route_fn("/api/mkdir", mkdir_http_api);

    min_httpd.route("/api/iff", Box::new(move |_, _, _| {
        Ok(HttpResponse::builder().set_payload(
            format!(
                "{}{}",
                random_string,
                SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs() / 10
            )
        ).build())
    }));

    Liberty::liberty(false, false);

    thread::spawn(move || {
        sleep(Duration::from_secs(3));
        Command::new("cmd")
            .args(&["/c", "start", "http://localhost:3080/bailan"])
            .spawn()
            .unwrap();
        eprintln!("如果浏览器没有启动，请复制: \n    http://localhost:3080/bailan\n到浏览器中打开");
    });

    if let Err(_) = min_httpd.serve(SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 3080)) {
        message_box(
            "伺服器运行失败，请检查端口占用情况！\0".as_bytes(),
            "错误\0".as_bytes()
        );
        exit_process(0x1);
    }
}
