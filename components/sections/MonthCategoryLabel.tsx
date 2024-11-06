import { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import SvgDots from '../../assets/images/dot-horizontal.svg';
import Header from '../ui/Header';

function MonthCategoryLabel() {
  console.log('MonthCategoryText render.');
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Header title="Категории месяца" size={3} />
      <TouchableOpacity>
        <SvgDots />
      </TouchableOpacity>
    </View>
  );
}
export default memo(MonthCategoryLabel);

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
