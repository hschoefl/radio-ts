import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useRadioChannel } from "@/ctx/RadioCtx";
import { SafeAreaView } from "react-native-safe-area-context";
import FavoriteItem from "@/components/FavoriteItem";
import { useTimer } from "@/ctx/TimerCtx";

const Favorites = () => {
  const [timerText, setTimerText] = useState<string>("");

  const { favorites, nowPlaying, isPlaying } = useRadioChannel();
  const { timerValue, currentTimerValue } = useTimer();

  // useEffect(() => {
  //   if (timerValue === 0) return;

  //   const intervalId = setInterval(() => {

  //   }, 1000 * 60);
  // }, [timerValue]);

  if (favorites.length === 0 || !favorites) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-center font-bold text-2xl">
          Momentan sind keine Favoriten definiert.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-between">
      <Text className="text-center font-bold text-2xl mt-3">
        Meine Favoriten ({favorites.length})
      </Text>
      <View className="h-4/6 bg-white m-3 rounded-2xl">
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <FavoriteItem
              logo={item.logo}
              audioUrl={item.audioUrl}
              name={item.name}
            />
          )}
          keyExtractor={(item) => item.name}
          numColumns={3}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: "space-around",
            padding: 12,
          }}
        />
      </View>
      <View className="bg-white h-1/6 m-4 rounded-2xl justify-center items-center relative">
        <Text className="text-center text-lg mb-1">Sie hören gerade</Text>
        <Text className="text-center text-2xl font-semibold">{nowPlaying}</Text>
        <Ionicons
          name="timer-outline"
          size={32}
          color="green"
          className="absolute top-1 right-1"
        />
      </View>
    </SafeAreaView>
  );
};

export default Favorites;
