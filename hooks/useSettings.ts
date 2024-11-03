// src/hooks/useSettings.ts
import { useState, useEffect } from 'react';
import { UserSettings, defaultUserSettings } from '../models/UserSettings';
import { loadUserSettings, saveUserSettings } from '@/services/settingsService';

const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(defaultUserSettings);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const loadedSettings = loadUserSettings();
      setSettings(loadedSettings);
    } catch (err) {
      setError('Ошибка при загрузке настроек.');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = (updatedSettings: Partial<UserSettings>) => {
    const newSettings = { ...settings, ...updatedSettings };
    setSettings(newSettings);
    try {
      saveUserSettings(newSettings);
    } catch (err) {
      setError('Ошибка при сохранении настроек.');
    }
  };

  return {
    settings,
    loading,
    error,
    updateSettings,
  };
};

export default useSettings;
