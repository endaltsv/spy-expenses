import MonthCategory from '@/components/Home/sections/MonthCategory';
import RecentExpense from '@/components/Home/sections/RecentExpense';
import SpentToday from '@/components/Home/sections/SpentToday';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useSettingsContext } from '@/context/SettingsContext';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';

export default function HomeScreen() {
  const { settings } = useSettingsContext();
  const theme = useTheme();
  console.log('theme:', theme);
  console.log('User settings:', settings);
  console.log('HomeScreen(index) render.');

  return (
    <ParallaxScrollView>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.mainContainer}>
          <SpentToday />
          <RecentExpense />
          <MonthCategory />
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    paddingBottom: '30%',
  },

  mainContainer: {
    paddingHorizontal: '5%',
  },
  monthContainer: {
    paddingHorizontal: '5%',
  },
});
