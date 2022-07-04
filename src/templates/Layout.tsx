import React, { ReactNode } from "react";
import styled from "@emotion/styled";

import Header from "templates/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <Container>
    <Content>
      <Header />
      <Main>{children}</Main>
    </Content>
  </Container>
);

const Container = styled.div`
  overflow-y: auto;

  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.color.background};
`;

const Content = styled.div`
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

const Main = styled.main`
  width: 100%;
  height: 100%;
`;

export default Layout;
