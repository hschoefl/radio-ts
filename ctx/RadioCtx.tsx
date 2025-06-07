import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
  type PropsWithChildren,
  Dispatch,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { RadioChannel } from "@/interfaces/radioInterfaces";

import { useAudioPlayer } from "expo-audio";
import { Actions, StateType } from "@/types/radioCtxTypes";

interface ContextInterface {
  state: StateType;
  dispatch: Dispatch<Actions>;
}

const initalState: StateType = {
  channels: [],
  favorites: [],
  nowPlaying: "",
  audioUrl: "",
  isPlaying: false,
  maxFavorites: 9,
};

const RadioChannelContext = createContext<ContextInterface>({
  state: initalState,
  dispatch: () => {},
});

export enum ChannelActionKind {
  SET_CHANNELS = "SET_CHANNELS",
  SET_FAVORITES = "SET_FAVORITES",
  ADD_TO_FAVORITES = "ADD_TO_FAVORITES",
  DEL_FROM_FAVORITES = "DEL_FROM_FAVORITES",
  SET_CURRENT_PLAYING = "SET_CURRENT_PLAYING",
  CLEAR_FAVORITES = "CLEAR_FAVORITES",
  START_PLAYING = "START_PLAYING",
  STOP_PLAYING = "STOP_PLAYING",
}

// reducer function for state transition
const reducer = (state: StateType, action: Actions): StateType => {
  switch (action.type) {
    case ChannelActionKind.SET_CHANNELS:
      return { ...state, channels: action.payload };

    case ChannelActionKind.SET_FAVORITES:
      return { ...state, favorites: action.payload };

    case ChannelActionKind.ADD_TO_FAVORITES:
      const found = state.favorites.find(
        (item) => item.name === action.payload.name
      );

      if (found) {
        // Alert.alert("Bereits in Favoriten enthalten");
        return state;
      }

      return {
        ...state,
        favorites: [
          ...state.favorites,
          {
            name: action.payload.name,
            genre: action.payload.genre,
            description: action.payload.description,
            logo: action.payload.logo,
            audioUrl: action.payload.audioUrl,
          },
        ],
      };

    case ChannelActionKind.DEL_FROM_FAVORITES: {
      return {
        ...state,
        favorites: state.favorites.filter(
          (item) => item.name != action.payload
        ),
        nowPlaying: action.payload === state.nowPlaying ? "" : state.nowPlaying,
        isPlaying:
          action.payload === state.nowPlaying ? false : state.isPlaying,
        audioUrl: action.payload === state.nowPlaying ? "" : state.audioUrl,
      };
    }

    case ChannelActionKind.STOP_PLAYING:
      return { ...state, nowPlaying: "", isPlaying: false };

    case ChannelActionKind.START_PLAYING: {
      // console.log(action.payload);
      return {
        ...state,
        nowPlaying: action.payload.name,
        audioUrl: action.payload.audioUrl,
        isPlaying: true,
      };
    }

    case ChannelActionKind.CLEAR_FAVORITES: {
      return {
        ...state,
        nowPlaying: "",
        isPlaying: false,
        audioUrl: "",
        favorites: [],
      };
    }

    default:
      return state;
  }
};

export function RadioChannelProvider({ children }: PropsWithChildren) {
  // state with reducer
  const [state, dispatch] = useReducer(reducer, initalState);

  const player = useAudioPlayer();

  // load favorites from localStorage when app starts
  useEffect(() => {
    async function loadFavorites() {
      const result = await AsyncStorage.getItem("favorites");
      if (result && result.length > 0) {
        // setFavorites(JSON.parse(result));
        console.log("Konnte Favoriten von LocalStorage laden");
        dispatch({
          type: ChannelActionKind.SET_FAVORITES,
          payload: JSON.parse(result),
        });
        // setMaxFavorites(result.length + 1);
      } else {
        console.log(
          "Konnte Favoriten nicht von LocalStorage laden oder keine vorhanden"
        );
      }
    }

    loadFavorites();
  }, []);

  // if favorites are changing -> save to localStorage
  useEffect(() => {
    async function saveFavorites() {
      await AsyncStorage.setItem("favorites", JSON.stringify(state.favorites));
    }
    saveFavorites();
  }, [state.favorites]);

  // if isPlaying State is changing -> stop/start player
  useEffect(() => {
    if (!state.isPlaying) {
      player.pause();
    } else {
      // console.log(state.audioUrl);
      player.replace({ uri: state.audioUrl });
      player.play();
    }
  }, [state.isPlaying, state.audioUrl]);

  return (
    <RadioChannelContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </RadioChannelContext.Provider>
  );
}

// custom context hook
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
