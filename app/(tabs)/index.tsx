import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Alert, TouchableOpacity, View, ScrollView, TextInput, Modal, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRoute } from '@react-navigation/native';

export default function HomeScreen() {
  const categories = ['Еда', 'Развлечения', 'Транспорт', 'Прочее', 'Залупа'];

  const route = useRoute();
  const [selectedDate, setSelectedDate] = useState(route.params?.selectedDate || getTodayDate());

  useEffect(() => {
    if (route.params?.selectedDate) {
      setSelectedDate(route.params.selectedDate);
    }
  }, [route.params?.selectedDate]);

  function getTodayDate() {
    return new Date().toISOString().split('T')[0];
  }

  const [isModalVisible, setModalVisible] = useState(false);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState(categories[0]);
  const [productsList, setProductsList] = useState([
    { name: 'Хлеб', price: 50, quantity: 1, category: 'Еда', date: getTodayDate() },
    { name: 'Молоко', price: 100, quantity: 2, category: 'Еда', date: getTodayDate() },
  ]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleAddExpense = () => {
    const newProduct = {
      name: expenseName,
      price: parseInt(expenseAmount),
      quantity,
      category,
      date: selectedDate,
    };

    setProductsList([...productsList, newProduct]);
    setModalVisible(false);
    setExpenseName('');
    setExpenseAmount('');
    setQuantity(1);
    setCategory(categories[0]);
  };

  const confirmDeleteProduct = (product) => {
    setProductToDelete(product);
    setDeleteModalVisible(true);
  };

  const handleDeleteProduct = () => {
    setProductsList(productsList.filter((item) => item !== productToDelete));
    setDeleteModalVisible(false);
  };

  const getTotalByCategory = () => {
    return productsList
      .filter((product) => product.date === selectedDate)
      .reduce((acc, product) => {
        const productTotal = product.price * product.quantity;
        if (acc[product.category]) {
          acc[product.category] += productTotal;
        } else {
          acc[product.category] = productTotal;
        }
        return acc;
      }, {});
  };

  const totalsByCategory = getTotalByCategory();

  return (
    <View style={styles.container}>
      <ScrollView>
        <ParallaxScrollView
          headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
          headerImage={
            <Image
              source={require('@/assets/images/beagle.png')}
              style={styles.reactLogo}
            />
          }>
          <ThemedView>
            <ThemedText type="subtitle">Траты за {selectedDate}:</ThemedText>
          </ThemedView>

          {productsList
            .filter((product) => product.date === selectedDate)
            .map((product, index) => (
              <View key={index} style={styles.productContainer}>
                <ThemedText type="list">
                  {product.name} ({product.category}) ~ {product.price * product.quantity}₽
                </ThemedText>
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => confirmDeleteProduct(product)}
                >
                  <Text style={styles.deleteIconText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}

          <ThemedView>
            <ThemedText type="subtitle">Итого по категориям:</ThemedText>
            {Object.keys(totalsByCategory).map((cat, idx) => (
              <ThemedText type="list" key={idx}>
                {cat}: {totalsByCategory[cat]}₽
              </ThemedText>
            ))}
          </ThemedView>
        </ParallaxScrollView>
      </ScrollView>

      {/* Кнопка добавления трат */}
      <View style={styles.btnExpenses}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <ThemedText style={styles.buttonText}>Добавить трату</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Модальное окно для добавления траты */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>Введите данные о трате</ThemedText>

            <TextInput
              style={styles.input}
              placeholder="Название траты"
              placeholderTextColor="#999"
              value={expenseName}
              onChangeText={setExpenseName}
            />
            <TextInput
              style={styles.input}
              placeholder="Сумма"
              placeholderTextColor="#999"
              value={expenseAmount}
              onChangeText={setExpenseAmount}
              keyboardType="numeric"
            />

            {/* Кнопки для выбора категории */}
            <View style={styles.categoryContainer}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    category === cat && styles.categoryButtonSelected
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={styles.categoryButtonText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(quantity + 1)}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleAddExpense}>
              <Text style={styles.submitButtonText}>ОК</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Модальное окно подтверждения удаления */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>Удалить {productToDelete?.name}?</ThemedText>
            <View style={styles.deleteActions}>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteProduct}>
                <Text style={styles.deleteButtonText}>Да</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Нет</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reactLogo: {
    height: 270,
    width: 400,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteIcon: {
    padding: 5,
  },
  deleteIconText: {
    color: 'gray',
    fontSize: 14,
  },
  btnExpenses: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#7258db',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#151718',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    backgroundColor: '#333',
    color: 'white',
    marginBottom: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#333',
    margin: 5,
  },
  categoryButtonSelected: {
    backgroundColor: '#7258db',
  },
  categoryButtonText: {
    color: 'white',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7258db',
    borderRadius: 5,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 20,
  },
  quantityText: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#7258db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteActions: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
  },
});
