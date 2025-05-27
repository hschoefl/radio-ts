import TimerButton from "@/components/TimerButton";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TIMER_VALUES = [
  {
    label: "15 Minuten",
    value: 15,
  },
  {
    label: "30 Minuten",
    value: 30,
  },
  {
    label: "45 Minuten",
    value: 45,
  },
  {
    label: "1 Stunde",
    value: 60,
  },
  {
    label: "1.5 Stunden",
    value: 90,
  },
  {
    label: "2 Stunden",
    value: 120,
  },
];

const Timer = () => {
  function handleTimerPress(value: string): void {
    console.log(`${value} wurde ausgewählt`);
  }

  return (
    <SafeAreaView className="m-3 ">
      <View className="justify-center items-center">
        <Text className="text-3xl font-bold">Sleep Timer</Text>
        <View className="flex-row flex-wrap gap-7 justify-center mt-4">
          {TIMER_VALUES.map((timer) => (
            <TimerButton
              label={timer.label}
              value={timer.value}
              key={timer.value}
              onPress={handleTimerPress}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Timer;
