import { memo, useState, useCallback } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useExpensesContext } from '@/context/ExpensesContext';
import { useCategoriesContext } from '@/context/CategoriesContext';
import SvgCalendar from '@/assets/images/calendar.svg';
import Handle from './shared/Handle';
import Category from './shared/Category';
import Header from '../ui/Header';

interface AddExpenseModalProps {
  visible: boolean;
  toggleModal: () => void;
}

const AddExpenseModal = ({ visible, toggleModal }: AddExpenseModalProps) => {
  console.log('AddExpenseModal render.');
  const { addExpense } = useExpensesContext();
  const { categories } = useCategoriesContext();

  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');

  const showDatePicker = useCallback(() => setDatePickerVisibility(true), []);
  const hideDatePicker = useCallback(() => setDatePickerVisibility(false), []);

  const handleConfirmDate = useCallback(
    (selectedDate: Date) => {
      setDate(selectedDate);
      hideDatePicker();
    },
    [hideDatePicker],
  );

  const handleAddExpense = useCallback(() => {
    if (name.trim() === '' || amount.trim() === '' || !selectedCategory) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все обязательные поля.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Ошибка', 'Пожалуйста, введите корректную сумму.');
      return;
    }
    console.log('ok');
    const newExpense = {
      name: name.trim(),
      amount: parsedAmount,
      dateTime: date.toISOString(),
      categoryId: selectedCategory,
      comment: comment.trim() !== '' ? comment.trim() : undefined,
    };

    addExpense(newExpense);

    // Clear inputs
    setName('');
    setAmount('');
    setSelectedCategory(null);
    setComment('');
    setDate(new Date());

    toggleModal();
  }, [name, amount, selectedCategory, comment, date, addExpense, toggleModal]);

  const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

  const handleCategoryPress = useCallback((id: string) => {
    setSelectedCategory(id);
  }, []);

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen={false}
      style={styles.modalContainer}
      hasBackdrop={true}
      backdropColor="white"
      backdropOpacity={0.1}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      swipeDirection="down"
      onSwipeComplete={toggleModal}
      swipeThreshold={150}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Handle />
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Header title="Новая трата" />
            <View style={styles.fieldContainer}>
              <Text style={styles.labelSum}>Сумма</Text>
              <TextInput
                style={styles.inputSum}
                placeholder="Введите сумму"
                placeholderTextColor="#a1a1a1"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Название</Text>
              <TextInput
                style={styles.input}
                placeholder="Введите название"
                placeholderTextColor="#a1a1a1"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Дата и время</Text>
              <TouchableOpacity
                style={styles.dateTimeContainer}
                onPress={showDatePicker}
              >
                <SvgCalendar style={styles.calendarIcon} />
                <Text style={styles.dateTimeText}>{formattedDate}</Text>
              </TouchableOpacity>
            </View>
            {isDatePickerVisible && (
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
              />
            )}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Категория</Text>
              <View style={styles.categoryContainer}>
                {categories.map((category) => (
                  <Category
                    key={category.id}
                    category={category}
                    active={selectedCategory === category.id}
                    onPress={() => handleCategoryPress(category.id)}
                  />
                ))}
              </View>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Комментарий</Text>
              <TextInput
                style={[styles.input, styles.commentInput]}
                multiline
                placeholderTextColor="#a1a1a1"
                value={comment}
                onChangeText={setComment}
              />
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddExpense}
            >
              <Text style={styles.addButtonText}>Добавить</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default memo(AddExpenseModal);

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '95%',
    backgroundColor: '#1a1a1a',
    paddingTop: 54,
    paddingLeft: 24,
    paddingRight: 26,
    paddingBottom: 16,
    marginBottom: 1,
  },
  fieldContainer: {
    marginTop: 22,
  },
  labelSum: {
    color: '#d3fd51',
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 12,
  },
  inputSum: {
    height: 44,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: 'white',
    borderColor: '#d3fd51',
    borderWidth: 1,
  },
  label: {
    color: '#fff',
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 12,
  },
  input: {
    height: 44,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: 'white',
    borderColor: '#363636',
    borderWidth: 1,
  },
  commentInput: {
    height: 92,
    textAlignVertical: 'top',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderColor: '#363636',
    borderWidth: 1,
  },
  calendarIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  dateTimeText: {
    color: 'white',
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addButton: {
    backgroundColor: '#d3fd51',
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
    height: 44,
  },
  addButtonText: {
    color: '#1a1a1a',
    fontFamily: 'SFPro-Regular',
    fontSize: 18,
    lineHeight: 22,
  },
});
