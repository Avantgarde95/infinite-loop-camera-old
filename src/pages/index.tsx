import React from "react";
import styled from "@emotion/styled";

import useCamera from "hooks/useCamera";
import Camera from "templates/Camera";
import Controls from "templates/Controls";

const HomePage = () => {
  useCamera();

  return (
    <Container>
      <Camera />
      <Controls />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

export default HomePage;
