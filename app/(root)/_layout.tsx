import { useUserSync } from "@/hooks/useUserSync";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // sync clerk user -> Supabase
  useUserSync();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/sign-in" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
