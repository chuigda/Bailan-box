use std::collections::HashMap;
use std::convert::Infallible;
use std::{env, thread};
use std::env::current_exe;
use std::error::Error;
use std::hint::unreachable_unchecked;
use std::net::{Ipv4Addr, SocketAddrV4};
use std::process::Command;
use std::thread::sleep;
use std::time::Duration;

mod minhttpd;

use crate::minhttpd::MinHttpd;

include!("../res/denylist.rs");

fn example_handler(
    _: HashMap<String, String>,
    params: HashMap<String, String>,
    _: Option<String>
) -> Result<(String, String), String> {
    Ok((
        "text/plain".to_string(),
        format!("Hello, {}!", params.get("name").map(|x| x.as_str()).unwrap_or("World"))
    ))
}

#[link(name = "user32")]
extern "C" {
    #[no_mangle]
    fn MessageBoxA(h_wnd: u32, text: *const u8, caption: *const u8, u_type: u32) -> u32;

    #[no_mangle]
    fn ExitProcess(u_exit_code: u32);
}

fn message_box(text: &[u8], caption: &[u8]) {
    unsafe {
        MessageBoxA(0, text.as_ptr(), caption.as_ptr(), 0x10);
    }
}

fn exit_process(code: u32) -> Infallible {
    unsafe {
        ExitProcess(code);
        unreachable_unchecked()
    }
}

fn iff_precheck() -> Result<bool, Box<dyn std::error::Error>> {
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

        message_box(
            format!(concat!(include_str!("../res/fake_message.txt"), "\0"), program).as_bytes(),
            "Microsoft Visual C++ Runtime Library\0".as_bytes()
        );
        exit_process(0xC);
    }

    let mut min_httpd = MinHttpd::default();
    min_httpd.route("/hello".to_string(), Box::new(example_handler));


    thread::spawn(|| {
        sleep(Duration::from_secs(3));
        Command::new("cmd")
            .args(&["/c", "start", "http://localhost:3080/bailan"])
            .spawn()
            .unwrap();
        eprintln!("如果浏览器没有启动，请复制: \n    http://localhost:3080/bailan\n到浏览器中打开");
    });

    if let Err(_) =  min_httpd.serve(SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 3080)) {
        message_box(
            "伺服器启动失败，请检查端口占用情况！\0".as_bytes(),
            "错误\0".as_bytes()
        );
        exit_process(0x1);
    }

    loop { sleep(Duration::from_secs(114514)); }
}
