import { urlChecker } from "../src/client/js/urlChecker";

const goodUrl =
  "https://techcrunch.com/2020/06/18/facebook-trump-campaign-nazi-imagery-red-triangle/";

const badUrl = "But I must explain to you how all this mistaken";

describe("Test if the urlChecker works", () => {
  let text;

  test("Good url", () => {
    expect(urlChecker(goodUrl)).toBe(true);
  });

  test("Bad url", () => {
    expect(urlChecker(badUrl)).toBe(false);
  });
});
