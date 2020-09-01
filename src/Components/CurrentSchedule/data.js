const now = new Date();

export default [
  {
    id: 13,
    title: "Multi-day Event",
    start: new Date(2020, 7, 20, 19, 30, 0),
    end: new Date(2020, 7, 22, 2, 0, 0),
    color: "#00BCD4",
  },
  {
    id: 14,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 60 )),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 15,
    title: "Point in Time Event",
    start: now,
    end: now,
  },
  {
    id: 16,
    title: "Video Record",
    start: new Date(2020, 8, 11, 15, 30, 0),
    end: new Date(2020, 8, 11, 19, 0, 0),
  },
];
