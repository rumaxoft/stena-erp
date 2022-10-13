import { Result, Err, Ok, err, ok } from './index';

const testValue = 1;
const errorMsg = 'TestMsg';
const success: Ok<number> = ok(testValue);
const error: Err<string> = err(errorMsg);
const incError = 'cannot increment to >3';

function inc(value: number) {
  if (value >= 3) return err(incError);
  return ok(value + 1);
}

describe('Result Monad', () => {
  it('isOk(), isError()', () => {
    expect(success.isOk()).toBe(true);
    expect(success.isErr()).toBe(false);
    expect(error.isOk()).toBe(false);
    expect(error.isErr()).toBe(true);
  });
  it('getResult()', () => {
    expect(success.getResult()).toBe(testValue);
    expect(error.getResult()).toBe(errorMsg);
  });
  it('map', () => {
    const incrementedValueBy1: Result<number, string> = success.map(inc);
    const incrementedValueBy3: Result<number, string> = success
      .map(inc)
      .map(inc)
      .map(inc);
    expect(incrementedValueBy1.getResult()).toBe(testValue + 1);
    expect(incrementedValueBy3.getResult()).toBe(incError);
  });
  it('instance of Ok', () => {
    if (success.isOk()) {
      expect(success).toBeInstanceOf(Ok);
    }
  });
  it('instance of Err', () => {
    if (success.isErr()) {
      expect(success).toBeInstanceOf(Err);
    }
  });
});
