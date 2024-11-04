// components/AddButtonWithModal.tsx
import React, { useState, useCallback } from 'react';
import { TouchableOpacity, StyleSheet, Modal, View, Text } from 'react-native';
import { useTheme } from 'styled-components/native';

function AddButtonWithModal() {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const toggleModal = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return (
    <>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={toggleModal}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>Добавление нового расхода</Text>
            {/* Другие элементы модального окна */}
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeButton}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    color: '#007BFF',
  },
});

export default React.memo(AddButtonWithModal);
