import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
  set: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Ошибка при сохранении значения с ключом ${key}:`, error);
    }
  },
  getString: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Ошибка при получении значения с ключом ${key}:`, error);
      return null;
    }
  },
  delete: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Ошибка при удалении значения с ключом ${key}:`, error);
    }
  },
};

export default storage;
