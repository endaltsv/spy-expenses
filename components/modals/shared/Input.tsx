import { KeyboardType, StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
  amount: string;
  placeholder: string;
  keyboardType?: KeyboardType;
  setAmount: (value: string) => void;
}

export default function Input({
  amount,
  placeholder,
  keyboardType,
  setAmount,
}: Props) {
  return (
    <TextInput
      style={styles.inputSum}
      placeholder={placeholder}
      keyboardType={keyboardType && 'default'}
      placeholderTextColor="#a1a1a1"
      value={amount}
      onChangeText={setAmount}
    />
  );
}

const styles = StyleSheet.create({
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
});
