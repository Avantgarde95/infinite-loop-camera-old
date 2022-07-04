import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FiInfo } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

import Link from "components/Link";
import AboutDialog from "templates/AboutDialog";

interface Props {
  open: boolean;
  onClose: () => void;
  anchorEl?: MenuProps["anchorEl"];
  anchorOrigin?: MenuProps["anchorOrigin"];
}

const MainMenu = (props: Props) => {
  const [openAboutDialog, setOpenAboutDialog] = useState(false);

  const handleClickAbout = () => {
    setOpenAboutDialog(true);
  };

  const handleCloseAboutDialog = () => {
    setOpenAboutDialog(false);
  };

  return (
    <Menu {...props}>
      <MenuItem dense component="button" onClick={handleClickAbout}>
        <AboutIcon />
        <ItemText>소개</ItemText>
      </MenuItem>
      <MenuItem
        dense
        component={Link}
        href={"https://github.com/Avantgarde95/infinite-loop-camera"}
      >
        <CodeIcon />
        <ItemText>코드</ItemText>
      </MenuItem>
      <AboutDialog open={openAboutDialog} onClose={handleCloseAboutDialog} />
    </Menu>
  );
};

const ItemText = styled.span`
  margin-left: 0.5rem;
  font-size: 1rem;
`;

const iconStyle = css`
  font-size: 1.2rem;
`;

const AboutIcon = styled(FiInfo)`
  ${iconStyle}
`;

const CodeIcon = styled(FaGithub)`
  ${iconStyle}
`;

export default MainMenu;
