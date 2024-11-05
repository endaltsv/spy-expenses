import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import ExpenseModal from '@/components/modals/ExpensesModal';

function RecentExpenseText() {
  console.log('RecentExpenseText render.');
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const expenses = [
    {
      id: '1',
      name: 'Бургер Кинг',
      amount: 1789,
      date: 'Сегодня',
      icon: 'food',
    },
    {
      id: '2',
      name: 'Макдональдс',
      amount: 2389,
      date: 'Сегодня',
      icon: 'food',
    },
    { id: '3', name: 'Метро', amount: 2389, date: 'Сегодня', icon: 'train' },
    // добавьте больше элементов для тестирования
  ];

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return (
    <View>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Недавние траты
        </Text>
        <TouchableOpacity onPress={handleOpenModal}>
          <Text style={styles.viewAll}>СМ ВСЕ</Text>
        </TouchableOpacity>
      </View>

      <ExpenseModal
        visible={modalVisible}
        onClose={handleCloseModal}
        expenses={expenses}
      />
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
  title: {
    fontSize: 20,
    fontFamily: 'SFPro-Bold',
    lineHeight: 24,
    color: '#000',
  },
  viewAll: {
    color: '#6f6f6f',
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
});
