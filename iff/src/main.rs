use std::collections::HashMap;
use std::net::{Ipv4Addr, SocketAddrV4};
use crate::minhttpd::MinHttpd;

mod minhttpd;

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

fn main() {
    let mut min_httpd = MinHttpd::default();
    min_httpd.route("/hello".to_string(), Box::new(example_handler));

    min_httpd.serve(SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 3080)).unwrap();
}
