import React from "react";
import styled from "@emotion/styled";

import useCamera from "hooks/useCamera";
import Video from "templates/Video";
import Controls from "templates/Controls";

const HomePage = () => {
  useCamera();

  return (
    <Container>
      <Video />
      <Controls />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default HomePage;
