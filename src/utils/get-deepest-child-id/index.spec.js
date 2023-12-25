import { getDeepestChildId } from "./index";

describe("getDeepestChildId", () => {
  test("test1", () => {
    const item = {
      _id: "6589068d470357344eb7f0d1",
      text: "dwq",
      children: [
        {
          _id: "6589068f470357344eb7f0d3",
          text: "dwq",
          children: [],
        },
        {
          _id: "65890692470357344eb7f0d5",
          text: "dwq",
          children: [],
        },
      ],
      level: 0,
    };

    expect(getDeepestChildId(item)).toBe("65890692470357344eb7f0d5");
  });

  test("test2", () => {
    const item = {
      _id: "6589068f470357344eb7f0d3",
      children: [],
    };

    expect(getDeepestChildId(item)).toBe("6589068f470357344eb7f0d3");
  });

  test("test3", () => {
    const item = {
      _id: "6589068f470357344eb7f0d3",
    };

    expect(getDeepestChildId(item)).toBe("6589068f470357344eb7f0d3");
  });
});
