if (Deno.args.length == 0) {
    console.error("Give a file path.")
    Deno.exit(1);
}

const f = await Deno.readFile(Deno.args[0]);
const programBuffer = f.buffer;

const { instance } = await WebAssembly.instantiate(programBuffer, {});

const modify_memory = instance.exports.modify_memory as CallableFunction;
const get_memory_ptr = instance.exports.get_memory_ptr as CallableFunction;

modify_memory();

const memory_ptr = get_memory_ptr();
const memoryView = new Uint8Array((instance.exports.memory as WebAssembly.Memory).buffer);

console.log(memoryView.subarray(Number(memory_ptr), Number(memory_ptr) + 8));
