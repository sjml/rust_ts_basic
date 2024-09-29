use std::cell::UnsafeCell;

#[no_mangle]
static mut MEMORY: UnsafeCell<[u8; 8]> = UnsafeCell::new([0; 8]);

#[no_mangle]
pub extern "C" fn modify_memory() {
    unsafe {
        let memory = MEMORY.get();
        (*memory)[1] = 32;
        (*memory)[3] = 64;
        (*memory)[5] = 128;
        (*memory)[7] = 255;
    }
}

#[no_mangle]
pub extern "C" fn get_memory_ptr() -> *const u8 {
    unsafe { MEMORY.get() as *const u8 }
}
