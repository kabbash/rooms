"use client";

import { createContext, useContext } from "react";

const OfficeTimezoneContext = createContext<string | null>(null);

type OfficeTimezoneProviderProps = {
  timezone: string;
  children: React.ReactNode;
};

export function OfficeTimezoneProvider({
  timezone,
  children,
}: OfficeTimezoneProviderProps) {
  return (
    <OfficeTimezoneContext.Provider value={timezone}>
      {children}
    </OfficeTimezoneContext.Provider>
  );
}

export function useOfficeTimezone(): string {
  const timezone = useContext(OfficeTimezoneContext);

  if (!timezone) {
    throw new Error(
      "useOfficeTimezone must be used within OfficeTimezoneProvider",
    );
  }

  return timezone;
}
