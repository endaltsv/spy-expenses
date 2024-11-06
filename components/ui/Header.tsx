import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
  size?: number;
}

export default function Header({ title, size = 1 }: Props) {
  const sizes: any = {
    1: {
      fontSize: 32,
      lineHeight: 36,
      fontFamily: 'SFPro-Bold',
    },
    2: {
      fontSize: 24,
      lineHeight: 28,
      fontFamily: 'SFPro-Bold',
    },
    3: {
      fontSize: 20,
      lineHeight: 24,
      fontFamily: 'SFPro-Semibold',
    },
    4: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: 'SFPro-Semibold',
    },
  };
  return <Text style={[sizes[size], { color: 'white' }]}>{title}</Text>;
}
