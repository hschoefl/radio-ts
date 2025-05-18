import RadioChannelProvider from "@/ctx/RadioCtx";
import "./global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <RadioChannelProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="channel/[channelName]"
          options={{ headerShown: false }}
        />
      </Stack>
    </RadioChannelProvider>
  );
}
