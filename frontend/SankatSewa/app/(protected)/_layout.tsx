import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedLayout() {
  const { auth } = useAuth();

  if (!auth.accessToken) {
    return <Redirect href="/login" />;
  }

  return (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
  )
}