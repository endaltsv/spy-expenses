// src/hooks/useLoadFonts.ts
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

export default function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    'SFPro-Bold': require('../assets/fonts/SFPro-Bold.otf'),
    'SFPro-Regular': require('../assets/fonts/SFPro-Regular.otf'),
    'SFPro-Medium': require('../assets/fonts/SFPro-Medium.otf'),
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded) {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  return isReady;
}
