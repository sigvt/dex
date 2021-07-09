import { holodex } from "../src";

it("can fetch index", async () => {
  const dex = holodex();
  const index = await dex.live();
  expect(index).toBeInstanceOf(Array);
});

it("can search videos", async () => {
  const dex = holodex();
  const result = await dex.search.videoSearch({ org: ["Hololive"] });
  expect(result).toBeInstanceOf(Array);
});
