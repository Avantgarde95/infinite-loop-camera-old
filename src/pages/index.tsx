import React, { useState } from "react";
import styled from "@emotion/styled";

import { isInApp } from "utils/DeviceUtils";
import useCamera from "hooks/useCamera";
import Camera from "templates/Camera";
import Controls from "templates/Controls";
import InAppDialog from "templates/InAppDialog";

const HomePage = () => {
  const [openInAppDialog, setOpenInAppDialog] = useState(isInApp());

  useCamera();

  const handleCloseInAppDialog = () => {
    setOpenInAppDialog(false);
  };

  return (
    <Container>
      <Camera />
      <Controls />
      <InAppDialog open={openInAppDialog} onClose={handleCloseInAppDialog} />
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
