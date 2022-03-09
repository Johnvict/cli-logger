import fs from "fs";
import { FileSystem } from "../src/modules/Filesystem";

jest.spyOn(fs, "readFileSync");

describe("Read from Log file", function () {
  it("Should read data from Log file", async () => {
    fs.readFileSync.mockImplementation(() => true);
    const result = await new FileSystem().read("./app.log");

    expect(result).toEqual(
      expect.arrayContaining([
        {
          timestamp: 1628475171259,
          loglevel: "error",
          transactionId: "q9abc55b2-807b-4361-9dbe-aa88b1b2e978",
          err: "Not found",
        },
      ])
    );
  });
});
