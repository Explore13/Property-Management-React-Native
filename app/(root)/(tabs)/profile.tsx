import { useUserStore } from "@/store/userStore";
import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { signOut } = useAuth();
  const router = useRouter();

  const isAdmin = useUserStore((state) => state.isAdmin);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
    } catch (error) {
      console.error("Error signing out: ", error);
      Alert.alert("Sign out failed", "Something went wrong. Please try again.");
    }
  };
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Text>Admin Status: {isAdmin ? "Admin" : "User"}</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
