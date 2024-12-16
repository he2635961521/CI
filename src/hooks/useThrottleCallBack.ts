import { useCallback } from "react";

function useThrottle(fn: (arg?: unknown) => void, delay: number = 5000) {
  let timer: number | null = null;
  return function (...args: unknown[]) {
    if (timer) return;
    timer = window.setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
}

export function useThrottleCallBack(
  fn: (arg?: unknown) => void,
  delay: number = 5000,
) {
  const throttle = useThrottle(fn, delay);
  return useCallback(throttle, [throttle]);
}
