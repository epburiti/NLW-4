import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: Boolean;
  isActive: Boolean;
  startCountdown: () => void;
  resetCountDown: () => void;
}
interface ChallengeProviderProps {
  children: ReactNode;
}
let countDownTimeOut: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: ChallengeProviderProps) {
  const { startNewChallenge } = useContext(ChallengeContext);
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setisActive] = useState(false);

  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setisActive(true);
  }
  function resetCountDown() {
    clearTimeout(countDownTimeOut);
    setisActive(false);
    setTime(0.1 * 60);
    setHasFinished(false);
  }
  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setisActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountDown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
