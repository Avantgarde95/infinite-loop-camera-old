import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { GiHorizontalFlip } from "react-icons/gi";
import { MdFlipCameraIos } from "react-icons/md";

import {
  camerasState,
  cameraIndexState,
  flipCameraState,
  captureCameraState,
} from "states/Camera";
import SelectDialog from "templates/SelectDialog";
import { resetMUIButton, resetMUIIconButton } from "styles/Mixins";

const Controls = () => {
  const cameras = useRecoilValue(camerasState);
  const [flipCamera, setFlipCamera] = useRecoilState(flipCameraState);
  const cameraIndex = useRecoilValue(cameraIndexState);
  const setCaptureCamera = useSetRecoilState(captureCameraState);

  const [openSelectDialog, setOpenSelectDialog] = useState(false);

  // For the sake of convenience, we flip the camera automatically in some cases.
  useEffect(() => {
    if (cameras.length > 0) {
      setFlipCamera(cameras[cameraIndex].type !== "Back");
    }
  }, [cameras, cameraIndex, setFlipCamera]);

  const handleClickFlipButton = () => {
    setFlipCamera(!flipCamera);
  };

  const handleClickCaptureButton = () => {
    setCaptureCamera(true);
  };

  const handleClickChangeButton = () => {
    setOpenSelectDialog(true);
  };

  const handleCloseChangeDialog = () => {
    setOpenSelectDialog(false);
  };

  return (
    <Container>
      <TopArea>
        <ControlButton onClick={handleClickFlipButton}>
          <GiHorizontalFlip />
        </ControlButton>
        <CaptureButton variant="contained" onClick={handleClickCaptureButton} />
        <ControlButton onClick={handleClickChangeButton}>
          <MdFlipCameraIos />
        </ControlButton>
      </TopArea>
      <BottomArea>
        <Description>촬영한 사진들은 갤러리 앱에서 확인해주세요</Description>
      </BottomArea>
      <SelectDialog open={openSelectDialog} onClose={handleCloseChangeDialog} />
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 100%;
  padding: 1rem 0;
  flex: 1;
`;

const TopArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
`;

const BottomArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;
  margin-top: 1rem;
`;

const CaptureButton = styled(Button)`
  ${resetMUIButton}

  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
`;

const ControlButton = styled(IconButton)`
  ${resetMUIIconButton}

  width: 3rem;
  height: 3rem;
  font-size: 2rem;
`;

const Description = styled.div`
  margin: 0 0.5rem;
  text-align: center;
`;

export default Controls;
