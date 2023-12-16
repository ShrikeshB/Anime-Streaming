import React from "react";
import ReactPlayer from "react-player";
import vUrl from "../Resources/Video/AOT.mp4";
function Test() {
  return (
    <>
      <ReactPlayer url={vUrl}
        muted={true}
        playing={true}
      />
    </>
  );
}

export default Test;
