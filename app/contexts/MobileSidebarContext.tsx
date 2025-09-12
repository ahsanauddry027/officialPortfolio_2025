"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MobileSidebarContextType {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const MobileSidebarContext = createContext<
  MobileSidebarContextType | undefined
>(undefined);

export function MobileSidebarProvider({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <MobileSidebarContext.Provider value={{ mobileOpen, setMobileOpen }}>
      {children}
    </MobileSidebarContext.Provider>
  );
}

export function useMobileSidebar() {
  const context = useContext(MobileSidebarContext);
  if (context === undefined) {
    throw new Error(
      "useMobileSidebar must be used within a MobileSidebarProvider"
    );
  }
  return context;
}
