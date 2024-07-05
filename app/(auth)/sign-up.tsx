import * as React from "react";

import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
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
            onPress={onSignUpPress}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
      {pendingVerification && (
        <>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
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
            onPress={onPressVerify}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Verify Email
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
