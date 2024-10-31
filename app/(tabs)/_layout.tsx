import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AddButton } from '@/components/AddButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// todo: Добавить стилизацию для TabBar
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: '#A0A0A0', // Цвет неактивных иконок
        tabBarShowLabel: true,
        headerShown: true,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel, // Добавляем стиль для надписи
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Центральная кнопка */}
      <Tabs.Screen
        name="add"
        options={{
          tabBarButton: () => <AddButton />, // Центральная кнопка добавления
          tabBarLabel: () => null, // Отключаем метку для центральной кнопки
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Анализ',
          tabBarLabel: ({ color }) => <Text style={{ color }}>Анализ</Text>,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-bar" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 80, // Уменьшенная высота TabBar
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#ededed',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: -1, // Подтягиваем текст ближе к иконке
  },
});
