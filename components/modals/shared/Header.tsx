import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 54,
    marginBottom: 2,
  },
  title: {
    color: 'white',
    lineHeight: 28,
    fontSize: 24,
    fontFamily: 'SFPro-Bold',
  },
});
