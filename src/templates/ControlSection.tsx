import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Select, { SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { camerasState, currentCameraIndexState } from "states/Camera";

const ControlSection = () => {
  const cameras = useRecoilValue(camerasState);

  const [currentCameraIndex, setCurrentCameraIndex] = useRecoilState(
    currentCameraIndexState
  );

  const handleChangeCamera: SelectProps<number>["onChange"] = (event) => {
    setCurrentCameraIndex(Number(event.target.value));
  };

  return (
    <Container>
      <ShotButton />
      <Select value={currentCameraIndex} onChange={handleChangeCamera}>
        {cameras.map((camera, index) => (
          <MenuItem key={index} value={index}>
            {camera.mediaDeviceInfo.label}
          </MenuItem>
        ))}
      </Select>
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
  border: 0;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.color.foreground2};
`;

export default ControlSection;
