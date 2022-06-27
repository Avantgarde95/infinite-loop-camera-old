import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { GiHorizontalFlip } from "react-icons/gi";
import { IoMdReverseCamera } from "react-icons/io";

import {
  camerasState,
  cameraIndexState,
  flipCameraState,
  captureCameraState,
} from "states/Camera";

const Controls = () => {
  const cameras = useRecoilValue(camerasState);
  const [flipCamera, setFlipCamera] = useRecoilState(flipCameraState);
  const [cameraIndex, setCameraIndex] = useRecoilState(cameraIndexState);
  const setCaptureCamera = useSetRecoilState(captureCameraState);

  const [openSelectDialog, setOpenSelectDialog] = useState(false);

  // For the sake of convenience, we flip the camera automatically in some cases.
  useEffect(() => {
    if (cameras.length > 0) {
      setFlipCamera(cameras[cameraIndex].type !== "Back");
    }
  }, [cameras, cameraIndex, setFlipCamera]);

  const handleClickFlip = () => {
    setFlipCamera(!flipCamera);
  };

  const handleClickCapture = () => {
    setCaptureCamera(true);
  };

  const handleClickChange = () => {
    setOpenSelectDialog(true);
  };

  const handleCloseChangeDialog = () => {
    setOpenSelectDialog(false);
  };

  const handleClickSelect = (index: number) => {
    setCameraIndex(index);
    setOpenSelectDialog(false);
  };

  return (
    <Container>
      <IconButton variant="outlined" onClick={handleClickFlip}>
        <Icon>
          <GiHorizontalFlip />
        </Icon>
      </IconButton>
      <CaptureButton variant="contained" onClick={handleClickCapture} />
      <IconButton variant="outlined" onClick={handleClickChange}>
        <Icon>
          <IoMdReverseCamera />
        </Icon>
      </IconButton>
      <Dialog open={openSelectDialog} onClose={handleCloseChangeDialog}>
        <List>
          {cameras.map((camera, index) => (
            <ListItemButton
              selected={index === cameraIndex}
              key={index}
              onClick={() => {
                handleClickSelect(index);
              }}
            >
              {`Camera ${index + 1} (Type: ${camera.type})`}
            </ListItemButton>
          ))}
        </List>
      </Dialog>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  margin-top: 1rem;
`;

const CaptureButton = styled(Button)`
  width: 4rem;
  height: 4rem;
  padding: 0;
  border-radius: 50%;

  &::after {
    display: block;
    content: "";

    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.color.background};
  }
`;

const IconButton = styled(Button)`
  width: 3rem;
  height: 3rem;
  min-width: auto;
  border-radius: 50%;
  padding: 0;
`;

const Icon = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-size: 1.5rem;
`;

export default Controls;
