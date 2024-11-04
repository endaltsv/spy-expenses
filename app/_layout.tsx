import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ExpensesProvider } from '@/context/ExpensesContext';
import { CategoriesProvider } from '@/context/CategoriesContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { MainTheme } from '../themes';
SplashScreen.preventAutoHideAsync();
import { ThemeProvider } from 'styled-components/native';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'SFPro-Bold': require('../assets/fonts/SFPro-Bold.otf'),
    'SFPro-Regular': require('../assets/fonts/SFPro-Regular.otf'),
    'SFPro-Medium': require('../assets/fonts/SFPro-Medium.otf'),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={MainTheme}>
      <SettingsProvider>
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
      </SettingsProvider>
    </ThemeProvider>
  );
}
