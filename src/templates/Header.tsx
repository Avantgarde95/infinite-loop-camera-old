import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import { GiHamburgerMenu } from "react-icons/gi";

import MainMenu from "templates/MainMenu";
import { resetMUIIconButton } from "styles/Mixins";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuAnchorRef = useRef<HTMLButtonElement | null>(null);

  const handleClickMenuButton = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <Container>
      <Title>∞ 무한루프 카메라</Title>
      <MenuButton ref={menuAnchorRef} onClick={handleClickMenuButton}>
        <GiHamburgerMenu />
      </MenuButton>
      <MainMenu
        open={openMenu}
        onClose={handleCloseMenu}
        anchorEl={menuAnchorRef.current}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Container>
  );
};

const Container = styled.header`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;

  font-size: 1.3rem;
  font-weight: normal;
  line-height: 1.3rem;
`;

const MenuButton = styled(IconButton)`
  ${resetMUIIconButton}

  width: 2.5rem;
  height: 2.5rem;
  margin-left: auto;
`;

export default Header;
