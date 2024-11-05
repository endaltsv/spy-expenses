import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardType, StyleSheet, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  value?: string;
  placeholder: string;
  keyboardType?: KeyboardType;
  active?: boolean;
  setAmount?: (value: string) => void;
}

export default function Input({
  value,
  placeholder,
  keyboardType,
  active,
  setAmount,
}: Props) {
  return (
    <TouchableOpacity onPress={() => console.log('123')}>
      <View
        style={active ? styles.inputContainerActive : styles.inputContainer}
      >
        <TextInput
          editable={false}
          style={styles.input}
          placeholder={placeholder}
          keyboardType={keyboardType || 'default'}
          placeholderTextColor="#a1a1a1"
          value={value}
          onChangeText={setAmount}
        />
        {!value && (
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color="#a1a1a1"
            style={styles.icon}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderColor: '#363636',
    borderWidth: 1,
  },
  inputContainerActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderColor: '#d3fd51',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: 44,
    color: 'white',
  },
  icon: {
    position: 'absolute',
    right: 12,
  },
});
