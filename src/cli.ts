#!/usr/bin/env node

import epicfail from "epicfail";
import { compileExpression } from "filtrex";
import yargs from "yargs";
import { holodex, ORGS } from ".";

epicfail();

async function live(argv: any) {
  const jsonOutput = argv.json;
  const filters = argv.filter
    ? argv.filter.map((exp: string) => compileExpression(exp))
    : undefined;
  const org = ORGS[argv.scope] || ORGS["all"];

  const client = holodex(process.env.API_KEY);

  let videos = await client.live({ org });

  if (filters) {
    videos = videos.filter((live: any) =>
      filters.every((filter: any) => filter(live) == 1)
    );
  }

  if (jsonOutput) {
    return console.log(JSON.stringify(videos, null, 2));
  }

  for (const video of videos) {
    console.log(video.title);
    console.log(`https://www.youtube.com/watch?v=${video.id}`);
  }
}

async function channel(argv: any) {
  const jsonOutput = argv.json;
  const id = argv.id;

  const client = holodex(process.env.API_KEY);

  const channel = await client.channels[id]();

  if (jsonOutput) {
    return console.log(JSON.stringify(channel, null, 2));
  }

  console.log(channel.name, channel.english_name);
  console.log(channel.description);
  console.log(channel.org, channel.suborg);
  console.log(channel.view_count, channel.video_count);
  console.log(channel.twitter);
  console.log(`https://www.youtube.com/watch?v=${channel.id}`);
}

async function search(argv: any) {
  const jsonOutput = argv.json;
  const query = argv.query;

  const client = holodex(process.env.API_KEY);

  const result = await client.search.videoSearch(
    {},
    { target: ["stream"], conditions: [{ text: query }] }
  );

  if (jsonOutput) {
    console.log(JSON.stringify(result, null, 2));
  }

  for (const video of result) {
    console.log(video.title);
    console.log(`https://www.youtube.com/watch?v=${video.id}`);
  }
}

yargs(process.argv.slice(2))
  .scriptName("dex")
  .help("help")
  .alias("help", "h")
  .option("json", {
    alias: "j",
    desc: "Print JSON",
  })
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
        .option("filter", {
          type: "array",
          alias: "f",
          desc: "Filter expression",
        }),
    live
  )
  .command(
    "channel <id>",
    "Get channel info",
    (yargs) =>
      yargs.positional("id", {
        type: "string",
        required: true,
        desc: "Channel id",
      }),
    channel
  )
  .command(
    "search <query>",
    "Search videos",
    (yargs) =>
      yargs.positional("query", {
        type: "string",
        required: true,
        desc: "Search query",
      }),
    search
  )
  .demandCommand().argv;
