import { Stack } from "expo-router";

export default function ProtectedRoutesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
