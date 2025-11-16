import path from "path";
import axios from "axios";
import { PactV3, MatchersV3 } from "@pact-foundation/pact";

const { like, integer, string } = MatchersV3;

describe("Swagger Petstore — consumer contract for /pet", () => {
  const provider = new PactV3({
    consumer: "qa-consumer-petstore",
    provider: "petstore",
    dir: path.resolve(process.cwd(), "pact/pacts"),
  });

  const petBody = {
    id: integer(123456),
    name: string("Fluffy"),
    status: string("available"),
  };

  test("POST /pet → 200, then GET /pet/{id} → 200, and GET unknown → 404", async () => {
    // 1) створити Pet
    provider
      .given("Pet can be created")
      .uponReceiving("Create a new pet")
      .withRequest({
        method: "POST",
        path: "/v2/pet",
        headers: { "Content-Type": "application/json" },
        body: {
          id: integer(123456),
          name: string("Fluffy"),
          status: string("available"),
        },
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: like(petBody),
      });

    // 2) прочитати Pet за id
    provider
      .given("Pet exists with id 123456")
      .uponReceiving("Get pet by id")
      .withRequest({
        method: "GET",
        path: "/v2/pet/123456",
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: like(petBody),
      });

    // 3) спробувати прочитати невідомий Pet → 404
    provider
      .given("Pet does not exist with id 99999999")
      .uponReceiving("Get pet by unknown id")
      .withRequest({
        method: "GET",
        path: "/v2/pet/99999999",
      })
      .willRespondWith({
        status: 404,
        headers: { "Content-Type": "application/json" },
      });

    await provider.executeTest(async (mockServer) => {
      const http = axios.create({
        baseURL: mockServer.url,
      });

      // POST /pet
      const create = await http.post("/v2/pet", {
        id: 123456,
        name: "Fluffy",
        status: "available",
      });
      expect(create.status).toBe(200);
      expect(create.data.name).toBe("Fluffy");

      // GET /pet/{id}
      const getOk = await http.get("/v2/pet/123456");
      expect(getOk.status).toBe(200);
      expect(getOk.data.id).toBe(123456);

      // GET /pet/{unknownId} → 404
      try {
        await http.get("/v2/pet/99999999");
        throw new Error("Expected 404");
      } catch (err: any) {
        expect(err.response?.status).toBe(404);
      }
    });
  });
});
