import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "@emotion/styled";

import useCanvas from "hooks/useCanvas";
import useCamera from "hooks/useCamera";
import useFrame from "hooks/useFrame";
import { flipCameraState, shotCameraState } from "states/Camera";

const VideoSection = () => {
  const flipCamera = useRecoilValue(flipCameraState);
  const shotCamera = useRecoilValue(shotCameraState);

  const { setCanvasRef, contextRef } = useCanvas();
  const context = contextRef.current;

  const { video } = useCamera((video) => {
    if (context === null) {
      return;
    }

    const width = 512;
    const height = video.videoHeight / (video.videoWidth / width);

    video.width = width;
    video.height = height;
    context.canvas.width = Math.min(width, height);
    context.canvas.height = Math.min(width, height);
  });

  useFrame(() => {
    if (context === null) {
      return;
    }

    if (typeof video === "undefined") {
      return;
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.save();

    if (flipCamera) {
      context.translate(context.canvas.width, 0);
      context.scale(-1, 1);
    }

    context.drawImage(video, 0, 0);
    context.restore();
  });

  useEffect(() => {
    if (shotCamera <= 0) {
      return;
    }

    if (context === null) {
      return;
    }

    const link = document.createElement("a");
    link.download = `Download-${shotCamera}.png`;

    const dataURL = context.canvas.toDataURL("image/png");

    link.href = dataURL.replace(
      /^data:image\/png/,
      "data:application/octet-stream"
    );

    link.click();
  }, [shotCamera, context]);

  return (
    <Container>
      <Canvas ref={setCanvasRef} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;
  aspect-ratio: 1/1;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

export default VideoSection;
