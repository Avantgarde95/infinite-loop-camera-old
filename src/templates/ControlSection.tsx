import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "@emotion/styled";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { camerasState, currentCameraIndexState } from "states/Camera";

const ControlSection = () => {
  const cameras = useRecoilValue(camerasState);

  const [currentCameraIndex, setCurrentCameraIndex] = useRecoilState(
    currentCameraIndexState
  );

  return (
    <Container>
      <ShotButton />
      <select
        onChange={(event) => {
          setCurrentCameraIndex(
            Number(event.target.options[event.target.selectedIndex].value)
          );
        }}
      >
        {cameras.map((camera, index) => (
          <option key={index} value={index}>
            {camera.label}
          </option>
        ))}
      </select>
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

const ShotButton = styled.button`
  width: 4rem;
  height: 4rem;
  border: 0;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.color.foreground2};
`;

export default ControlSection;
