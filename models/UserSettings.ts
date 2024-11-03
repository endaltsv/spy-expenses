export interface UserSettings {
  id: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  currency: string;
  language: string;
  notificationsEnabled: boolean;
}

export const defaultUserSettings: UserSettings = {
  id: 0,
  primaryColor: '#FFFFFF',
  secondaryColor: '#FFFFFF',
  accentColor: '#FFFFFF',
  currency: 'USD',
  language: 'ru',
  notificationsEnabled: true,
};
