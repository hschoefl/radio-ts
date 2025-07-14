import TimerButton from "@/components/TimerButton";
import { useTimer } from "@/ctx/TimerCtx";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TIMER_VALUES = [
  {
    label: "1 Minute",
    value: 1,
  },
  {
    label: "5 Minuten",
    value: 5,
  },
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
  const { setTimer, stopTimer } = useTimer();

  function handleTimerPress(value: number): void {
    // console.log(`${value} wurde ausgewählt`);
    setTimer(value);
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

        <TouchableOpacity
          onPress={() => stopTimer()}
          className="bg-blue-500 mt-4 py-2 px-2 rounded-lg"
        >
          <Text className="text-center text-xl">Sleep Timer löschen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Timer;
