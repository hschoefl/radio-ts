import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import { RadioChannel } from "@/interfaces/radioInterfaces";
import { Link, RelativePathString, useRouter } from "expo-router";
import Genres from "./Genres";

interface SearchItemProps {
  channel: RadioChannel;
}

const SearchItem = ({ channel }: SearchItemProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.navigate({
          pathname: `/channel/${channel.name}` as RelativePathString,
          params: {
            name: channel.name,
          },
        })
      }
    >
      <View className="flex-row bg-white h-24 mt-2 items-center p-2 rounded-lg">
        <View className="h-22 w-22">
          <Image
            source={channel.logo}
            contentFit="cover"
            style={{
              width: 64,
              height: 64,
              borderRadius: 8,
            }}
          />
        </View>
        <View className="flex-1 p-2">
          <Text className="text-black font-bold" numberOfLines={1}>
            {channel.name}
          </Text>
          <Text className="text-black text-sm" numberOfLines={3}>
            {channel.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default SearchItem;
