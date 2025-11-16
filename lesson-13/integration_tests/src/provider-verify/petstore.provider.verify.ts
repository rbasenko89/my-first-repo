import { Verifier } from "@pact-foundation/pact";
import * as path from "path";

(async () => {
  const pactPath = path.resolve(
    process.cwd(),
    "pact/pacts/qa-consumer-petstore-petstore.json",
  );
  const verifier = new Verifier({
    providerBaseUrl: "https://petstore.swagger.io/v2",
    pactUrls: [pactPath],
    publishVerificationResult: false,
  });
  await verifier.verifyProvider();
  // eslint-disable-next-line no-console
  console.log("Petstore provider verification: OK");
})();
