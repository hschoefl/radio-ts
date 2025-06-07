import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTimer } from "@/ctx/TimerCtx";

interface TimerButtonProps {
  label: string;
  value: number;
  onPress: (value: number) => void;
}

const TimerButton = ({ label, value, onPress }: TimerButtonProps) => {
  const { timerValue } = useTimer();
  const active: boolean = value === timerValue;

  return (
    <TouchableOpacity
      className="justify-center items-center rounded-xl py-3 px-2 bg-red-500 w-1/3"
      onPress={() => onPress(value)}
    >
      <Text className="text-2xl">{label}</Text>
      {active && (
        <Ionicons
          name="timer-outline"
          size={32}
          color="green"
          className="absolute -top-3 -right-3"
        />
      )}
    </TouchableOpacity>
  );
};
export default TimerButton;
