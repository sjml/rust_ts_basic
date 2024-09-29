if (Deno.args.length == 0) {
    console.error("Give a file path.")
    Deno.exit(1);
}

const f = await Deno.readFile(Deno.args[0]);
const programBuffer = f.buffer;

const sharedMemory = new WebAssembly.Memory({initial: 1, maximum: 1});
const { instance } = await WebAssembly.instantiate(programBuffer, {
    env: {
        memory: sharedMemory,
    }
});

const modify_memory = instance.exports.modify_memory as CallableFunction;

const memoryView = new Uint8Array(sharedMemory.buffer);
console.log("Before WASM modification:", memoryView.subarray(0, 8));
modify_memory();
console.log("After WASM modification:", memoryView.subarray(0, 8));


