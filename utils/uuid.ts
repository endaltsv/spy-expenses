import uuid from 'react-native-uuid';

export const generateUUID = () => {
  return uuid.v4() as string;
};
