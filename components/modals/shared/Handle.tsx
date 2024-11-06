import { StyleSheet, View } from 'react-native';

export default function Handle() {
  console.log('Handle render.');
  return <View style={styles.handle} />;
}

const styles = StyleSheet.create({
  handle: {
    left: '47%',
    top: -25,
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
  },
});
