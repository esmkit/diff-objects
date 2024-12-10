import { describe, expect, test } from "bun:test";
import preserveArray from "../src/preserveArray";

describe(".preserveArray", () => {
  test("returns diff with nested objects converted back to arrays when property is deleted", () => {
    const left = { a: [{ b: ["#", "#", "#", { hello: "" }] }, "#", { c: "", d: ["#", ""] }, "#"] };
    const right = { a: [{ b: ["#", "#", "#", { hello: "world" }] }, "#", { c: "hello", d: ["#", "bob"] }] };
    const diff = {
      a: {
        0: {
          b: {
            3: {
              hello: "world",
            },
          },
        },
        2: {
          c: "hello",
          d: {
            1: "bob",
          },
        },
        3: undefined,
      },
    };
    const expected = {
      a: [
        {
          b: [
            "empty",
            "empty",
            "empty",
            {
              hello: "world",
            },
          ],
        },
        "empty",
        {
          c: "hello",
          d: ["empty", "bob"],
        },
        undefined,
      ],
    };
    // @ts-ignore
    delete expected.a[0].b[0];
    // @ts-ignore
    delete expected.a[0].b[1];
    // @ts-ignore
    delete expected.a[0].b[2];
    // @ts-ignore
    delete expected.a[1];
    // @ts-ignore
    delete expected.a[2].d[0];

    expect(preserveArray(diff, left, right)).toEqual(expected);
  });

  test("returns diff with nested objects converted back to arrays when new property is added", () => {
    const left = { a: [{ b: ["#", "#", "#", { hello: "" }] }, "#", { c: "", d: ["#", ""] }] };
    const right = { a: [{ b: ["#", "#", "#", { hello: "world" }] }, "#", { c: "hello", d: ["#", "bob"] }, "foobar"] };
    const diff = {
      a: {
        0: {
          b: {
            3: {
              hello: "world",
            },
          },
        },
        2: {
          c: "hello",
          d: {
            1: "bob",
          },
        },
        3: "foobar",
      },
    };
    const expected = {
      a: [
        {
          b: [
            "empty",
            "empty",
            "empty",
            {
              hello: "world",
            },
          ],
        },
        "empty",
        {
          c: "hello",
          d: ["empty", "bob"],
        },
        "foobar",
      ],
    };
    // @ts-ignore
    delete expected.a[0].b[0];
    // @ts-ignore
    delete expected.a[0].b[1];
    // @ts-ignore
    delete expected.a[0].b[2];
    // @ts-ignore
    delete expected.a[1];
    // @ts-ignore
    delete expected.a[2].d[0];

    expect(preserveArray(diff, left, right)).toEqual(expected);
  });
});
