import formatDate from "./index";

describe("formatDate", () => {
  test("correct date and time format in default locale", () => {
    const result = formatDate("2023-12-19T20:31:20.596Z");

    expect(result).toEqual({
      date: "19 декабря 2023",
      time: "23:31",
    });
  });

  test("correct date and time format in en-US locale", () => {
    const result = formatDate("2023-12-19T20:31:20.596Z", "en-US");

    expect(result).toEqual({
      date: "December 19, 2023",
      time: "11:31 PM",
    });
  });

  test("invalid date format", () => {
    const result = formatDate("date");

    expect(result).toEqual({
      date: "Invalid Date",
      time: "Invalid Date",
    });
  });
});
