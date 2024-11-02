// Modal.tsx
import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  View,
  Text,
  TextInput,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddExpenseModalProps {
  visible: boolean;
  toggleModal: () => void;
}

export default function AddExpenseModal({
  visible,
  toggleModal,
}: AddExpenseModalProps) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryIcons: { [key: string]: any } = {
    Еда: require('../../../assets/images/categories/food.svg'),
    Транспорт: require('../../../assets/images/categories/transport.svg'),
    Шоппинг: require('../../../assets/images/categories/shopping.svg'),
    Транспорт2: require('../../../assets/images/categories/transport.svg'),
    // Добавьте другие категории и их иконки
  };

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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleModal}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
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
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Название</Text>
              <TextInput
                style={styles.input}
                placeholder="Введите название"
                placeholderTextColor="#a1a1a1"
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
                {Object.keys(categoryIcons).map((categoryKey) => (
                  <TouchableOpacity
                    key={categoryKey}
                    style={
                      selectedCategory === categoryKey
                        ? styles.selectedCategoryButton
                        : styles.categoryButton
                    }
                    onPress={() => setSelectedCategory(categoryKey)}
                  >
                    <Image
                      source={categoryIcons[categoryKey]}
                      style={
                        selectedCategory === categoryKey
                          ? styles.selectedCategoryIcon
                          : styles.categoryIcon
                      }
                    />
                    <Text
                      style={
                        selectedCategory === categoryKey
                          ? styles.categoryTextSelected
                          : styles.categoryText
                      }
                    >
                      {capitalizeFirstLetter(categoryKey)}
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
              />
            </View>

            <TouchableOpacity style={styles.addButton}>
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
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: '100%',
    backgroundColor: '#1a1a1a',
    paddingTop: 54,
    paddingLeft: 24,
    paddingRight: 26,
  },
  closeButtonContainer: {
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
    tintColor: '#a1a1a1',
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
    tintColor: 'white',
  },
  selectedCategoryIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    tintColor: 'black',
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
