import { Image } from "expo-image";
import { View, Text, TouchableOpacity, Alert } from "react-native";

import { useAudioPlayer } from "expo-audio";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRadioChannel, ChannelActionKind } from "@/ctx/RadioCtx";

interface FavoriteItemProps {
  logo: string;
  name: string;
  audioUrl: string;
}

const FavoriteItem = ({ logo, name, audioUrl }: FavoriteItemProps) => {
  const { state, dispatch } = useRadioChannel();

  // console.log(audioUrl);
  const player = useAudioPlayer();

  const active: boolean = name === state.nowPlaying;

  function handlePlay() {
    if (!active) {
      dispatch({
        type: ChannelActionKind.START_PLAYING,
        payload: { name, audioUrl },
      });
      // startPlaying(name, audioUrl);
    } else {
      dispatch({
        type: ChannelActionKind.STOP_PLAYING,
      });
      // stopPlaying();
    }
  }

  function handleLongPress() {
    Alert.alert(
      "Favorit entfernen",
      `Soll "${name}" wirklich aus der Favoritenliste entfernt werden?`,
      [
        {
          text: "Abbrechen",
          onPress: () => console.log("Abbrechen"),
          style: "cancel",
        },
        {
          text: "Entfernen",
          onPress: () =>
            dispatch({
              type: ChannelActionKind.DEL_FROM_FAVORITES,
              payload: name,
            }),
          style: "destructive",
        },
      ]
    );
  }

  return (
    <TouchableOpacity onPress={handlePlay} onLongPress={handleLongPress}>
      {/* <View className="items-center p-2 relative border-2 border-green-600 border-solid rounded-2xl h-40"> */}
      <View
        className={`items-center p-2 rounded-2xl h-44 relative ${
          active ? "border-2 border-green-600 border-solid" : ""
        } `}
      >
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
          <View className="bg-white absolute bottom-1 right-1 opacity-65 rounded-full justify-center items-center w-9 h-9">
            <FontAwesome6 name="play" size={30} color="green" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default FavoriteItem;
