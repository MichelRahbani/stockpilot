#!/bin/zsh
cd "$(dirname "$0")" || exit 1

if command -v node >/dev/null 2>&1; then
  NODE_BIN="$(command -v node)"
elif [[ -x "/opt/homebrew/bin/node" ]]; then
  NODE_BIN="/opt/homebrew/bin/node"
elif [[ -x "/usr/local/bin/node" ]]; then
  NODE_BIN="/usr/local/bin/node"
else
  echo "Node.js was not found. Install Node.js from https://nodejs.org, then try again."
  read -k 1 "?Press any key to close this window..."
  exit 1
fi

echo "Starting StockPilot..."
echo "Using Node: $NODE_BIN"

if ! lsof -nP -iTCP:8787 -sTCP:LISTEN >/dev/null 2>&1; then
  nohup "$NODE_BIN" server.js > stockpilot-api.log 2>&1 &
  echo $! > stockpilot-api.pid
  sleep 2
fi

if lsof -nP -iTCP:8787 -sTCP:LISTEN >/dev/null 2>&1; then
  echo "StockPilot API is running."
  echo "Opening StockPilot..."
  open "http://127.0.0.1:8787/"
  echo ""
  echo "You can close this window. The API is running in the background."
else
  echo "StockPilot could not start."
  echo "Here is the latest error:"
  echo ""
  tail -n 20 stockpilot-api.log 2>/dev/null
  echo ""
  read -k 1 "?Press any key to close this window..."
fi
