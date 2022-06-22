import React from "react";
import styled from "@emotion/styled";

interface VideoProps {
  setCanvasRef: (element: HTMLCanvasElement | null) => void;
}

const Video = ({ setCanvasRef }: VideoProps) => (
  <Container>
    <Canvas ref={setCanvasRef} />
  </Container>
);

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

export default Video;
