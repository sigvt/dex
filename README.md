# ▶️ dex

[![Actions Status: test](https://github.com/holodata/dex/workflows/test/badge.svg)](https://github.com/holodata/dex/actions?query=test)

Node.js library & CLI for [Holodex](https://holodex.net).

## Node.js

The library structure is fully synced with the URL structure of the Holodex API. This way, when a new endpoint is created in the Holodex API, you can access it immediately without waiting for the library to be updated. See [Muffled API](https://github.com/uetchy/MuffledAPI) and [Holodex API Docs](https://holodex.stoplight.io/) for further reads.

```js
import { holodex } from "@holodata/dex";

async function main(token) {
  const api = holodex({ token });

  // fetch upcoming/live streams
  const liveStreams = await api.live({ org: "All Vtubers", status: "live" });

  // get channel
  const channel = await api.channels["UCMwGHR0BTZuLsmjY_NT5Pwg"]();

  // search videos
  const videos = await api.search.videoSearch({
    target: ["stream"],
    conditions: [{ text: "Korone" }],
  });
}

main(process.env.HOLODEX_TOKEN);
```

## CLI

```bash
dex live [org]
dex live hololive
dex live hololive -f 'type == "upcoming"' -f 'name of channel ~= "Korone"'
dex live --json

dex channel <id>
dex channel UCMwGHR0BTZuLsmjY_NT5Pwg

dex search <query>
dex search Minecraft
```

## Install

### npm

```bash
npm i -g @holodata/dex
```

### Homebrew

```bash
brew tap sake.sh/holodata https://sake.sh/holodata
brew install dex
```
