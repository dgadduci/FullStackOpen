const { test, describe } = require("node:test");
const assert = require("node:assert");
const dummy = require("../utils/list_helper").dummy;

describe("dummy tests", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = dummy(blogs);
    assert.strictEqual(result, 1);
  });
});
