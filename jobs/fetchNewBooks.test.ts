 
import { jobs, actions, models, resetDatabase } from "@teamkeel/testing";
import { test, expect, beforeEach } from "vitest";
 
beforeEach(resetDatabase);
 
test("Test FetchNewBooks updates new customer flag", async () => {
  console.log("Test start")
 
  await jobs.fetchNewBooks();
 
  const res = await models.book.findMany({where: { title: null }	});
  console.log(res)
  expect(res).toBeLessThan(1);
});