import { View, Text, StyleSheet } from 'react-native';

export default function RecentExpenseText() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Недавние траты</Text>
      <Text style={styles.viewAll}>СМ ВСЕ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'SFPro-Bold', // Применяем шрифт SF Pro Bold
    lineHeight: 24,
    color: '#000',
  },
  viewAll: {
    color: '#6f6f6f', // серый цвет для текста "СМ ВСЕ"
    fontFamily: 'SFPro-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
});
