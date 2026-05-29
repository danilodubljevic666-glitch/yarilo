"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Ctx = { done: boolean; markDone: () => void };

const PreloaderContext = createContext<Ctx>({ done: false, markDone: () => {} });

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  return (
    <PreloaderContext.Provider value={{ done, markDone: () => setDone(true) }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export const usePreloaderDone = () => useContext(PreloaderContext);
