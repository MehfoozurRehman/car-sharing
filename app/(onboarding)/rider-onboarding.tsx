import { Text, View } from "react-native";

import { Link } from "expo-router";
import React from "react";

export default function Rider() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Rider</Text>
      <Link
        href="/driver-onboarding"
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: 10,
          margin: 10,
          textAlign: "center",
          width: "80%",
        }}
      >
        Back
      </Link>
      <Link
        href="/sign-in"
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: 10,
          margin: 10,
          textAlign: "center",
          width: "80%",
        }}
      >
        Next
      </Link>
    </View>
  );
}
