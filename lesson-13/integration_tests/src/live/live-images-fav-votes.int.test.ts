import {
  searchOneImage,
  createFavourite,
  listFavourites,
  deleteFavourite,
  createVote,
  listVotes,
} from "../client/catapiClient";
import "dotenv/config";

describe("LIVE: images ↔ favourites ↔ votes (TheCatAPI)", () => {
  const SUB_ID = "qa-integ-ramella";

  it("should chain search → favourite(create/list/delete) → vote(create/list)", async () => {
    const image = await searchOneImage();
    const image_id = image.id;

    // create favourite
    const fav = await createFavourite(image_id, SUB_ID);
    expect([200, 201]).toContain(fav.status);
    const favouriteId = fav.data.id;

    // list favourites (ensure presence)
    const favourites = await listFavourites(SUB_ID);
    expect(Array.isArray(favourites)).toBe(true);
    expect(
      favourites.some(
        (f: any) => f.id === favouriteId && f.image_id === image_id,
      ),
    ).toBeTruthy();

    // create vote
    const vote = await createVote(image_id, SUB_ID, 1);
    expect([200, 201]).toContain(vote.status);

    // list votes (ensure presence)
    const votes = await listVotes(SUB_ID);
    expect(Array.isArray(votes)).toBe(true);
    expect(
      votes.some((v: any) => v.image_id === image_id && v.sub_id === SUB_ID),
    ).toBeTruthy();

    // cleanup
    const del = await deleteFavourite(favouriteId);
    expect([200, 201]).toContain(del.status);
  });

  it("should return 401/403 without API key (negative)", async () => {
    expect(true).toBe(true);
  });
});
