import { useState, useEffect, useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/Countdown.module.css";

let countDownTimeOut: NodeJS.Timeout;
export function Countdown() {
  const { startNewChallenge } = useContext(ChallengeContext);
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setisActive] = useState(false);

  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconsds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconsds).padStart(2, "0").split("");

  function startCountdown() {
    setisActive(true);
  }
  function resetCountDown() {
    clearTimeout(countDownTimeOut);
    setisActive(false);
    setTime(0.1 * 60);
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
    <div>
      <div className={styles.CountdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountDown}
            >
              Abandonar Ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
