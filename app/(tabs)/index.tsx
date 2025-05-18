import { View, Text, FlatList } from "react-native";
import React from "react";

import { useRadioChannel } from "@/ctx/RadioCtx";
import { SafeAreaView } from "react-native-safe-area-context";
import FavoriteItem from "@/components/FavoriteItem";

const Favorites = () => {
  const { favorites, nowPlaying, isPlaying } = useRadioChannel();

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
        Meine Favoriten
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
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 42,
          }}
          className="p-5"
        />
      </View>
      <View className="bg-blue-200 h-1/6 m-4 rounded-2xl justify-center items-center">
        <Text>Hier kommt der Player</Text>
      </View>
    </SafeAreaView>
  );
};

export default Favorites;
