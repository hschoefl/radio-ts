import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

// import * as SecureStore from "expo-secure-store";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { RadioChannel } from "@/interfaces/radioInterfaces";
import { Alert } from "react-native";

interface ContextInterface {
  favorites: RadioChannel[];
  nowPlaying: string;
  isPlaying: boolean;
  channels: RadioChannel[];
  setRadioChannels: (allChannels: RadioChannel[]) => void;
  addRadioChannelToFavorites: (channel: RadioChannel) => void;
  clearFavorites: () => void;
  maxFavorites: number;
}

const RadioChannelContext = createContext<ContextInterface>(
  {} as ContextInterface
);

export function RadioChannelProvider({ children }: PropsWithChildren) {
  const [channels, setChannels] = useState<RadioChannel[]>([]);
  const [favorites, setFavorites] = useState<RadioChannel[]>([]);
  const [nowPlaying, setNowPlaying] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [numFavorites, setNumFavorites] = useState<number>(0);
  const [maxFavorites, setMaxFavorites] = useState<number>(0);

  // load favorites from localStorage
  useEffect(() => {
    async function loadFavorites() {
      const result = await AsyncStorage.getItem("favorites");
      if (result) {
        setFavorites(JSON.parse(result));
        setMaxFavorites(result.length + 1);
      }
    }

    loadFavorites();
  }, []);

  // if favorites are changig -> save to localStorage
  useEffect(() => {
    async function saveFavorites() {
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    }
    saveFavorites();
  }, [favorites]);

  function setRadioChannels(channels: RadioChannel[]) {
    // console.log("Hier bin ich im CTX:", channels);
    setChannels(channels);
  }

  async function addRadioChannelToFavorites(
    channel: RadioChannel
  ): Promise<void> {
    const found = favorites.find((item) => item.name === channel.name);

    if (found) {
      Alert.alert("Bereits in Favoriten enthalten");
      return;
    }
    // einen neuen Favorit hinzufügen
    setFavorites([
      ...favorites,
      {
        name: channel.name,
        genre: channel.genre,
        logo: channel.logo,
        description: channel.description,
        audioUrl: channel.audioUrl,
      },
    ]);
    setNumFavorites(favorites.length + 1);
  }

  async function clearFavorites(): Promise<void> {
    // AsyncStorage löschen
    AsyncStorage.removeItem("favorites");

    // Favoriten auf leeres Array setzen
    setFavorites([]);
  }

  return (
    <RadioChannelContext.Provider
      value={{
        setRadioChannels,
        addRadioChannelToFavorites,
        favorites,
        nowPlaying,
        isPlaying,
        channels,
        maxFavorites,
        clearFavorites,
      }}
    >
      {children}
    </RadioChannelContext.Provider>
  );
}

export function useRadioChannel() {
  const context = useContext(RadioChannelContext);

  if (context === undefined) {
    throw new Error(
      "useRadioChannel must be used within a RadioChannelProvider"
    );
  }

  return context;
}

export default RadioChannelProvider;

// TODO: define custom context hook
