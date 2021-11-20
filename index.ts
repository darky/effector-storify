import { createStore, Effect, Event, is, restore, Store } from "effector";

export function fx$last<Params, Done, Fail>(
  fx: Effect<Params, Done, Fail> & { $last?: Store<Done> }
): Effect<Params, Done, Fail> & { $last: Store<Done> } {
  if (fx.$last) {
    return fx as Effect<Params, Done, Fail> & { $last: Store<Done> };
  }

  if (!is.effect(fx)) {
    throw new Error("Passed parameter is not an Effect");
  }

  const $last = restore(fx.doneData, null);
  return Object.assign(fx, { $last });
}

export function ev$last<Payload>(
  ev: Event<Payload> & { $last?: Store<Payload> }
): Event<Payload> & { $last: Store<Payload> } {
  if (ev.$last) {
    return ev as Event<Payload> & { $last: Store<Payload> };
  }

  if (!is.event(ev)) {
    throw new Error("Passed parameter is not an Event");
  }

  const $last = restore(ev, null);
  return Object.assign(ev, { $last });
}

export function fx$all<Params, Done, Fail>(
  fx: Effect<Params, Done, Fail> & { $all?: Store<Done[]> }
): Effect<Params, Done, Fail> & { $all: Store<Done[]> } {
  if (fx.$all) {
    return fx as Effect<Params, Done, Fail> & { $all: Store<Done[]> };
  }

  if (!is.effect(fx)) {
    throw new Error("Passed parameter is not an Effect");
  }

  const $all = createStore<Done[]>([]).on(fx.doneData, (s, ev) => [...s, ev]);
  return Object.assign(fx, { $all });
}

export function ev$all<Payload>(
  ev: Event<Payload> & { $all?: Store<Payload[]> }
): Event<Payload> & { $all: Store<Payload[]> } {
  if (ev.$all) {
    return ev as Event<Payload> & { $all: Store<Payload[]> };
  }

  if (!is.event(ev)) {
    throw new Error("Passed parameter is not an Event");
  }

  const $all = createStore<Payload[]>([]).on(ev, (s, ev) => [...s, ev]);
  return Object.assign(ev, { $all });
}
