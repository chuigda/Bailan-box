use std::convert::Infallible;
use std::hint::unreachable_unchecked;

#[link(name = "kernel32")]
extern "C" {
    fn GetUserDefaultUILanguage() -> u32;
}

#[link(name = "user32")]
extern "C" {
    fn MessageBoxA(h_wnd: u32, text: *const u8, caption: *const u8, u_type: u32) -> u32;
    fn ExitProcess(u_exit_code: u32);
}

pub fn get_user_default_ui_language() -> u32 {
    unsafe { GetUserDefaultUILanguage() }
}

pub fn message_box(text: &[u8], caption: &[u8]) {
    unsafe {
        MessageBoxA(0, text.as_ptr(), caption.as_ptr(), 0x10);
    }
}

pub fn exit_process(code: u32) -> Infallible {
    unsafe {
        ExitProcess(code);
        unreachable_unchecked()
    }
}

