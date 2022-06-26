import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { FaGithub } from "react-icons/fa";

import Link from "components/Link";
import { css, Theme } from "@emotion/react";
import Button from "@mui/material/Button";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <Container>
    <Header>
      <Title>∞ Infinite camera</Title>
      <Controls>
        <Control
          LinkComponent={Link}
          href="https://github.com/Avantgarde95/infinite-camera"
        >
          <FaGithub />
        </Control>
      </Controls>
    </Header>
    <Main>{children}</Main>
  </Container>
);

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;

  color: ${({ theme }) => theme.color.foreground1};
  background-color: ${({ theme }) => theme.color.background};

  @media (min-width: 500px) {
    width: 500px;
    border-left: 2px dashed ${({ theme }) => theme.color.foreground2};
    border-right: 2px dashed ${({ theme }) => theme.color.foreground2};
  }
`;

const Header = styled.header`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  padding: 1rem 1rem;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;

  font-size: 1.5rem;
  font-weight: normal;
  line-height: 1.5rem;
`;

const Controls = styled.div`
  margin-left: auto;
`;

const Control = styled(Button)`
  width: 2rem;
  height: 2rem;
  min-width: auto;
  padding: 0;
  font-size: 2rem;

  border: 0;
  border-radius: 50%;
`;

export default Layout;
