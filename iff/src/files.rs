use std::error::Error;
use std::fs::{create_dir, File};
use std::fs::metadata;
use std::io::{ErrorKind, Write};

use base64::decode;
use xjbutil::minhttpd::{HttpBody, HttpHeaders, HttpParams, HttpResponse};

fn save_file_impl(save_path: &str, content: &[u8]) -> HttpResponse {
    let may_save_file = match metadata(save_path) {
        Ok(_) => false,
        Err(e) => match e.kind() {
            ErrorKind::NotFound => true,
            _ => false
        }
    };

    if !may_save_file {
        return HttpResponse::builder()
            .set_code(500)
            .add_header("Content-Type", "text/plain")
            .set_payload("File already exists\n文件已经存在")
            .build()
    }

    let file = File::options()
        .write(true)
        .create(true)
        .open(save_path);
    let mut file = if let Ok(file) = file {
        file
    } else {
        return HttpResponse::builder()
            .set_code(500)
            .add_header("Content-Type", "text/plain")
            .set_payload("Cannot create file\n无法创建文件")
            .build()
    };

    if let Ok(_) = file.write_all(content) {
        HttpResponse::builder().build()
    } else {
        HttpResponse::builder()
            .set_code(500)
            .add_header("Content-Type", "text/plain")
            .set_payload("Cannot write file\n无法写入文件")
            .build()
    }
}

pub fn save_text_file(
    _headers: HttpHeaders,
    params: HttpParams,
    body: HttpBody
) -> Result<HttpResponse, Box<dyn Error>> {
    let save_path = params.get("savePath").ok_or("must provide savePath")?;
    let body = body.ok_or("must provide body")?;

    Ok(save_file_impl(save_path, body.as_bytes()))
}

pub fn save_base64_file(
    _headers: HttpHeaders,
    params: HttpParams,
    body: HttpBody
) -> Result<HttpResponse, Box<dyn Error>> {
    let save_path = params.get("savePath").ok_or("must provide savePath")?;
    let body = body.ok_or("must provide body")?;

    let decoded = decode(body)?;

    Ok(save_file_impl(save_path, &decoded))
}

pub fn mkdir_http_api(
    _headers: HttpHeaders,
    params: HttpParams,
    _body: HttpBody
) -> Result<HttpResponse, Box<dyn Error>> {
    let mkdir_path = params.get("mkdirPath").ok_or("must provide mkdirPath")?;

    let may_save_file = match metadata(mkdir_path) {
        Ok(_) => false,
        Err(e) => match e.kind() {
            ErrorKind::NotFound => true,
            _ => false
        }
    };

    if !may_save_file {
        return Ok(
            HttpResponse::builder()
                .set_code(500)
                .add_header("Content-Type", "text/plain")
                .set_payload("File already exists\n文件已经存在")
                .build()
        )
    }

    Ok(
        match create_dir(mkdir_path) {
            Ok(_) => HttpResponse::builder().build(),
            Err(_) => HttpResponse::builder()
                .set_code(500)
                .add_header("Content-Type", "text/plain")
                .set_payload("Cannot make directory\n无法创建目录")
                .build()
        }
    )
}
