import { memo, useState } from 'react';
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
import AllCategoriesModal from '../modals/AllCategoriesModal';

function MonthCategoryLabel() {
  console.log('MonthCategoryText render.');
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return (
    <View>
      <View style={styles.container}>
        <Header title="Категории месяца" size={3} />
        <TouchableOpacity onPress={handleOpenModal}>
          <SvgDots />
        </TouchableOpacity>
      </View>
      <AllCategoriesModal visible={modalVisible} onClose={handleCloseModal} />
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
  image: {
    width: 20,
    height: 20,
  },
});
