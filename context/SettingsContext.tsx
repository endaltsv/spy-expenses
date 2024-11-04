// contexts/SettingsContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import useSettings from '../hooks/useSettings';
import { UserSettings } from '../models/UserSettings';

interface SettingsContextProps {
  settings: UserSettings;
  loading: boolean;
  error: string | null;
  updateSettings: (updatedSettings: Partial<UserSettings>) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined,
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { settings, loading, error, updateSettings } = useSettings();

  return (
    <SettingsContext.Provider
      value={{ settings, loading, error, updateSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      'useSettingsContext must be used within a SettingsProvider',
    );
  }
  return context;
};
