export type Result<T, E> = Ok<T> | Err<E>;

interface IResult<T, E> {
  isOk(): this is Ok<T>;
  isErr(): this is Err<E>;
}

interface IErr<E> {
  map: (fn: (_: any) => any) => Err<E>;
  getResult: () => E;
}

export class Err<E> implements IResult<never, E>, IErr<E> {
  constructor(readonly error: E) {}
  isOk(): this is Ok<never> {
    return false;
  }
  isErr(): this is Err<E> {
    return !this.isOk();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map(_fn) {
    return this;
  }
  getResult() {
    return this.error;
  }
}

export const err = <E>(error: E): Err<E> => new Err(error);
export const ok = <T>(value: T): Ok<T> => new Ok(value);

interface IOk<T> {
  value: T;
  map<R, E>(fn: (value: T) => Result<R, E | any>): Result<R, E | any>;
  getResult: () => T;
}

export class Ok<T> implements IResult<T, never>, IOk<T> {
  constructor(readonly value: T) {}
  isOk(): this is Ok<T> {
    return true;
  }
  isErr(): this is Err<never> {
    return !this.isOk();
  }
  map<R, E>(fn: (value: T) => Result<R, E>): Result<R, E | any> {
    let r: Result<R, E>;
    try {
      r = fn(this.value);
    } catch (e: any) {
      return err(e.message);
    }
    if ('error' in r) {
      return err(r.error);
    } else {
      return ok(r.value);
    }
  }
  getResult() {
    return this.value;
  }
}
