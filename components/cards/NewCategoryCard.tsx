import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';

export default function NewCategoryCard() {
  console.log('NewCategoryCard render.');
  const theme = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.secondary }]}>
      <View
        style={[styles.iconContainer, { backgroundColor: theme.colors.accent }]}
      >
        <MaterialCommunityIcons
          name="plus"
          size={28}
          color={theme.colors.background}
        />
      </View>
      <Text style={styles.categoryName}>Добавить новую категорию</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 140,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
    fontFamily: 'SFPro-Regular',
  },
});
