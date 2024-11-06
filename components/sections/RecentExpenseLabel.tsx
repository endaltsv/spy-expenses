import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import AllExpensesModal from '@/components/modals/AllExpensesModal';
import Header from '../ui/Header';
import Subtitle from '../ui/Subtitle';

function RecentExpenseText() {
  console.log('RecentExpenseText render.');
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return (
    <View>
      <View style={styles.container}>
        <Header title="Недавние траты" size={3} />
        <TouchableOpacity onPress={handleOpenModal}>
          <Subtitle title="СМ ВСЕ" size={2} />
        </TouchableOpacity>
      </View>

      <AllExpensesModal visible={modalVisible} onClose={handleCloseModal} />
    </View>
  );
}

export default memo(RecentExpenseText);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  viewAll: {
    color: '#6f6f6f',
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
});
