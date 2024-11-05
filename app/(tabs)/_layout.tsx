import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { useTheme } from 'styled-components/native';
import AddExpenseModal from '@/components/modals/AddExpenseModal';
import TabBarSVG from '@/assets/tab-bar.svg';

export default function TabLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TabBarSVG style={styles.tabBarSvg} />

      <TouchableOpacity
        style={styles.homeButtonArea}
        onPress={() => router.push('/')}
      />
      <TouchableOpacity
        style={styles.exploreButtonArea}
        onPress={() => router.push('/explore')}
      />
      <TouchableOpacity style={styles.addButtonArea} onPress={toggleModal} />

      <AddExpenseModal visible={modalVisible} toggleModal={toggleModal} />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: [
            styles.tabBar,
            { backgroundColor: theme.colors.background },
          ],
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Главная',
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Анализ',
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  tabBarSvg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 'auto',
    zIndex: 1,
  },
  homeButtonArea: {
    position: 'absolute',
    bottom: 20,
    left: '15%',
    width: 60,
    height: 60,
    zIndex: 3,
  },
  exploreButtonArea: {
    position: 'absolute',
    bottom: 20,
    right: '15%',
    width: 60,
    height: 60,
    zIndex: 3,
  },
  addButtonArea: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -40 }],
    width: 80,
    height: '20%',
    zIndex: 3,
  },
  tabBar: {
    position: 'absolute',
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0,
    elevation: 10,
    overflow: 'hidden',
  },
});
