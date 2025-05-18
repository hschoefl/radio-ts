import SearchItem from "@/components/SearchItem";
import { RadioChannel } from "@/interfaces/radioInterfaces";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  FlatList,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useRadioChannel } from "@/ctx/RadioCtx";

const A1_RADIO_URL = "https://sdsevocdn.xploretv.at/metadata/radio/endava.json";

const Search = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [channels, setChannels] = useState<RadioChannel[]>([]);

  const [search, setSearch] = useState<string>("");

  const { setRadioChannels, channels } = useRadioChannel();

  useEffect(() => {
    async function fetchRadioChannels() {
      try {
        setLoading(true);
        const response = await fetch(A1_RADIO_URL);
        const data = await response.json();
        // console.log(data);

        // setChannels(data);
        setRadioChannels(data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRadioChannels();
  }, []);

  // let filteredChannels: RadioChannel[] = channels;
  // useEffect(() => {
  //   filteredChannels = channels.filter((item) =>
  //     item.name.toLowerCase().startsWith(search.toLowerCase())
  //   );
  // }, [search]);

  if (loading && !channels) {
    return <ActivityIndicator size="large" className="flex-1 justify-center" />;
  }

  return (
    <SafeAreaView className="flex-1 p-3 mx-3">
      <TextInput
        className="py-2 px-3 bg-slate-300 border text-xl rounded-lg"
        placeholder="Radiokanal suchen..."
        onChangeText={(text) => setSearch(text)}
        value={search}
        autoComplete="off"
        autoCorrect={false}
      />
      <FlatList
        data={channels.filter((item) =>
          item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )}
        renderItem={({ item }) => <SearchItem channel={item} />}
        keyExtractor={(item) => item.name}
        className="mt-2 bg-gray-100"
      />
    </SafeAreaView>
  );
};

export default Search;
