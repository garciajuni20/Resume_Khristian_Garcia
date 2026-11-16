import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * False on the server and while React hydrates the prerendered HTML, true from
 * the render right after. Anything that depends on this browser (saved theme,
 * sound, UV light) renders its server default until then, so the hydrated
 * markup matches what the build wrote and React updates it with a normal render.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
