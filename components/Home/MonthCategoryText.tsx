import { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from 'styled-components/native';
function MonthCategoryText() {
  console.log('MonthCategoryText render.');
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Категории месяца
      </Text>
      <Image
        source={require('../../assets/images/dots.png')}
        style={styles.image}
      />
    </View>
  );
}
export default memo(MonthCategoryText);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 32,
    marginBottom: 12,
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
