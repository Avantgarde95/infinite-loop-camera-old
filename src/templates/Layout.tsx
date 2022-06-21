import React, { ReactNode } from "react";
import styled from "@emotion/styled";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <Container>
    <Header>
      <Logo>∞</Logo> Camera
    </Header>
    <Main>{children}</Main>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;

  color: ${({ theme }) => theme.color.foreground1};
  background-color: ${({ theme }) => theme.color.background};
`;

const Header = styled.header`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  padding: 0.2rem 1rem;

  font-size: 1.5rem;
`;

const Logo = styled.span`
  margin-right: 0.5rem;

  font-size: 2rem;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
`;

export default Layout;
