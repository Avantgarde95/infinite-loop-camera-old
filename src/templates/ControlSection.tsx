import React from "react";
import styled from "@emotion/styled";
import { IoFlashlight } from "react-icons/io5";
import { GrPowerCycle } from "react-icons/gr";

const ControlSection = () => (
  <Container>
    <IconButton>
      <IoFlashlight />
    </IconButton>
    <ShotButton />
    <IconButton>
      <GrPowerCycle />
    </IconButton>
  </Container>
);

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

const IconButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border: 0;
  width: 3rem;
  height: 3rem;
  padding: 0;
  font-size: 2rem;

  color: ${({ theme }) => theme.color.foreground2};
  background-color: transparent;

  path {
    stroke: ${({ theme }) => theme.color.foreground2};
  }
`;

export default ControlSection;
