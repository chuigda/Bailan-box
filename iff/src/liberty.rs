use std::env;
use crate::winapi::get_user_default_ui_language;

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

pub fn user_speaks_kitaiskiy() -> bool {
    let language: u32 = get_user_default_ui_language();
    language & 0x04 != 0
}

pub fn user_speaks_angliskiy() -> bool {
    let language: u32 = get_user_default_ui_language();
    language & 0x09 != 0
}
