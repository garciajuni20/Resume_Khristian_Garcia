import { createContext, useContext } from 'react';

export type UvState = { on: boolean; toggle: () => void };

export const UvContext = createContext<UvState>({ on: false, toggle: () => {} });

/** UV light mode: on/off and the toggle (provider in UvMode.tsx) */
export const useUv = () => useContext(UvContext);
