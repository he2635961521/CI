/* eslint-disable @typescript-eslint/ban-types */
import { useCallback } from "react";

function useThrottle(fn: Function, delay: number = 5000) {
  let timer: number | null = null;
  return function (...args: unknown[]) {
    if (timer) return;
    timer = window.setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
}

export function useThrottleCallBack(fn: Function, delay: number = 5000) {
  const throttled = useThrottle(fn, delay);
  return useCallback(throttled, [throttled]);
}
