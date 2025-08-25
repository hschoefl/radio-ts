import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import FavoriteItem from "@/components/FavoriteItem";
import { useRadioChannel } from "@/ctx/RadioCtx";
import { useTimer } from "@/ctx/TimerCtx";
import { SafeAreaView } from "react-native-safe-area-context";

const Favorites = () => {
  const [timerText, setTimerText] = useState<string>("");

  const { state, dispatch } = useRadioChannel();
  const { timerValue, currentTimerValue } = useTimer();

  const active: boolean = timerValue != 0;

  if (state.favorites.length === 0 || !state.favorites) {
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
        Meine Favoriten ({state.favorites.length})
      </Text>
      <View className="h-4/6 bg-white m-2 rounded-2xl">
        <FlatList
          data={state.favorites}
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
            padding: 16,
          }}
        />
      </View>
      <View className="bg-white h-1/6 m-4 rounded-2xl justify-center items-center relative">
        <Text className="text-center text-lg mb-1">Sie hören gerade</Text>
        <Text className="text-center text-2xl font-semibold">
          {state.nowPlaying}
        </Text>
        {timerValue !== 0 ? (
          <View className="mt-2 flex-row items-center">
            <Ionicons
              name="timer-outline"
              size={24}
              color="green"
              className=""
            />
            <Text className="text-xl ml-1">{currentTimerValue}</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Favorites;
