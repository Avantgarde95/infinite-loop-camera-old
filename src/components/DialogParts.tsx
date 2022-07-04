import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

export const Paragraph = styled.p`
  box-sizing: border-box;

  width: 100%;
  padding: 0 1rem;

  &:not(:first-of-type) {
    margin-top: 0.5rem;
  }
`;

export const TextButton = styled(Button)`
  color: inherit;
  font-weight: normal;
  font-size: 1rem;
`;
