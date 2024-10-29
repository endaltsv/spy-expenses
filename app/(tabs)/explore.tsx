import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

export default function CalendarScreen() {
  const navigation = useNavigation();

  const handleDayPress = (day) => {
    navigation.navigate('index', { selectedDate: day.dateString });
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [new Date().toISOString().split('T')[0]]: { selected: true, marked: true },
          }}
          theme={{
            backgroundColor: '#121212',             // Общий фон
            calendarBackground: '#1e1e1e',          // Фон календаря
            textSectionTitleColor: '#b6c1cd',       // Заголовки дней недели
            selectedDayBackgroundColor: '#7258db',  // Фон выбранного дня
            selectedDayTextColor: '#ffffff',        // Текст выбранного дня
            todayBackgroundColor: '#333333',        // Фон для сегодняшнего дня
            todayTextColor: '#ffffff',              // Цвет текста сегодняшнего дня
            dayTextColor: '#e6e6e6',                // Текст обычных дней
            textDisabledColor: '#666666',           // Отключенные дни
            arrowColor: '#ffffff',                  // Цвет стрелок
            monthTextColor: '#ffffff',              // Текст месяца
            indicatorColor: '#ffffff',              // Цвет маркера (точек)
            textDayFontFamily: 'Helvetica',
            textMonthFontFamily: 'Helvetica',
            textDayHeaderFontFamily: 'Helvetica',
            textDayFontSize: 16,
            textMonthFontSize: 22,
            textDayHeaderFontSize: 16,
          }}
          style={styles.calendar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Основной тёмный фон экрана
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    width: '90%',
    maxWidth: 400,
  },
  calendar: {
    
    borderRadius: 10,
    backgroundColor: '#1e1e1e', // Дополнительный тёмный фон для календаря
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
