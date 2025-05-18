import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Button, TouchableOpacity } from "react-native";

import { useRadioChannel } from "@/ctx/RadioCtx";
import { useEffect, useState } from "react";
import { RadioChannel } from "@/interfaces/radioInterfaces";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ChannelDetails = () => {
  const [foundChannel, setFoundChannel] = useState<
    RadioChannel | null | undefined
  >(null);
  const { channels, addRadioChannelToFavorites, maxFavorites, favorites } =
    useRadioChannel();

  const { name } = useLocalSearchParams();

  const router = useRouter();

  const foundElement = channels?.find((item) => item.name === name);

  const alreadyFavorite = favorites?.find((item) => item.name === name);

  useEffect(() => {
    setFoundChannel(foundElement);
  }, [foundElement]);

  return (
    <SafeAreaView className="flex-1 p-2 items-center relative">
      <Text className="text-3xl font-bold my-2 text-center mt-12">
        {foundChannel?.name}
      </Text>
      <View className="relative">
        <Image
          source={foundChannel?.logo}
          contentFit="cover"
          style={{
            width: 196,
            height: 196,
            borderRadius: 8,
          }}
        />
        {alreadyFavorite && (
          <FontAwesome
            name="heart"
            size={24}
            color="red"
            className="absolute right-2 top-2"
          />
        )}
      </View>

      <Text className="text-xl mt-2">{foundChannel?.description}</Text>

      <View className="flex-row">
        <TouchableOpacity
          className="bg-blue-700 px-3 py-2 w-2/3 mt-4"
          onPress={() => addRadioChannelToFavorites(foundChannel!)}
          disabled={alreadyFavorite ? true : false}
        >
          {!alreadyFavorite ? (
            <Text className="text-white font-semibold text-xl text-center">
              Zu Favoriten hinzufügen
            </Text>
          ) : (
            <Text className="text-gray-500 font-semibold text-xl text-center">
              Ist bereits bei den Favoriten
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="absolute top-16 left-3"
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back-circle-outline" size={48} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default ChannelDetails;
