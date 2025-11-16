import { PactV3, MatchersV3 } from "@pact-foundation/pact";
import path from "path";
import axios from "axios";

const { like, eachLike, integer, string } = MatchersV3;

describe("CatAPI consumer contract: images ↔ favourites ↔ votes", () => {
  const provider = new PactV3({
    consumer: "qa-consumer-catapi",
    provider: "thecatapi",
    dir: path.resolve(process.cwd(), "pact/pacts"),
  });

  const SUB_ID = "qa-integ-ramella";
  const IMAGE_ID = "abc123";

  test("images/search → favourites(create/list/delete) → votes(create/list)", async () => {
    // 1) GET /images/search
    provider
      .given("images exist")
      .uponReceiving("search one image")
      .withRequest({
        method: "GET",
        path: "/v1/images/search",
        query: { limit: "1", size: "small", mime_types: "jpg,png" },
        headers: { "x-api-key": like("test-key") },
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: eachLike(
          {
            id: string(IMAGE_ID),
            url: like("https://cdn2.thecatapi.com/images/abc123.jpg"),
          },
          1,
        ),
      });

    // 2) POST /favourites
    provider
      .given("user can create favourite")
      .uponReceiving("create favourite for image")
      .withRequest({
        method: "POST",
        path: "/v1/favourites",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": like("test-key"),
        },
        body: { image_id: string(IMAGE_ID), sub_id: string(SUB_ID) },
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: {
          message: string("SUCCESS"),
          id: integer(9876),
        },
      });

    // 3) GET /favourites?sub_id=...
    provider
      .given(`favourites exist for sub_id ${SUB_ID}`)
      .uponReceiving("list favourites for sub_id")
      .withRequest({
        method: "GET",
        path: "/v1/favourites",
        query: { sub_id: SUB_ID },
        headers: { "x-api-key": like("test-key") },
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: eachLike(
          {
            id: integer(9876),
            image_id: string(IMAGE_ID),
            sub_id: string(SUB_ID),
          },
          1,
        ),
      });

    // 4) DELETE /favourites/{id}
    provider
      .given("favourite can be deleted")
      .uponReceiving("delete favourite by id")
      .withRequest({
        method: "DELETE",
        path: "/v1/favourites/9876",
        headers: { "x-api-key": like("test-key") },
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: { message: string("SUCCESS") },
      });

    // 5) POST /votes
    provider
      .given("user can create vote")
      .uponReceiving("create vote for image")
      .withRequest({
        method: "POST",
        path: "/v1/votes",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": like("test-key"),
        },
        body: {
          image_id: string(IMAGE_ID),
          sub_id: string(SUB_ID),
          value: integer(1),
        },
      })
      .willRespondWith({
        status: 201,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: { message: string("SUCCESS"), id: integer(5555) },
      });

    // 6) GET /votes?sub_id=...
    provider
      .given(`votes exist for sub_id ${SUB_ID}`)
      .uponReceiving("list votes for sub_id")
      .withRequest({
        method: "GET",
        path: "/v1/votes",
        query: { sub_id: SUB_ID },
        headers: { "x-api-key": like("test-key") },
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: eachLike(
          {
            id: integer(5555),
            image_id: string(IMAGE_ID),
            sub_id: string(SUB_ID),
            value: integer(1),
          },
          1,
        ),
      });

    await provider.executeTest(async (mockServer) => {
      const http = axios.create({
        baseURL: mockServer.url + "/v1",
        headers: { "x-api-key": "test-key" },
      });

      // images/search
      const imgRes = await http.get("/images/search", {
        params: { limit: 1, size: "small", mime_types: "jpg,png" },
      });
      expect(imgRes.status).toBe(200);
      const image_id = imgRes.data[0].id;

      // create favourite
      const favRes = await http.post("/favourites", {
        image_id,
        sub_id: SUB_ID,
      });
      expect(favRes.status).toBe(200);
      const favouriteId = favRes.data.id;

      // list favourites
      const favList = await http.get("/favourites", {
        params: { sub_id: SUB_ID },
      });
      expect(favList.status).toBe(200);
      expect(
        favList.data.some(
          (f: any) => f.id === favouriteId && f.image_id === image_id,
        ),
      ).toBeTruthy();

      // delete favourite
      const del = await http.delete(`/favourites/${favouriteId}`);
      expect(del.status).toBe(200);

      // create vote
      const voteRes = await http.post("/votes", {
        image_id,
        sub_id: SUB_ID,
        value: 1,
      });
      expect([200, 201]).toContain(voteRes.status);

      // list votes
      const votes = await http.get("/votes", { params: { sub_id: SUB_ID } });
      expect(votes.status).toBe(200);
      expect(
        votes.data.some(
          (v: any) => v.image_id === image_id && v.sub_id === SUB_ID,
        ),
      ).toBeTruthy();
    });
  });
});
