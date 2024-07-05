import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link, useRouter } from "expo-router";

import React from "react";
import { useSignIn } from "@clerk/clerk-expo";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={{
          width: "80%",
          paddingHorizontal: 10,
          paddingVertical: 5,
          margin: 10,
          borderWidth: 1,
          borderColor: "#000",
        }}
      />
      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={{
          width: "80%",
          paddingHorizontal: 10,
          paddingVertical: 5,
          margin: 10,
          borderWidth: 1,
          borderColor: "#000",
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#000",
          padding: 10,
          margin: 10,
          width: "80%",
        }}
        onPress={onSignInPress}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Sign in</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
