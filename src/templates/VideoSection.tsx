import React, { useEffect } from "react";
import styled from "@emotion/styled";

import useCanvas from "hooks/useCanvas";
import useCamera from "hooks/useCamera";

function clearCanvas(context: CanvasRenderingContext2D) {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

const VideoSection = () => {
  const { setCanvasRef, contextRef } = useCanvas();
  const context = contextRef.current;

  useCamera({
    onPlay: (video) => {
      if (context === null) {
        return;
      }

      const width = 512;
      const height = video.videoHeight / (video.videoWidth / width);

      video.width = width;
      video.height = height;
      context.canvas.width = Math.min(width, height);
      context.canvas.height = Math.min(width, height);

      clearCanvas(context);
      console.log(width, height);
    },
    onFrame: (video) => {
      if (context === null) {
        return;
      }

      context.drawImage(video, 0, 0);
    },
  });

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