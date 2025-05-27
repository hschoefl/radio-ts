import { View, Text, TouchableOpacity } from "react-native";

interface TimerButtonProps {
  label: string;
  value: number;
  onPress: (value: number) => void;
}

const TimerButton = ({ label, value, onPress }: TimerButtonProps) => {
  return (
    <TouchableOpacity
      className="justify-center items-center rounded-xl py-3 px-2 bg-red-500 w-1/3"
      onPress={() => onPress(value)}
    >
      <Text className="text-2xl">{label}</Text>
    </TouchableOpacity>
  );
};
export default TimerButton;
