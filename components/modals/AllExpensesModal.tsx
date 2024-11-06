import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useTheme } from 'styled-components/native';
import Modal from 'react-native-modal';
import Handle from './shared/Handle';
import Category from './shared/Category';
import { useCategoriesContext } from '@/context/CategoriesContext';
import Header from '../ui/Header';
import Input from './shared/Input';
import { useExpensesContext } from '@/context/ExpensesContext';
import ExpenseCard from './shared/Expense';

interface ExpenseModalProps {
  visible: boolean;
  onClose: () => void;
}

const ExpenseModal = ({ visible, onClose }: ExpenseModalProps) => {
  console.log('ExpenseModal render.');
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const { categories } = useCategoriesContext();
  const { expenses } = useExpensesContext();

  const handleSearchChange = useCallback(
    (text: string) => setSearchQuery(text),
    [],
  );

  return (
    <Modal
      isVisible={visible}
      style={styles.modalContainer}
      swipeDirection="down"
      onSwipeComplete={onClose}
      swipeThreshold={150}
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Handle />
          <TextInput
            style={[
              styles.searchInput,
              { backgroundColor: theme.colors.inputBackground },
            ]}
            placeholder="Поиск"
            placeholderTextColor={theme.colors.placeholderText}
            value={searchQuery}
            onChangeText={handleSearchChange}
          />

          {categories[2] && (
            <View style={styles.categoryContainer}>
              <Category
                category={categories[2]}
                active={true}
                closeVisible={true}
              />
            </View>
          )}

          <Header title="Траты за" />
          <Input placeholder="5 Ноября - 10 Ноября" active={true} />
          <Header title="Сегодня" />
          {expenses[0] && <ExpenseCard expense={expenses[0]} />}
        </View>
      </View>
    </Modal>
  );
};

export default ExpenseModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '95%',
    paddingTop: 54,
    paddingLeft: 24,
    paddingRight: 26,
    paddingBottom: 16,
    marginBottom: 1,
  },
  searchInput: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
