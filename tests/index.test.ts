import { holodex } from "../src";

it("can fetch index", async () => {
  const dex = holodex();
  const index = await dex.live();
  expect(index).toBeInstanceOf(Array);
});
