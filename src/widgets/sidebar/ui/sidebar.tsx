import styled from "styled-components";

export default function SideBar() {
  return (
    <BarLine>
      <Login>로그인</Login>
    </BarLine>
  );
}
const BarLine = styled.div`
  width: 80px;
  height: 100vh;
  background-color: #181818;
  padding: 1rem 1.5rem;
  margin: 0;
  color: wheat;
  z-index: 1000;
  position: fixed;
`;
const Login = styled.div`
  font-size: 0.5rem;
`;
