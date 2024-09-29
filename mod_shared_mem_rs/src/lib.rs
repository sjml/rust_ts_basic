#[link(wasm_import_module = "env")]
extern "C" {
    pub static mut memory: [u8; 0];
}

#[no_mangle]
pub extern "C" fn modify_memory() {
    unsafe {
        let memory_ptr = memory.as_ptr() as *mut u8;
        let write_slice = std::slice::from_raw_parts_mut(memory_ptr, 8);

        write_slice[1] = 32;
        write_slice[3] = 64;
        write_slice[5] = 128;
        write_slice[7] = 255;
    }
}
