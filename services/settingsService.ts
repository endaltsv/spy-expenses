// services/settingsService.ts
import storage from './storage';
import { UserSettings, defaultUserSettings } from '../models/UserSettings';

const SETTINGS_KEY = 'user_settings';

export const saveUserSettings = async (
  settings: UserSettings,
): Promise<void> => {
  try {
    await storage.set(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Ошибка при сохранении настроек:', error);
  }
};

export const loadUserSettings = async (): Promise<UserSettings> => {
  try {
    const settingsString = await storage.getString(SETTINGS_KEY);
    return settingsString ? JSON.parse(settingsString) : defaultUserSettings;
  } catch (error) {
    console.error('Ошибка при загрузке настроек:', error);
    return defaultUserSettings;
  }
};
