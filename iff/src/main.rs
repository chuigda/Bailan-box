mod bezier;
mod justice;
mod winapi;

use std::collections::HashMap;
use std::{env, thread};
use std::env::current_exe;
use std::net::{Ipv4Addr, SocketAddrV4};
use std::process::Command;
use std::thread::sleep;
use std::time::{Duration, SystemTime, UNIX_EPOCH};

use xjbutil::minhttpd::{HttpResponse, MinHttpd};

use crate::bezier::{compute_bezier, compute_bezier_series};
use crate::justice::{
    iff_precheck,
    user_speaks_angliskiy,
    user_speaks_kitaiskiy
};
use crate::winapi::{message_box, exit_process};

const INDEX_HTML_CONTENT: &str = include_str!("../res/index.html");

unsafe fn pseudo_random() -> u128 {
    static mut SEED: u128 = 114514;
    static mut INIT: bool = false;

    if !INIT {
        SEED = SEED.wrapping_mul(SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_micros());
        INIT = true;
    }

    SEED = SEED.wrapping_mul(19260817).wrapping_add(19660813);
    SEED
}

unsafe fn pseudo_random_string_lossy(bytes: usize) -> String {
    let mut result = Vec::new();

    for _ in 0..bytes {
        result.push((pseudo_random() % 95 + 31) as u8);
    }

    String::from_utf8_lossy(&result).to_string()
}

unsafe fn pseudo_random_string(bytes: usize) -> String {
    let mut s = Vec::new();
    for _ in 0..bytes {
        s.push((pseudo_random() % 26 + 97) as u8);
    }

    String::from_utf8_lossy(&s).to_string()
}

fn example_handler(
    _: HashMap<String, String>,
    params: HashMap<String, String>,
    _: Option<String>
) -> Result<HttpResponse, Box<dyn std::error::Error>> {
    Ok(HttpResponse::builder().set_payload(
        format!("Hello, {}!", params.get("name").unwrap_or(&"world".to_string()))
    ).build())
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

    let mut min_httpd = MinHttpd::default();
    min_httpd.route_fn("/hello", example_handler);

    let random_string = if env::var("DEV_MODE").is_ok() {
        "TO_BE_INITIALIZED_ON_THE_FLY".to_string()
    } else {
        unsafe { pseudo_random_string(64) }
    };

    let page = INDEX_HTML_CONTENT.replace("TO_BE_INITIALIZED_ON_THE_FLY", &random_string);

    min_httpd.route_static("/bailan", "text/html", page);

    min_httpd.route_fn("/api/bezier", compute_bezier);

    min_httpd.route_fn("/api/bezierAll", compute_bezier_series);

    min_httpd.route("/api/iff", Box::new(move |_, _, _| {
        Ok(HttpResponse::builder().set_payload(
            format!(
                "{}{}",
                random_string,
                SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs() / 10
            )
        ).build())
    }));

    let kitaiskiy = user_speaks_kitaiskiy();
    let angliskiy = user_speaks_angliskiy();

    if angliskiy {
        thread::spawn(|| {
            eprintln!("LIBERTY LIBERTY LIBERTY");
            eprintln!("LIBERTY LIBERTY LIBERTY");
            eprintln!("LIBERTY LIBERTY LIBERTY");

            loop {
                sleep(Duration::from_secs(5));
                let s = unsafe {
                    pseudo_random_string_lossy((pseudo_random() % 512 + 256) as usize)
                };
                eprint!("{}", s);
            }
        });
    }

    thread::spawn(move || {
        sleep(Duration::from_secs(3));
        Command::new("cmd")
            .args(&["/c", "start", "http://localhost:3080/bailan"])
            .spawn()
            .unwrap();
        if kitaiskiy {
            eprintln!("如果浏览器没有启动，请复制: \n    http://localhost:3080/bailan\n到浏览器中打开");
        } else {
            eprintln!("If the browser is not started, please copy: \n    http://localhost:3080/bailan\ninto the browser");
        }
    });

    if let Err(_) = min_httpd.serve(SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 3080)) {
        if kitaiskiy {
            message_box(
                "伺服器运行失败，请检查端口占用情况！\0".as_bytes(),
                "错误\0".as_bytes()
            );
        } else {
            message_box(
                "Server failed to run, please check port occupation!\0".as_bytes(),
                "Error\0".as_bytes()
            );
        }
        exit_process(0x1);
    }
}
