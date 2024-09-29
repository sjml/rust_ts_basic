#!/usr/bin/env bash

set -e

cd "$(dirname "0")"
cd mod_shared_mem_rs

cargo build --target wasm32-unknown-unknown --release
mv target/wasm32-unknown-unknown/release/mod_shared_mem_rs.wasm ../
cd ..
wasm2wat mod_shared_mem_rs.wasm > mod_shared_mem_rs.wat

echo "======="
echo "Should show a Uint8Array of **non-zero** values:"
deno run --allow-read main.ts ./mod_shared_mem_rs.wasm
