import React from "react";
import { useRecoilValue } from "recoil";
import styled from "@emotion/styled";

import { getTimeStrings, getTime } from "utils/DateUtils";
import { camerasState, cameraIndexState, flipCameraState } from "states/Camera";
import useCanvas from "hooks/useCanvas";
import useVideo from "hooks/useVideo";
import useAnimation from "hooks/useAnimation";

type Context = CanvasRenderingContext2D;

const canvasWidth = 512;
const canvasHeight = 512;

function clearCanvas(context: Context) {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
}

function drawVideo(context: Context, video: HTMLVideoElement, flip: boolean) {
  if (video.videoWidth <= 0 || video.videoHeight <= 0) {
    return;
  }

  context.save();

  if (flip) {
    context.translate(canvasWidth, 0);
    context.scale(-1, 1);
  }

  const minSize = Math.min(video.videoWidth, video.videoHeight);
  const width = (video.videoWidth / minSize) * canvasWidth;
  const height = (video.videoHeight / minSize) * canvasHeight;
  const x = (canvasWidth - width) / 2;
  const y = (canvasHeight - height) / 2;

  context.drawImage(video, x, y, width, height);
  context.restore();
}

function drawTexts(context: Context) {
  const timeStrings = getTimeStrings(getTime(new Date()));

  const header = "∞ 무한루프 코딩";
  const footer1 = `${timeStrings.year}.${timeStrings.month}.${timeStrings.monthDay} (${timeStrings.weekDay})`;
  const footer2 = `${timeStrings.hour}:${timeStrings.minute} ${timeStrings.ampm}`;
  const fontColor = "#ffffff";
  const fontFamily = '"Noto Sans KR", sans-serif';
  const headerWidthRatio = 0.3;

  // Find the font size such that (header width) = (canvas width) * headerWidthRatio.
  const defaultFontSize = 16;
  context.font = `${defaultFontSize}px ${fontFamily}`;
  const computedFontSize =
    defaultFontSize *
    ((canvasWidth * headerWidthRatio) / context.measureText(header).width);

  context.font = `${computedFontSize}px ${fontFamily}`;
  context.fillStyle = fontColor;
  context.fillText(
    header,
    canvasWidth - context.measureText(header).width - 20,
    50
  );
  context.fillText(footer1, 20, canvasHeight - 80);
  context.fillText(footer2, 20, canvasHeight - 40);
}

const Camera = () => {
  const cameras = useRecoilValue(camerasState);
  const flipCamera = useRecoilValue(flipCameraState);
  const cameraIndex = useRecoilValue(cameraIndexState);

  const { setCanvasRef, context } = useCanvas();

  const currentCamera =
    cameraIndex < cameras.length ? cameras[cameraIndex] : undefined;

  const { video } = useVideo(currentCamera?.stream);

  useAnimation(() => {
    if (context === null) {
      return;
    }

    clearCanvas(context);

    if (video !== null) {
      drawVideo(context, video, flipCamera);
    }

    drawTexts(context);
  }, 15);

  return (
    <Container>
      <Canvas ref={setCanvasRef} width={canvasWidth} height={canvasHeight} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

export default Camera;
