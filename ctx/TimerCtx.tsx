import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import { useRadioChannel, ChannelActionKind } from "./RadioCtx";

interface TimerCtxInterface {
  timerValue: number;
  currentTimerValue: number;
  setTimer: (value: number) => void;
  stopTimer: () => void;
}

const TimerContext = createContext<TimerCtxInterface>({} as TimerCtxInterface);

export function TimerContextProvider({ children }: PropsWithChildren) {
  const [timerValue, setTimerValue] = useState<number>(0);
  const [currentTimerValue, setCurrentTimerValue] = useState<number>(0);
  const { dispatch } = useRadioChannel();

  useEffect(() => {
    let intervalId;

    if (timerValue === 0) {
      // stopPlaying();
      dispatch({ type: ChannelActionKind.STOP_PLAYING });
      setTimerValue(0);
      setCurrentTimerValue(0);
      return;
    }

    const timerId = setTimeout(() => {
      // stopPlaying();
      dispatch({ type: ChannelActionKind.STOP_PLAYING });
      setTimerValue(0);
      setCurrentTimerValue(0);
    }, 1000 * 60 * timerValue);

    intervalId = setInterval(() => {
      setCurrentTimerValue((prev) => prev - 1);
    }, 1000 * 60);

    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
    };
  }, [timerValue]);

  function setTimer(value: number) {
    setTimerValue(value);
    setCurrentTimerValue(value);
  }

  function stopTimer() {
    setTimerValue(0);
    setCurrentTimerValue(0);
  }

  return (
    <TimerContext.Provider
      value={{
        timerValue,
        currentTimerValue,
        setTimer,
        stopTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);

  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerContextProvider");
  }

  return context;
}

export default TimerContextProvider;
