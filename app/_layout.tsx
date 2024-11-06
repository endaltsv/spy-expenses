import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ExpensesProvider } from '@/context/ExpensesContext';
import { CategoriesProvider } from '@/context/CategoriesContext';
import { ThemeProvider } from 'styled-components/native';
import useLoadFonts from '@/hooks/useLoadFonts';
import { MainTheme } from '../themes';
import { StatisticsProvider } from '@/context/StatisticsContext';

export default function RootLayout() {
  const isReady = useLoadFonts();

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider theme={MainTheme}>
      <ExpensesProvider>
        <CategoriesProvider>
          <StatisticsProvider>
            <GestureHandlerRootView>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </GestureHandlerRootView>
          </StatisticsProvider>
        </CategoriesProvider>
      </ExpensesProvider>
    </ThemeProvider>
  );
}
