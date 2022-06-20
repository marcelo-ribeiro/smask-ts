import { currency } from "./currency";

describe("currency", () => {
  test("should to format", () => {
    const received = currency(123456789.09, "pt-br", "BRL").replace(/\s/g, "");
    const expected = "R$ 123.456.789,09".replace(/\s/g, "");
    expect(received).toMatch(expected);
  });
});
