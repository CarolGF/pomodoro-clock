import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRedo,
  faMusic,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

function Timer(props) {
  return (
    <div className='timer-wrapper'>
      <h2 id={props.id}>{props.timerTitle}</h2>
      <div className='countdown' id={props.timeLeftID}>
        {props.countdown}
      </div>
      <div className='btn-level'>
        <button id={props.start_stopID} onClick={props.onPlayClick}>
          {props.timerState === "stopped" ? (
            <FontAwesomeIcon icon={faPlay} />
          ) : (
            <FontAwesomeIcon icon={faPause} />
          )}
        </button>
        <button onClick={props.onResetClick} id={props.resetID}>
          <FontAwesomeIcon icon={faRedo} />
        </button>
        <span onClick={props.onClick}>
          {props.audioState === "on" ? (
            <FontAwesomeIcon icon={faMusic} />
          ) : (
            <FontAwesomeIcon icon={faVolumeMute} />
          )}

          <audio
            id={props.audioID}
            preload='auto'
            src='https://goo.gl/65cBl1'
            ref={props.audioRef}
          ></audio>
        </span>
      </div>
    </div>
  );
}

export default Timer;
