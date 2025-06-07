import SearchItem from "@/components/SearchItem";
import { RadioChannel } from "@/interfaces/radioInterfaces";
import { useEffect, useState } from "react";
import { ActivityIndicator, TextInput, FlatList } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { ChannelActionKind } from "@/ctx/RadioCtx";

import { useRadioChannel } from "@/ctx/RadioCtx";

const A1_RADIO_URL = process.env.EXPO_PUBLIC_A1_URL!;

const Search = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [channels, setChannels] = useState<RadioChannel[]>([]);

  const [search, setSearch] = useState<string>("");

  const { state, dispatch } = useRadioChannel();

  useEffect(() => {
    async function fetchRadioChannels() {
      try {
        setLoading(true);
        const response = await fetch(A1_RADIO_URL);
        const data = await response.json();
        // console.log(data);

        // setChannels(data);
        // setRadioChannels(data);

        dispatch({ type: ChannelActionKind.SET_CHANNELS, payload: data });
      } catch (err) {
        setLoading(false);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRadioChannels();
  }, []);

  if (loading && !state.channels) {
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
        data={state.channels.filter((item) =>
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
