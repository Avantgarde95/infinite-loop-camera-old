import React from "react";
import styled from "@emotion/styled";

const Camera = () => <Container />;

const Container = styled.div`
  box-sizing: border-box;

  width: 100%;
  aspect-ratio: 1/1;
  border: 1px solid ${({ theme }) => theme.color.foreground1};
`;

export default Camera;
