import React, { useRef } from "react";
import styled from "@emotion/styled";

function clearCanvas(context: CanvasRenderingContext2D) {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

const CameraSection = () => {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const canvasRef = (element: HTMLCanvasElement | null) => {
    if (element === null) {
      return;
    }

    contextRef.current = element.getContext("2d");

    if (contextRef.current === null) {
      throw new Error("Can't retrieve the context!");
    }

    clearCanvas(contextRef.current);
  };

  return (
    <Container>
      <Canvas ref={canvasRef} />
      <Time>2022.06.21</Time>
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

const Time = styled.div`
  position: absolute;

  left: 1rem;
  bottom: 1rem;
  font-size: 1.5rem;

  color: #ffffff;
`;

export default CameraSection;
