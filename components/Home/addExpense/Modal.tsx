// Modal.tsx
import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useExpensesContext } from '@/context/ExpensesContext';
import { useCategoriesContext } from '@/context/CategoriesContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AddExpenseModalProps {
  visible: boolean;
  toggleModal: () => void;
}

export default function AddExpenseModal({
  visible,
  toggleModal,
}: AddExpenseModalProps) {
  console.log('AddExpenseModal(Modal) render.');
  const { addExpense, getCategoryIdByName } = useExpensesContext();
  const { categories } = useCategoriesContext();

  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>(''); // Храним сумму как строку для удобства ввода
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleAddExpense = () => {
    console.log('handleAddExpense');

    if (name.trim() === '' || amount.trim() === '' || !selectedCategory) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все обязательные поля.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Ошибка', 'Пожалуйста, введите корректную сумму.');
      return;
    }

    console.log(selectedCategory);
    const newExpense = {
      name: name.trim(),
      amount: parsedAmount,
      dateTime: date.toISOString(),
      categoryId: selectedCategory,
      comment: comment.trim() !== '' ? comment.trim() : undefined,
    };
    console.log(newExpense);

    addExpense(newExpense);

    setName('');
    setAmount('');
    setSelectedCategory(null);
    setComment('');
    setDate(new Date());

    toggleModal();
  };

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      coverScreen={true}
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.handle} />
            {/* Визуальная индикация для свайпа */}
            {/* Close Button Positioned Above the Title */}
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.header}>
              <Text style={styles.title}>Новая трата</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.labelSum}>Сумма</Text>
              <TextInput
                style={styles.inputSum}
                placeholder="Введите сумму"
                keyboardType="numeric"
                placeholderTextColor="#a1a1a1"
                value={amount}
                onChangeText={setAmount}
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
                onPress={() => setShowDatePicker(true)}
              >
                <Image
                  source={require('../../../assets/images/calendar.svg')} // Убедитесь, что путь к изображению корректен
                  style={styles.calendarIcon}
                  tintColor={'#a1a1a1'}
                />
                <Text style={styles.dateTimeText}>{formattedDate}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="datetime"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onChangeDate}
                />
              )}
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Категория</Text>
              <View style={styles.categoryContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={
                      selectedCategory === category.id
                        ? styles.selectedCategoryButton
                        : styles.categoryButton
                    }
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <MaterialCommunityIcons
                      name={category.icon}
                      size={16}
                      style={
                        selectedCategory === category.id
                          ? styles.selectedCategoryIcon
                          : styles.categoryIcon
                      }
                    />
                    {/* <Image
                      source={{ uri: category.icon }}
                      style={
                        selectedCategory === category.id
                          ? styles.selectedCategoryIcon
                          : styles.categoryIcon
                      }
                    /> */}
                    <Text
                      style={
                        selectedCategory === category.id
                          ? styles.categoryTextSelected
                          : styles.categoryText
                      }
                    >
                      {capitalizeFirstLetter(category.name)}
                    </Text>
                  </TouchableOpacity>
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
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  handle: {
    left: '47%',
    top: -25,
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
  },
  modalContent: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    height: '97%',
    backgroundColor: '#1a1a1a',
    paddingTop: 54,
    paddingLeft: 24,
    paddingRight: 26,
  },
  closeButtonContainer: {
    display: 'none',
    position: 'absolute',
    top: 63,
    right: 26, // Align with paddingLeft
    zIndex: 1,
  },
  closeButton: {
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    marginTop: 54, // Space below the close button
    marginBottom: 2,
  },
  title: {
    color: 'white',
    lineHeight: 28,
    fontSize: 24,
    fontFamily: 'SFPro-Bold',
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
    textAlignVertical: 'top', // For Android to align text at the top
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
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#979797',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#d3fd51',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    color: 'white',
  },
  selectedCategoryIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    color: 'black',
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
  },
  categoryTextSelected: {
    color: 'black',
    fontSize: 14,
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
