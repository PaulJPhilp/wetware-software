"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type HeaderContextType = {
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [headerHeight, setHeaderHeight] = useState(28); // Default to h-7 (28px)

  return (
    <HeaderContext.Provider value={{ headerHeight, setHeaderHeight }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeaderHeight() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeaderHeight must be used within a HeaderProvider");
  }
  return context;
}
