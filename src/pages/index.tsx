import React from "react";
import styled from "@emotion/styled";

import VideoSection from "templates/VideoSection";
import ControlSection from "templates/ControlSection";

const HomePage = () => (
  <Container>
    <VideoSection />
    <ControlSection />
  </Container>
);

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default HomePage;
