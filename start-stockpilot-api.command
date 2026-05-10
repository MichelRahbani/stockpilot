#!/bin/zsh
cd "$(dirname "$0")" || exit 1

CODEX_NODE="/Applications/Codex.app/Contents/Resources/node"

if command -v node >/dev/null 2>&1; then
  NODE_BIN="$(command -v node)"
elif [[ -x "/opt/homebrew/bin/node" ]]; then
  NODE_BIN="/opt/homebrew/bin/node"
elif [[ -x "/usr/local/bin/node" ]]; then
  NODE_BIN="/usr/local/bin/node"
elif [[ -x "$CODEX_NODE" ]]; then
  NODE_BIN="$CODEX_NODE"
elif command -v node >/dev/null 2>&1; then
  NODE_BIN="$(command -v node)"
else
  echo "Node.js was not found."
  echo "Install Node.js from https://nodejs.org, then try again."
  echo ""
  read -k 1 "?Press any key to close this window..."
  exit 1
fi

echo "Starting StockPilot API Gateway..."
echo "Using Node: $NODE_BIN"
echo "Gateway URL: http://127.0.0.1:8787/health"
echo "StockPilot app: http://127.0.0.1:8787/"
echo "Leave this window open while using the app."
echo ""
"$NODE_BIN" server.js

echo ""
echo "StockPilot API stopped."
echo "If you see an error above, send it to Codex and we will fix it."
read -k 1 "?Press any key to close this window..."
