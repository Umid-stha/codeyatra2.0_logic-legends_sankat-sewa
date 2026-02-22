import { LocationProvider } from '@/context/LocationContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <LocationProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </LocationProvider>
  );
}