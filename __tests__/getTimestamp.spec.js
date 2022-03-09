import { expect } from "chai";
import fs from "fs";
import { Helpers } from "../src/libs/Helpers";

jest.spyOn(fs, "readFileSync");

describe("Extract a valid timestamp from text containing ISO Date", function () {
  it("Should return a timestamp", async () => {
    fs.readFileSync.mockImplementation(() => true);
    const result = await new Helpers().timestampFromText(
      `2021-08-09T02:12:51.259Z - error - {"transactionId":"q9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}`
    );

    expect(result).equal(1628475171259);
  });
});
