import { Outlet } from "react-router-dom";
import { Sidebar } from "../widgets";
import styled from "styled-components";

const Layout1 = () => {
  return (
    <Container className="service-layout">
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default Layout1;

const Container = styled.div`
  display: flex;
`;
const Content = styled.div`
  flex-grow: 1;
  margin-left: 80px;
`;
