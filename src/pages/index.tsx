import React from "react";
import styled from "@emotion/styled";

import CameraSection from "templates/CameraSection";
import ControlSection from "templates/ControlSection";

const HomePage = () => (
  <Container>
    <CameraSection />
    <ControlSection />
  </Container>
);

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default HomePage;
