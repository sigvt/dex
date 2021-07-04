#!/usr/bin/env node

import epicfail from "epicfail";
import { compileExpression } from "filtrex";
import yargs from "yargs";
import { holodex, ORGS } from ".";

epicfail();

async function live(argv: any) {
  const filters = argv.filter
    ? argv.filter.map((exp: string) => compileExpression(exp))
    : undefined;
  const org = ORGS[argv.scope] || "All Vtubers";
  const jsonOutput = argv.json;

  const client = holodex(process.env.API_KEY);

  let videos = await client.live({ org });

  if (filters) {
    videos = videos.filter((live: any) =>
      filters.every((filter: any) => filter(live) == 1)
    );
  }

  if (jsonOutput) {
    console.log(JSON.stringify(videos, null, 2));
  } else {
    for (const video of videos) {
      console.log(video.title);
      console.log(`https://www.youtube.com/watch?v=${video.id}`);
    }
  }
}

async function search(argv: any) {
  const org = ORGS[argv.scope] || "All Vtubers";
  const jsonOutput = argv.json;

  const client = holodex(process.env.API_KEY);

  const videos = await client.live({ org });

  if (jsonOutput) {
    console.log(JSON.stringify(videos, null, 2));
  } else {
    for (const video of videos) {
      console.log(video.title);
      console.log(`https://www.youtube.com/watch?v=${video.id}`);
    }
  }
}

yargs(process.argv.slice(2))
  .scriptName("dex")
  .help("help")
  .alias("help", "h")
  .command(
    "live [scope]",
    "Get live streams",
    (yargs) =>
      yargs
        .positional("scope", {
          type: "string",
          default: "all",
          desc: "Search scope",
          choices: Object.keys(ORGS),
        })
        .option("json", {
          alias: "j",
          desc: "Print JSON",
        })
        .option("filter", {
          type: "array",
          alias: "f",
          desc: "Filter expression",
        }),
    live
  )
  .command(
    "search <query>",
    "Search live streams",
    (yargs) =>
      yargs
        .positional("scope", {
          type: "string",
          default: "all",
          desc: "Search scope",
          choices: Object.keys(ORGS),
        })
        .option("json", {
          alias: "j",
          desc: "Print JSON",
        }),
    search
  )
  .demandCommand().argv;
