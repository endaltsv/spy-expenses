import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
  size?: number;
  color?: string;
}

export default function Subtitle({
  title,
  size = 1,
  color = '#979797',
}: Props) {
  const sizes: any = {
    1: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: 'SFPro-Medium',
    },
    2: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: 'SFPro-Medium',
    },
  };
  return <Text style={[sizes[size], { color: color }]}>{title}</Text>;
}
