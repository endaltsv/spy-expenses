import { useCategoriesContext } from '@/context/CategoriesContext';
import { Expense as ExpenseModel } from '@/models/Expense';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'styled-components/native';

interface Props {
  backgroundColor?: boolean;
  paddingHorizontal?: number;
  dateVisible?: boolean;
  expense: ExpenseModel;
}

export default function ExpenseCard({
  expense,
  dateVisible,
  backgroundColor,
  paddingHorizontal,
}: Props) {
  console.log('ExpenseCard render.');
  const theme = useTheme();

  const { findCategoryById } = useCategoriesContext();
  const category = findCategoryById(expense.categoryId);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: backgroundColor
              ? theme.colors.secondary
              : theme.colors.background,
            paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.iconBackground,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            {category?.icon && (
              <MaterialCommunityIcons name={category.icon} size={20} />
            )}
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.expenseName, { color: theme.colors.text }]}>
            {expense.name}
          </Text>
          {dateVisible ? (
            <Text style={[styles.expenseDate]}>{expense.dateTime}</Text>
          ) : null}
        </View>
        <View>
          <Text style={[styles.expenseAmount, { color: theme.colors.text }]}>
            - ₽{expense.amount}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 4,
  },
  deleteBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 14,
    backgroundColor: '#ffdddd',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
  },
  deleteButtonText: {
    fontSize: 24,
    color: '#ff4d4d',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 72,
    borderRadius: 14,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconBackground: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  expenseName: {
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    lineHeight: 20,
  },
  expenseDate: {
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: '#6f6f6f',
  },
  expenseAmount: {
    fontFamily: 'SFPro-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#000',
  },
});
