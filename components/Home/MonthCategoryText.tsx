import { View, Text, StyleSheet, Image } from 'react-native';

export default function MonthCategoryText() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Категории месяца</Text>
      <Image
        source={require('../../assets/images/dots.png')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'SFPro-Bold',
    color: '#000', // черный цвет для основного текста
  },
  image: {
    width: 20, // размер изображения с точками
    height: 20,
  },
});
