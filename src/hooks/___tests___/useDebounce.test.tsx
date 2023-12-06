import { renderHook } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  test('should call provided function after delay', async () => {
    jest.useFakeTimers();

    const fn = jest.fn();
    const { result } = renderHook(() => useDebounce(fn, 200));

    result.current();

    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);

    expect(fn).toHaveBeenCalled();

    jest.useRealTimers();
  });
});
