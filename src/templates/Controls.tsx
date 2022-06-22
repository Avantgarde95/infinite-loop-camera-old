import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { GiHorizontalFlip } from "react-icons/gi";
import { IoMdReverseCamera } from "react-icons/io";

interface ControlsState {
  cameraNames: Array<string>;
  onFlipCamera: () => void;
  onCaptureCamera: () => void;
  onSelectCamera: (index: number) => void;
}

const Controls = ({
  cameraNames,
  onFlipCamera,
  onCaptureCamera,
  onSelectCamera,
}: ControlsState) => {
  const [openSelectDialog, setOpenSelectDialog] = useState(false);

  const handleClickChange = () => {
    setOpenSelectDialog(true);
  };

  const handleCloseChangeDialog = () => {
    setOpenSelectDialog(false);
  };

  const handleClickSelect = (index: number) => {
    onSelectCamera(index);
    setOpenSelectDialog(false);
  };

  return (
    <Container>
      <IconButton variant="outlined">
        <IconButtonContent>
          <GiHorizontalFlip onClick={onFlipCamera} />
        </IconButtonContent>
      </IconButton>
      <CaptureButton variant="contained" onClick={onCaptureCamera} />
      <IconButton variant="outlined" onClick={handleClickChange}>
        <IconButtonContent>
          <IoMdReverseCamera />
        </IconButtonContent>
      </IconButton>
      <Dialog open={openSelectDialog} onClose={handleCloseChangeDialog}>
        <List>
          {cameraNames.map((name, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                handleClickSelect(index);
              }}
            >
              {name}
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

const IconButtonContent = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-size: 1.5rem;
`;

export default Controls;
