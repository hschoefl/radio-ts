import { ChannelActionKind } from "@/ctx/RadioCtx";
import { RadioChannel } from "@/interfaces/radioInterfaces";

export type StateType = {
  channels: RadioChannel[];
  favorites: RadioChannel[];
  nowPlaying: string;
  isPlaying: boolean;
  audioUrl: string;
  maxFavorites?: number;
};

export type SetChannelsActionType = {
  type: ChannelActionKind.SET_CHANNELS;
  payload: RadioChannel[];
};

export type SetFavoritesActionType = {
  type: ChannelActionKind.SET_FAVORITES;
  payload: RadioChannel[];
};

export type AddToFavoritesActionType = {
  type: ChannelActionKind.ADD_TO_FAVORITES;
  payload: RadioChannel;
};

export type DelFromFavoritesActionType = {
  type: ChannelActionKind.DEL_FROM_FAVORITES;
  payload: string;
};

export type StopPlayingActionType = {
  type: ChannelActionKind.STOP_PLAYING;
};

export type ClearFavoritesActionType = {
  type: ChannelActionKind.CLEAR_FAVORITES;
};

export type StartPlayingActionType = {
  type: ChannelActionKind.START_PLAYING;
  payload: { name: string; audioUrl: string };
};

export type Actions =
  | SetChannelsActionType
  | AddToFavoritesActionType
  | SetFavoritesActionType
  | StopPlayingActionType
  | StartPlayingActionType
  | DelFromFavoritesActionType
  | ClearFavoritesActionType;
