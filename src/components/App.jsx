import React, { Component } from "react";
import Heading from "./Heading";
import TimerController from "./TimerController";
import Timer from "./Timer";
import Footer from "./Footer";
import "./App.css";

const accurateInterval = require("accurate-interval");

const initialState = {
  timerTitle: "Session",
  breakTime: 5,
  sessionTime: 25,
  timer: 1500,
  timerState: "stopped",
  intervalID: "",
  audio: "on",
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  setBreakLength = (event) => {
    const breakTime = this.state.breakTime;

    if (event.currentTarget.name === "-") {
      if (breakTime !== 1) {
        this.setState({ breakTime: breakTime - 1 });
      } else {
        this.setState({ breakTime: 1 });
      }
    } else {
      if (breakTime !== 60) {
        this.setState({ breakTime: breakTime + 1 });
      } else {
        this.setState({ breakTime: 60 });
      }
    }
  };

  setSessionLength = (event) => {
    const sessionTime = this.state.sessionTime;

    if (event.currentTarget.name === "-") {
      if (sessionTime !== 1) {
        this.setState({
          sessionTime: sessionTime - 1,
          timer: (sessionTime - 1) * 60,
        });
      } else {
        this.setState({ sessionTime: 1 });
      }
    } else {
      if (sessionTime !== 60) {
        this.setState({
          sessionTime: sessionTime + 1,
          timer: (sessionTime + 1) * 60,
        });
      } else {
        this.setState({ sessionTime: 60 });
      }
    }
    this.setState({});
  };

  countdown = () => {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };

  beginCountDown = () => {
    this.setState({
      intervalID: accurateInterval(() => {
        this.decrementTimer();
        this.phaseControl();
      }, 1000),
    });
  };

  timerControl = () => {
    if (this.state.timerState === "stopped") {
      this.beginCountDown();
      this.setState({ timerState: "running" });
    } else {
      this.setState({ timerState: "stopped" });
      this.state.intervalID && this.state.intervalID.clear();
    }
  };

  decrementTimer = () => {
    this.setState({ timer: this.state.timer - 1 });
  };

  phaseControl = () => {
    let timer = this.state.timer;
    this.buzzer(timer);
    if (timer < 0) {
      if (this.state.timerTitle === "Session") {
        return (
          this.state.intervalID && this.state.intervalID.clear(),
          this.beginCountDown(),
          this.switchTimer(this.state.breakTime * 60, "Break")
        );
      } else {
        return (
          this.state.intervalID && this.state.intervalID.clear(),
          this.beginCountDown(),
          this.switchTimer(this.state.sessionTime * 60, "Session")
        );
      }
    }
  };

  switchTimer = (num, str) => {
    this.setState({
      timer: num,
      timerTitle: str,
    });
  };

  buzzer = (_timer) => {
    if (_timer === 0) {
      this.audioBeep.play();
    }
  };

  muteAudio = () => {
    if (this.state.audio === "on") {
      return (
        document.getElementById("beep").muted, this.setState({ audio: "off" })
      );
    } else {
      return (
        !document.getElementById("beep").muted, this.setState({ audio: "on" })
      );
    }
  };

  onResetClick = () => {
    this.setState(initialState);
    this.state.intervalID && this.state.intervalID.clear();
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  };

  render() {
    return (
      <div>
        <div className='container'>
          <Heading />
          <TimerController
            onClick={this.setBreakLength}
            id='break-label'
            title='Break Length'
            decrementButton='break-decrement'
            incrementButton='break-increment'
            lengthID='break-length'
            length={this.state.breakTime}
          />
          <TimerController
            onClick={this.setSessionLength}
            id='session-label'
            title='Session Length'
            decrementButton='session-decrement'
            incrementButton='session-increment'
            lengthID='session-length'
            length={this.state.sessionTime}
          />
          <div className='timer'>
            <Timer
              onPlayClick={this.timerControl}
              onResetClick={this.onResetClick}
              id='timer-label'
              timerTitle={this.state.timerTitle}
              timeLeftID='time-left'
              countdown={this.countdown()}
              start_stopID='start_stop'
              timerState={this.state.timerState}
              resetID='reset'
              intervalID={this.state.intervalID}
              onClick={this.muteAudio}
              audioID='beep'
              audioState={this.state.audio}
              audioRef={(audio) => {
                this.audioBeep = audio;
              }}
            />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
