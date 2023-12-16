import { useRef, useState } from "react";
import style from "./style/TrailerVideoPlayer.css";
import IconsLinks from "../../IconLinks";
import screenfull from "screenfull";
import ReactPlayer from "react-player";
function TrailerVideoPlayer(props) {
  const Vcontainer = useRef();
  const vid = useRef();
  const range = useRef();

  //! sets the format to display video progress and duration.
  const format = (seconds) => {
    if (isNaN(seconds)) return "00:00";

    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds();

    if (hh) return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;

    return `${mm}:${ss}`;
  };

  const currentTime = vid.current ? vid.current.getCurrentTime() : "00:00";
  const videoDuration = vid.current ? vid.current.getDuration() : "00:00";
  const ellapsedTime = format(currentTime);
  const totalDuration = format(videoDuration);

  const [state, setState] = useState({
    playing: true,
    muted: true,
    playBackState: 1.0,
    played: 0,
    seeking: false,
    fullScreen: false,
    quality: false,
  });

  const [controlStyle, setControlStyle] = useState({ opacity: 1 });
  const activeControls = () => {
    setControlStyle({ opacity: 1 });
  };
  const deactiveControls = () => {
    setControlStyle({ opacity: 0 });
  };

  //! handle play & pause video.
  const handlePlayPauseState = () => {
    setState({ ...state, playing: !state.playing });
  };

  //! skip 30s forward.
  const handleForward = () => {
    vid.current.seekTo(vid.current.getCurrentTime() + 30);
  };

  //! skip 30s backward.
  const handleBackward = () => {
    vid.current.seekTo(vid.current.getCurrentTime() - 30);
  };

  //! handle the video mute & unmute.
  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const handleFullScreen = () => {
    screenfull.toggle(Vcontainer.current);
    setState({ ...state, fullScreen: !state.fullScreen });
  };

  //! handle the playback speed of video.
  const [playBackValue, setplayBackValue] = useState(1.0);
  const duration = vid.current ? vid.current.getDuration() : 0;
  const handlePlayBack = (e) => {
    setplayBackValue(e.target.value);
    console.log(playBackValue);

    setState({ ...state, playBackState: e.target.value });
  };

  //! used to change video current progress with seekbar.
  const chbar = () => {
    console.log(range.current.value);
    vid.current.seekTo(range.current.value / 100);
  };

  //! check if user is seeking to avoid video progress.
  const handleSeeking = () => {
    setState({ ...state, seeking: true });
    setState({ ...state, playing: false });
  };

  //! check if user is seeking to avoid video progress.
  const handleNotSeeking = () => {
    setState({ ...state, seeking: false });
    setState({ ...state, playing: true });
  };

  const handleProgress = (changeState) => {
    let cur = (changeState.playedSeconds / duration) * 100;
    // console.log(parseInt(cur)+"%");
    range.current.value = cur;
    setState({
      ...state,
      played: parseInt(Math.abs(changeState.playedSeconds)),
    });

    if (state.played >= duration) {
      setState({ ...state, playing: false });
    }
  };

  //! checks whether video finished.
  const checkStatus = () => {
    if (state.played >= duration) {
      setState({ ...state, played: 0 });
    }
  };

  return (
    <div className="trailer">
      <div ref={Vcontainer} className="trailer-video" style={style}>
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          ref={vid}
          url={"http://localhost:3002/uploads/Trailer/"+props.path}
          muted={state.muted}
          playing={state.playing}
          onPlay={checkStatus}
          onProgress={handleProgress}
          onEnded={handlePlayPauseState}
          playbackRate={state.playBackState}
        />
        {/* 1691816820945.AOT.mp4 */}
        <div
          className="controller"
          onMouseOver={activeControls}
          onMouseOut={deactiveControls}
          style={controlStyle}
        >
          <div className="top">
            <p>{props.Title}</p>
          </div>

          <div className="mid">
            <button className="backward">
              <img onClick={handleBackward} src={IconsLinks.backward} alt="" />
            </button>

            <button className="play-btn">
              <img
                onClick={handlePlayPauseState}
                className={state.playing ? "pause" : "play"}
                src={state.playing ? IconsLinks.pause : IconsLinks.play}
                alt=""
              />
            </button>

            <button className="forward">
              <img onClick={handleForward} src={IconsLinks.forward} alt="" />
            </button>
          </div>

          <div className="bottom">
            <div className="timeline">
              <input
                className="range-bar"
                onChange={chbar}
                onFocus={handleSeeking}
                onBlur={handleNotSeeking}
                ref={range}
                type="range"
                name="points"
                min="0"
                max="100"
                defaultValue={0}
              />
            </div>

            <div className="below">
              <div className="left">
                <div className="mute">
                  <img
                    onClick={handleMute}
                    src={state.muted ? IconsLinks.muted : IconsLinks.sound_icon}
                    alt=""
                  />
                </div>
                <p className="duration">{`${ellapsedTime}/${totalDuration}`}</p>
              </div>

              <div className="right">
                <select onChange={handlePlayBack} name="" id="">
                  <option value="1.0">1.0x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2x</option>
                </select>

                <div className="screenSize">
                  <img
                    onClick={handleFullScreen}
                    src={
                      state.fullScreen
                        ? IconsLinks.minScreen
                        : IconsLinks.maxScreen
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrailerVideoPlayer;
