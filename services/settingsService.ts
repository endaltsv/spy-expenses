import storage from './storage';

import { UserSettings, defaultUserSettings } from '../models/UserSettings';

const SETTINGS_KEY = 'user_settings';

export const saveUserSettings = (settings: UserSettings) => {
  try {
    storage.set(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error(error);
  }
};

export const loadUserSettings = (): UserSettings => {
  try {
    const settingsString = storage.getString(SETTINGS_KEY);
    return settingsString ? JSON.parse(settingsString) : defaultUserSettings;
  } catch (error) {
    console.error(error);
    return defaultUserSettings;
  }
};
