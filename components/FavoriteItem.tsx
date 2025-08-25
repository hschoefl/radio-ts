import { Image } from "expo-image";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { useAudioPlayer } from "expo-audio";

import { ChannelActionKind, useRadioChannel } from "@/ctx/RadioCtx";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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
      {/* <View
        className={`items-center p-2 rounded-2xl h-44 relative ${
          active ? "border-2 border-green-600 border-solid" : ""
        } `}
      > */}

      <View className={`items-center p-2 rounded-2xl h-32 relative `}>
        <Image
          source={logo}
          contentFit="cover"
          style={{
            width: 96,
            height: 96,
            borderRadius: 8,
          }}
        />
        <Text className="text-sm w-24 text-center mt-1" numberOfLines={2}>
          {name}
        </Text>
        {active && (
          <View className="bg-black top-2 left-2 opacity-60 h-full w-full absolute rounded-xl">
            <View className="absolute bottom-1 right-1 opacity-100 rounded-full justify-center items-center w-24 h-24">
              <FontAwesome6 name="play" size={48} color="yellow" />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default FavoriteItem;
