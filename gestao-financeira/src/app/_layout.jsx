import { router, Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { colors } from "../constants/colors";
import { AuthProvider, useAuth } from "../contexts/AuthState";
import GlobalState from "../contexts/GlobalState";

function AppNavigator() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const isLoginRoute = segments[0] === "login";

    if (!isAuthenticated && !isLoginRoute) {
      router.replace("/login");
    }

    if (isAuthenticated && isLoginRoute) {
      router.replace("/");
    }
  }, [isAuthenticated, segments]);

  return (
    <GlobalState>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GlobalState>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
