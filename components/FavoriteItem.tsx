import { Image } from "expo-image";
import { View, Text, TouchableOpacity } from "react-native";

import { useAudioPlayer } from "expo-audio";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRadioChannel } from "@/ctx/RadioCtx";

interface FavoriteItemProps {
  logo: string;
  name: string;
  audioUrl: string;
}

const FavoriteItem = ({ logo, name, audioUrl }: FavoriteItemProps) => {
  const { nowPlaying, startPlaying, stopPlaying } = useRadioChannel();

  // console.log(audioUrl);
  const player = useAudioPlayer();

  const active: boolean = name === nowPlaying;

  function handlePlay() {
    if (!active) {
      startPlaying(name, audioUrl);
    } else {
      stopPlaying();
    }
  }

  return (
    <TouchableOpacity className="" onPress={handlePlay}>
      <View className="items-center p-2 relative">
        <Image
          source={logo}
          contentFit="cover"
          style={{
            width: 96,
            height: 96,
            borderRadius: 8,
          }}
        />
        <Text className="text-sm w-24 text-center" numberOfLines={2}>
          {name}
        </Text>
        {active && (
          <View className="bg-white absolute top-0 right-0 rounded-full opacity-65">
            <FontAwesome6 name="play-circle" size={32} color="black" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default FavoriteItem;
