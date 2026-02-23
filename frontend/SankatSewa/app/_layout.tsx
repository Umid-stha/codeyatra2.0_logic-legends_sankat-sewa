import { LocationProvider } from '@/context/LocationContext';
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack, Redirect, Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <LocationProvider>
        <Stack>
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </LocationProvider>
    </AuthProvider>
  );
}
