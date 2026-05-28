import { useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResetPassword() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [codeSent, setCodeSent] = React.useState(false);

  const isLoading = fetchStatus === "fetching";

  // Step 1: Send the password reset code to the user's email
  async function sendCode() {
    const { error: createError } = await signIn.create({
      identifier: emailAddress,
    });
    if (createError) {
      console.error(JSON.stringify(createError, null, 2));
      return;
    }

    const { error: sendCodeError } =
      await signIn.resetPasswordEmailCode.sendCode();
    if (sendCodeError) {
      console.error(JSON.stringify(sendCodeError, null, 2));
      return;
    }

    setCodeSent(true);
  }

  // Step 2: Verify the code provided by the user
  async function verifyCode() {
    const { error } = await signIn.resetPasswordEmailCode.verifyCode({
      code,
    });
    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }
  }

  // Step 3: Submit the new password
  async function submitNewPassword() {
    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password,
      // Optional: sign the user out of all other authenticated sessions
      signOutOfOtherSessions: true,
    });
    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    // Reset the sign-in attempt and navigate to sign-in page
    signIn.reset();
    router.replace("/sign-in");
  }
  // Step 3 UI: Collect the new password from the user
  if (signIn.status === "needs_new_password") {
    return (
      <View className="flex-1 justify-center px-6 py-12">
        <Image
          source={require("../../assets/images/logo.png")}
          resizeMode="contain"
          className="w-20 h-20 mb-4"
        />
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Reset password
        </Text>
        <Text className="text-gray-500 mb-8">Enter your new password</Text>

        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6"
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        {errors.fields.password && (
          <Text className="text-red-500 mb-4">
            {errors.fields.password.message}
          </Text>
        )}

        <TouchableOpacity
          onPress={submitNewPassword}
          disabled={isLoading}
          className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4"
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">
              Set new password
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  // Step 2 UI: Collect the code provided by the user
  if (codeSent) {
    return (
      <View className="flex-1 justify-center px-6 py-12">
        <Image
          source={require("../../assets/images/logo.png")}
          resizeMode="contain"
          className="w-20 h-20 mb-4"
        />
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Verify Code
        </Text>
        <Text className="text-gray-500 mb-8">
          Enter the password reset code sent to your email
        </Text>

        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
          placeholder="Enter verification code"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
        />
        {errors.fields.code && (
          <Text className="text-red-500 mb-4">
            {errors.fields.code.message}
          </Text>
        )}

        <TouchableOpacity
          onPress={verifyCode}
          disabled={isLoading}
          className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4"
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">Verify</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-between w-full">
          <TouchableOpacity
            onPress={() => signIn.resetPasswordEmailCode.sendCode()}
            disabled={isLoading}
            className="py-2"
          >
            <Text className="text-blue-600">Resend code</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCode("");
              setCodeSent(false);
              signIn.reset();
            }}
            className="py-2"
          >
            <Text className="text-blue-600">Start over</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Step 1 UI: Collect the user's email so you can send them a password reset code
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center px-6 py-12">
        <Image
          source={require("../../assets/images/logo.png")}
          resizeMode="contain"
          className="w-20 h-20 mb-4"
        />
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Forgot Password?
        </Text>
        <Text className="text-gray-500 mb-8">Reset your password</Text>

        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
          placeholder="Email address"
          placeholderTextColor="#9CA3AF"
          value={emailAddress}
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.fields.identifier && (
          <Text className="text-red-500 mb-4">
            {errors.fields.identifier.message}
          </Text>
        )}

        <TouchableOpacity
          onPress={sendCode}
          disabled={isLoading}
          className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4"
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">
              Send password reset code
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-gray-500">Remember your password?</Text>
          <Link href="/sign-in">
            <Text className="text-blue-600 font-semibold">Sign in</Text>
          </Link>
        </View>

        <View nativeID="clerk-captcha" />
      </View>
    </ScrollView>
  );
}
