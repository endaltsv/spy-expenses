import ExpenseCard from '@/components/Home/ExpenseCard';
import MonthCategoryCard from '@/components/Home/MonthCategoryCard';
import MonthCategoryText from '@/components/Home/MonthCategoryText';
import RecentExpenseText from '@/components/Home/RecentExpenseText';
import MonthCategory from '@/components/Home/sections/MonthCategory';
import RecentExpense from '@/components/Home/sections/RecentExpense';
import SpentToday from '@/components/Home/sections/SpentToday';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  const totalExpenses = 40567.8;

  return (
    <ParallaxScrollView>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <SpentToday amount={totalExpenses} />
          <RecentExpense />
        </View>
        <View style={styles.monthContainer}>
          <MonthCategory />
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingBottom: 20, // Отступ внизу, чтобы последний элемент не перекрывался
  },
  mainContainer: {
    paddingHorizontal: '5%',
  },
  monthContainer: {},
});
