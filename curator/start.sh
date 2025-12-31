#!/bin/sh
set -e

# Start PocketBase in background
cd db
./pocketbase serve --dir pb_data &
PB_PID=$!

# Serve static Svelte app
cd ..
export PORT = 3000
export HOST = 0.0.0.0
node build/index.js

# When `serve` exits, stop PocketBase too
kill $PB_PID
