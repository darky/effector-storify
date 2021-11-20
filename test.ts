import { createEffect, createEvent, createStore } from "effector";
import { test } from "uvu";
import { equal, throws } from "uvu/assert";

import { ev$all, ev$last, fx$all, fx$last } from "./index.js";

test("fx$last - success", () => {
  const fx = fx$last(createEffect<number, number>((x) => x));
  fx(0);
  fx(1);
  equal(fx.$last.getState() + 1, 2);
});

test("fx$last - error", () => {
  throws(() => fx$last(createStore(0) as any));
});

test("ev$last - success", () => {
  const ev = ev$last(createEvent<number>());
  ev(0);
  ev(1);
  equal(ev.$last.getState() + 1, 2);
});

test("ev$last - error", () => {
  throws(() => ev$last(createStore(0) as any));
});

test("fx$all - success", () => {
  const fx = fx$all(createEffect<number, number>((x) => x));
  fx(0);
  fx(1);
  equal(fx.$all.getState().concat(2), [0, 1, 2]);
});

test("fx$all - error", () => {
  throws(() => fx$all(createStore(0) as any));
});

test("ev$all - success", () => {
  const ev = ev$all(createEvent<number>());
  ev(0);
  ev(1);
  equal(ev.$all.getState().concat(2), [0, 1, 2]);
});

test("ev$all - error", () => {
  throws(() => ev$all(createStore(0) as any));
});

// test("composition", () => {
//   const fx = fx$all(fx$last(createEffect<number, number>((x) => x)));
//   fx(0);
//   fx(1);
//   equal(fx.$last.getState() + 1, 2);
//   equal(fx.$all.getState().concat(2), [0, 1, 2]);
// });

test.run();
