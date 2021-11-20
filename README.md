# effector-storify

[Effector](https://effector.dev/) utils for storify Effect/Event

## API

#### fx$last

```typescript
const fx = fx$last(createEffect<number, number>(x => x));
fx(0);
fx(1);
fx.$last.getState(); // 1
```

#### ev$last

```typescript
const ev = ev$last(createEvent<number>());
ev(0);
ev(1);
ev.$last.getState(); // 1
```

#### fx$all

```typescript
const fx = fx$all(createEffect<number, number>(x => x));
fx(0);
fx(1);
fx.$all.getState(); // [0, 1]
```

#### ev$all

```typescript
const ev = ev$all(createEvent<number>());
ev(0);
ev(1);
ev.$all.getState(); // [0, 1]
```

## Related

- [effector-async-local-storage](https://github.com/darky/effector-async-local-storage) - Effector Domain based on AsyncLocalStorage

- [ts-fp-di](https://github.com/darky/ts-fp-di) - Tiny TypeScript functional dependency injection, based on Node.js AsyncLocalStorage
