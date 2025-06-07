import RadioChannelProvider from "@/ctx/RadioCtx";
import "./global.css";
import { Stack } from "expo-router";
import TimerContextProvider from "@/ctx/TimerCtx";

export default function RootLayout() {
  return (
    <RadioChannelProvider>
      <TimerContextProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="channel/[channelName]"
            options={{ headerShown: false }}
          />
        </Stack>
      </TimerContextProvider>
    </RadioChannelProvider>
  );
}
