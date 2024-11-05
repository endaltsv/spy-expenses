// ExpenseModal.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { Expense } from '@/models/Expense';
import Handle from './shared/Handle';
import Category from './shared/Category';
import { useCategoriesContext } from '@/context/CategoriesContext';
import Header from './shared/Header';
import Input from './shared/Input';

interface ExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  expenses: Expense[];
}

const ExpenseModal = ({ visible, onClose, expenses }: ExpenseModalProps) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const { categories } = useCategoriesContext();

  return (
    <Modal
      isVisible={visible}
      style={styles.modalContainer}
      swipeDirection="down"
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
            style={styles.searchInput}
            placeholder="Поиск"
            placeholderTextColor="#6f6f6f"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />

          <View style={styles.categoryContainer}>
            <Category category={categories[2]} active={true} />
          </View>
          <Header title="Траты за" />
          <Input />
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
    backgroundColor: '#333',
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
