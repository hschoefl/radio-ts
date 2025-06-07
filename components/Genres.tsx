import { View, Text } from "react-native";

interface GenresProps {
  genres?: string[];
}

const Genres = ({ genres }: GenresProps) => {
  if (!genres) return <Text>Keinen Genres zugeordnet</Text>;

  return (
    <View className="mt-2 flex-row flex-wrap gap-2 justify-center">
      {genres.map((item, index) => (
        <Text
          key={index}
          className="text-center bg-yellow-500 px-2 py-1 rounded-xl text-sm"
        >
          {item}
        </Text>
      ))}
    </View>
  );
};
export default Genres;
