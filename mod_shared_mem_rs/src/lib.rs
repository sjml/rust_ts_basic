#[link(wasm_import_module = "env")]
extern "C" {
    pub static mut memory: *mut u8;
}

#[no_mangle]
pub extern "C" fn modify_memory() {
    unsafe {
        let write_slice = std::slice::from_raw_parts_mut(memory, 8);

        write_slice[1] =  16;
        write_slice[3] =  32;
        write_slice[5] =  64;
        write_slice[7] = 128;
    }
}
