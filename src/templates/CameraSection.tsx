import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import useCanvas from "hooks/useCanvas";
import useCamera from "hooks/useCamera";

function clearCanvas(context: CanvasRenderingContext2D) {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

const CameraSection = () => {
  const { setCanvasRef, contextRef } = useCanvas();
  const { videoRef } = useCamera({ cameraType: "front" });
  const context = contextRef.current;
  const video = videoRef.current;

  useEffect(() => {
    if (context === null) {
      return;
    }

    if (video === null) {
      return;
    }

    video.oncanplay = () => {
      const width = 512;
      const height = video.videoHeight / (video.videoWidth / width);

      video.width = width;
      video.height = height;
      context.canvas.width = width;
      context.canvas.height = height;

      clearCanvas(context);

      console.log(
        video.width,
        video.height,
        context.canvas.width,
        context.canvas.height
      );
    };

    video.muted = true;
    video.play();

    const interval = setInterval(() => {
      context.drawImage(video, 0, 0);
    }, 1000 / 30);

    return () => {
      clearInterval(interval);
    };
  }, [context, video]);

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

export default CameraSection;
