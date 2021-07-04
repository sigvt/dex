# ▶️ dex

[![Actions Status: test](https://github.com/holodata/dex/workflows/test/badge.svg)](https://github.com/holodata/dex/actions?query=test)

Node.js library & CLI for [Holodex](https://holodex.net).

## Node.js

```js
import { holodex } from "@holodata/dex";

async function main(token) {
  const dex = holodex({ token });
  const liveStreams = await dex.live({ scope: "all" });
}
```

## CLI

```bash
dex live
dex live hololive
dex live hololive -f 'type == "upcoming"' -f 'name of channel ~= "Korone"'
dex live nijisanji --json
```

## Install

### macOS

```bash
brew tap sake.sh/uetchy https://sake.sh/uetchy
brew install dex
```
