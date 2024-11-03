import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
  id: 'spy-expenses',
  // сюда бы добавить енкриптион
});

export default storage;
