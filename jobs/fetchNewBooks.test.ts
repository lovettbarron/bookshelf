 
import { jobs, actions, models, resetDatabase } from "@teamkeel/testing";
import { test, expect, beforeEach } from "vitest";
 
beforeEach(resetDatabase);
 

test('a permission test', async () => {
  const identity = await models.identity.create({
    email: 'andrew@keel.xyz',
  });
    
actions.withIdentity(identity).createBook({isbn:"9781844164592"})



  console.log("Test start")
 
  await jobs.fetchNewBooks();
 
  const res = await models.book.findMany({where: { title: null }	});
  console.log(res)

  expect(res).toBeLessThan(1);
});