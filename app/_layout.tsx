import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ExpensesProvider } from '@/context/ExpensesContext';
import { CategoriesProvider } from '@/context/CategoriesContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { ThemeProvider } from 'styled-components/native';
import useLoadFonts from '@/hooks/useLoadFonts';
import { MainTheme } from '../themes';

export default function RootLayout() {
  console.log('RootLayout render.');
  const isReady = useLoadFonts();

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider theme={MainTheme}>
      <CategoriesProvider>
        <ExpensesProvider>
          <GestureHandlerRootView>
            <Stack>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </GestureHandlerRootView>
        </ExpensesProvider>
      </CategoriesProvider>
    </ThemeProvider>
  );
}
