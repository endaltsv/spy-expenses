import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  View,
  Text,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import AddExpenseModal from './Modal';

export function AddButton() {
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Image
          source={require('../../../assets/images/plus.svg')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <AddExpenseModal visible={visible} toggleModal={toggleModal} />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -35 }],
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Тень для Android
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});