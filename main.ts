if (Deno.args.length == 0) {
    console.error("Give a file path.")
    Deno.exit(1);
}

const f = await Deno.readFile(Deno.args[0]);
const programBuffer = f.buffer;

const { instance } = await WebAssembly.instantiate(programBuffer, {});

const modify_memory = instance.exports.modify_memory as CallableFunction;
const get_memory_ptr = instance.exports.get_memory_ptr as CallableFunction;

const memoryView = new Uint8Array((instance.exports.memory as WebAssembly.Memory).buffer);
const memory_ptr = get_memory_ptr();
console.log("Before WASM modification:", memoryView.subarray(Number(memory_ptr), Number(memory_ptr) + 8));
modify_memory();
console.log("After WASM modification:", memoryView.subarray(Number(memory_ptr), Number(memory_ptr) + 8));


