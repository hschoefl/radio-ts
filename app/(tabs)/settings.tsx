import { View, Text, Button, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRadioChannel, ChannelActionKind } from "@/ctx/RadioCtx";

const Settings = () => {
  const { dispatch } = useRadioChannel();

  return (
    <SafeAreaView className="flex-1 p-4">
      <Text className="font-bold text-3xl">Einstellungen</Text>

      <View className="flex-row justify-between items-center px-4 py-2 bg-red-300 mt-4">
        <Text className="text-xl">Favoriten löschen</Text>
        <Button
          title="Löschen"
          onPress={() => dispatch({ type: ChannelActionKind.CLEAR_FAVORITES })}
        />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
