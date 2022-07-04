import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import { IoReload } from "react-icons/io5";

import { cameraIndexState, camerasState } from "states/Camera";
import { resetMUIIconButton } from "styles/Mixins";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SelectDialog = ({ open, onClose }: Props) => {
  const cameras = useRecoilValue(camerasState);
  const [cameraIndex, setCameraIndex] = useRecoilState(cameraIndexState);

  const handleClickItem = (index: number) => {
    setCameraIndex(index);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <List>
        {cameras.map((camera, index) => (
          <ListItemButton
            selected={index === cameraIndex}
            key={index}
            onClick={() => {
              handleClickItem(index);
            }}
          >
            {`Camera ${index + 1} (Type: ${camera.type})`}
          </ListItemButton>
        ))}
      </List>
      <ReloadButton>
        <IoReload />
      </ReloadButton>
    </Dialog>
  );
};

const ReloadButton = styled(IconButton)`
  ${resetMUIIconButton}

  width: 3rem;
  height: 3rem;
  margin-left: auto;
  margin-right: auto;
`;

export default SelectDialog;
