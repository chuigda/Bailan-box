use std::collections::HashMap;
use std::net::{Ipv4Addr, SocketAddrV4};

mod minhttpd;

use crate::minhttpd::MinHttpd;

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
}

fn message_box(text: &[u8], caption: &[u8]) {
    unsafe {
        MessageBoxA(0, text.as_ptr(), caption.as_ptr(), 0x30);
    }
}

fn main() {
    message_box(
        b"\xB7\xC7\xB3\xA3\xB1\xA7\xC7\xB8\xA3\xAC\xC4\xFA\xB5\xC4\xD7\xF7\xD2\xB5\xCF\xB5\xCD\xB3\xB2\xBB\xD6\xA7\xB3\xD6\xD5\xE2\xB8\xF6\xB3\xCC\xCA\xBD\0",
        b"\xB4\xED\xCE\xF3\0"
    );
    return;

    let mut min_httpd = MinHttpd::default();
    min_httpd.route("/hello".to_string(), Box::new(example_handler));

    min_httpd.serve(SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 3080)).unwrap();
}
