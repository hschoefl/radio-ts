import { Image } from "expo-image";
import { View, Text } from "react-native";

interface FavoriteItemProps {
  logo: string;
  name: string;
  audioUrl: string;
}

const FavoriteItem = ({ logo, name, audioUrl }: FavoriteItemProps) => {
  return (
    <View className="items-center">
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
    </View>
  );
};
export default FavoriteItem;
