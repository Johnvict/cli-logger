import fs from "fs";
import {FileSystem } from "../src/modules/Filesystem";

jest.spyOn(fs, "writeFileSync");

describe("Write Log to file", function () {
  it("Should attempt to print to file", async () => {
    fs.writeFileSync.mockImplementation(() => true);
    const result = await new FileSystem().write('./errors.json', [
      {
        transactionId: "q9abc55b2-807b-4361-9dbe-aa88b1b2e978",
        details: "Cannot find user orders list",
        code: 404,
        err: "Not found",
      },
    ]);

    expect(result).toEqual(true);
  });
});
