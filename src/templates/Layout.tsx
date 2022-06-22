import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { IoMdReverseCamera } from "react-icons/io";

import Link from "components/Link";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <Container>
    <Header>
      <IoMdReverseCamera />
      &nbsp;Infinite camera
      <Website href="https://github.com/Avantgarde95/infinite-camera">
        {"</>"}
      </Website>
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
  padding: 0.5rem 0.5rem;

  font-size: 1.5rem;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
`;

const Website = styled(Link)`
  margin-left: auto;

  font-family: inherit;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.color.foreground2};
  }
`;

export default Layout;
