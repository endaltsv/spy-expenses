// hooks/useSettings.ts
import { useState, useEffect, useCallback } from 'react';
import { UserSettings, defaultUserSettings } from '../models/UserSettings';
import {
  loadUserSettings,
  saveUserSettings,
} from '../services/settingsService';

const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(defaultUserSettings);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const loadedSettings = await loadUserSettings();
        setSettings(loadedSettings);
      } catch (err) {
        console.error('Ошибка при загрузке настроек:', err);
        setError('Ошибка при загрузке настроек.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateSettings = useCallback(
    async (updatedSettings: Partial<UserSettings>) => {
      const newSettings = { ...settings, ...updatedSettings };
      setSettings(newSettings);
      try {
        await saveUserSettings(newSettings);
      } catch (err) {
        console.error('Ошибка при сохранении настроек:', err);
        setError('Ошибка при сохранении настроек.');
      }
    },
    [settings],
  );

  return {
    settings,
    loading,
    error,
    updateSettings,
  };
};

export default useSettings;
