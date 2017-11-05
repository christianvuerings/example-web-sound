import React, { Component } from "react";
import "./App.css";

// const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const PlayIcon = () => (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 50 50"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="#333333" fillRule="evenodd">
      <polygon points="45 25 15 50 15 0" />
    </g>
  </svg>
);

const PauseIcon = () => (
  <svg
    width="25px"
    height="25px"
    viewBox="0 0 50 50"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fill="#333333">
        <rect x="7" y="0" width="14" height="50" />
        <rect x="29" y="0" width="14" height="50" />
      </g>
    </g>
  </svg>
);

const beautifulTime = seconds =>
  `
	${Math.floor(seconds / 60)}:${(Math.floor(seconds) % 60 + "").padStart(2, "0")}
`;

class App extends Component {
  state = {
    duration: 0,
    paused: true,
    time: 0
  };

  updatePlaying = () => this.setState({ paused: this.player.paused });
  updateDuration = () => this.setState({ duration: this.player.duration });
  updateTime = () => this.setState({ time: this.player.currentTime });

  componentDidMount() {
    this.player.addEventListener("play", this.updatePlaying, true);
    this.player.addEventListener("pause", this.updatePlaying, true);
    this.player.addEventListener("timeupdate", this.updateTime, true);
    this.player.addEventListener("loadedmetadata", this.updateDuration, true);
  }

  componentWillUnmount() {
    this.player.removeEventListener("play", this.updatePlaying, true);
    this.player.removeEventListener("pause", this.updatePlaying, true);
    this.player.removeEventListener("timeupdate", this.updateTime, true);
    this.player.removeEventListener(
      "loadedmetadata",
      this.updateDuration,
      true
    );
  }

  handleTogglePlay = () => {
    this.player.paused ? this.player.play() : this.player.pause();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Example - Web audio</h1>
        </header>
        <div className="App-subheader">
          To get started, hit the play button.
        </div>
        <div className="App-content">
          <audio ref={c => this.player = c} loop="true" controls>
            <source
              src="https://www.zedge.net/d2w/4/1814793/332550173/view/?mp3"
              type="audio/mp3"
            />
            <div>Your browser doesn't support the audio API</div>
          </audio>

          <div>
            <h2>Custom play/pause button</h2>
            <button
              className="App-emoji-button"
              onClick={this.handleTogglePlay}
            >
              {this.state.paused ? <PlayIcon /> : <PauseIcon />}
            </button>
          </div>

          <div>
            <h2>Show time</h2>
            <div>
              {beautifulTime(this.state.time)}
              {" "}
              /
              {" "}
              {beautifulTime(this.state.duration)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
