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

import { useAudioPlayer } from "expo-audio";

interface ContextInterface {
  favorites: RadioChannel[]; // array der Favoriten, lokal gespeichert
  nowPlaying: string; // name des gerade gespielten Senders
  isPlaying: boolean; // Player spielt gerade
  channels: RadioChannel[]; // alle verfügbaren Radiokanäle, von A1 URL
  setRadioChannels: (allChannels: RadioChannel[]) => void; // alle Kanäle in State setzen
  addRadioChannelToFavorites: (channel: RadioChannel) => void; // einen Kanal zur Favoritenliste hinzufügen
  clearFavorites: () => void; // Favoritenliste löschen
  maxFavorites: number; // maximale Anzahl der Favoriten (9)
  setCurrentPlaying: (channelName: string) => void;
  startPlaying: (name: string, audioUrl: string) => void;
  stopPlaying: () => void;
}

const RadioChannelContext = createContext<ContextInterface>(
  {} as ContextInterface
);

export function RadioChannelProvider({ children }: PropsWithChildren) {
  const [channels, setChannels] = useState<RadioChannel[]>([]);
  const [favorites, setFavorites] = useState<RadioChannel[]>([]);
  const [nowPlaying, setNowPlaying] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [maxFavorites, setMaxFavorites] = useState<number>(9);

  const player = useAudioPlayer();

  // load favorites from localStorage
  useEffect(() => {
    async function loadFavorites() {
      const result = await AsyncStorage.getItem("favorites");
      if (result) {
        setFavorites(JSON.parse(result));
        // setMaxFavorites(result.length + 1);
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

  function setCurrentPlaying(channelName: string): void {
    setNowPlaying(channelName);
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
  }

  async function clearFavorites(): Promise<void> {
    // AsyncStorage löschen
    AsyncStorage.removeItem("favorites");

    // Favoriten auf leeres Array setzen
    setFavorites([]);
    setIsPlaying(false);
    setNowPlaying("");
    player.pause();
    player.remove();
  }

  function startPlaying(name: string, audioUrl: string) {
    setIsPlaying(true);
    setNowPlaying(name);
    player.replace({ uri: audioUrl });
    player.play();
  }

  function stopPlaying() {
    player.pause();
    setNowPlaying("");
    setIsPlaying(false);
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
        setCurrentPlaying,
        startPlaying,
        stopPlaying,
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
