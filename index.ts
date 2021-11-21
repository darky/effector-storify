import { createStore, Effect, Event, is, restore, Store } from "effector";

export function fx$last<T, Params, Done, Fail>(
  fx: Effect<Params, Done, Fail> & { $last?: Store<Done> } & T
): Effect<Params, Done, Fail> & { $last: Store<Done> } & T {
  if (fx.$last) {
    return fx as Effect<Params, Done, Fail> & { $last: Store<Done> } & T;
  }

  if (!is.effect(fx)) {
    throw new Error("Passed parameter is not an Effect");
  }

  const $last = restore(fx.doneData, null);
  return Object.assign(fx, { $last });
}

export function ev$last<T, Payload>(
  ev: Event<Payload> & { $last?: Store<Payload> } & T
): Event<Payload> & { $last: Store<Payload> } & T {
  if (ev.$last) {
    return ev as Event<Payload> & { $last: Store<Payload> } & T;
  }

  if (!is.event(ev)) {
    throw new Error("Passed parameter is not an Event");
  }

  const $last = restore(ev, null);
  return Object.assign(ev, { $last });
}

export function fx$all<T, Params, Done, Fail>(
  fx: Effect<Params, Done, Fail> & { $all?: Store<Done[]> } & T
): Effect<Params, Done, Fail> & { $all: Store<Done[]> } & T {
  if (fx.$all) {
    return fx as Effect<Params, Done, Fail> & { $all: Store<Done[]> } & T;
  }

  if (!is.effect(fx)) {
    throw new Error("Passed parameter is not an Effect");
  }

  const $all = createStore<Done[]>([]).on(fx.doneData, (s, ev) => [...s, ev]);
  return Object.assign(fx, { $all });
}

export function ev$all<T, Payload>(
  ev: Event<Payload> & { $all?: Store<Payload[]> } & T
): Event<Payload> & { $all: Store<Payload[]> } & T {
  if (ev.$all) {
    return ev as Event<Payload> & { $all: Store<Payload[]> } & T;
  }

  if (!is.event(ev)) {
    throw new Error("Passed parameter is not an Event");
  }

  const $all = createStore<Payload[]>([]).on(ev, (s, ev) => [...s, ev]);
  return Object.assign(ev, { $all });
}

export function fx$flatAll<T, Params, Done, Fail>(
  fx: Effect<Params, Done[], Fail> & { $flatAll?: Store<Done[]> } & T
): Effect<Params, Done[], Fail> & { $flatAll: Store<Done[]> } & T {
  if (fx.$flatAll) {
    return fx as Effect<Params, Done[], Fail> & { $flatAll: Store<Done[]> } & T;
  }

  if (!is.effect(fx)) {
    throw new Error("Passed parameter is not an Effect");
  }

  const $flatAll = createStore<Done[]>([]).on(fx.doneData, (s, ev) => [
    ...s,
    ...ev,
  ]);
  return Object.assign(fx, { $flatAll });
}

export function ev$flatAll<T, Payload>(
  ev: Event<Payload[]> & { $flatAll?: Store<Payload[]> } & T
): Event<Payload[]> & { $flatAll: Store<Payload[]> } & T {
  if (ev.$flatAll) {
    return ev as Event<Payload[]> & { $flatAll: Store<Payload[]> } & T;
  }

  if (!is.event(ev)) {
    throw new Error("Passed parameter is not an Event");
  }

  const $flatAll = createStore<Payload[]>([]).on(ev, (s, ev) => [...s, ...ev]);
  return Object.assign(ev, { $flatAll });
}
