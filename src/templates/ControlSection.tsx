import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { GiHorizontalFlip } from "react-icons/gi";
import { IoMdReverseCamera } from "react-icons/io";

import {
  flipCameraState,
  camerasState,
  currentCameraIndexState,
  shotCameraState,
} from "states/Camera";

const ControlSection = () => {
  const [openChangeDialog, setOpenChangeDialog] = useState(false);
  const cameras = useRecoilValue(camerasState);

  const [flipCamera, setFlipCamera] = useRecoilState(flipCameraState);
  const [shotCamera, setShotCamera] = useRecoilState(shotCameraState);

  const [currentCameraIndex, setCurrentCameraIndex] = useRecoilState(
    currentCameraIndexState
  );

  const handleClickFlip = () => {
    setFlipCamera(!flipCamera);
  };

  const handleClickShot = () => {
    setShotCamera(shotCamera + 1);
  };

  const handleClickChange = () => {
    setOpenChangeDialog(true);
  };

  const handleCloseChangeDialog = () => {
    setOpenChangeDialog(false);
  };

  const createChangeHandler = (index: number) => () => {
    setCurrentCameraIndex(index);
    setOpenChangeDialog(false);
  };

  return (
    <Container>
      <IconButton variant="outlined">
        <IconButtonContent>
          <GiHorizontalFlip onClick={handleClickFlip} />
        </IconButtonContent>
      </IconButton>
      <ShotButton variant="contained" onClick={handleClickShot} />
      <IconButton variant="outlined" onClick={handleClickChange}>
        <IconButtonContent>
          <IoMdReverseCamera />
        </IconButtonContent>
      </IconButton>
      <Dialog open={openChangeDialog} onClose={handleCloseChangeDialog}>
        <List>
          {cameras.map((camera, index) => (
            <ListItem button key={index} onClick={createChangeHandler(index)}>
              {camera.mediaDeviceInfo.label}
            </ListItem>
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

const ShotButton = styled(Button)`
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

const IconButtonContent = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-size: 1.5rem;
`;

export default ControlSection;
