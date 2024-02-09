import { useCallback, useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

export default function RootLayout() {
  const [hasLoadedFonts] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  const hideSplashScreen = useCallback(async () => {
    if (hasLoadedFonts) {
      await SplashScreen.hideAsync()
    }
  }, [hasLoadedFonts])

  useEffect(() => {
    hideSplashScreen()
  }, [hideSplashScreen])

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </SafeAreaView>
  )
}
