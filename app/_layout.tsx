import RadioChannelProvider from "@/ctx/RadioCtx";
import TimerContextProvider from "@/ctx/TimerCtx";
import { Stack } from "expo-router";
import "./global.css";

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
