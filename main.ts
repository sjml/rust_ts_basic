if (Deno.args.length == 0) {
    console.error("Give a file path.")
    Deno.exit(1);
}

const f = await Deno.readFile(Deno.args[0]);
const programBuffer = f.buffer;

const memory = new WebAssembly.Memory({
    initial: 1,
    maximum: 1,
    shared: true
});

const program = await WebAssembly.instantiate(programBuffer, {
    env: {
        memory: memory
    }
});

program.instance.exports.modify_memory();
const memoryView = new Uint8Array(memory.buffer);
console.log(memoryView.slice(0, 8));
