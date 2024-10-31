import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/Colors';

export function AddButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Image
        source={require('../assets/images/plus.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20, // Поднимаем кнопку над TabBar
    left: '50%', // Ставим кнопку на 50% ширины
    transform: [{ translateX: -35 }], // Центрируем кнопку по горизонтали
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
