import styled from "styled-components";
import { Footer } from "../widgets";

export default function LoginPage() {
  return (
    <Container>
      <LoginContainer>
        <LoginTitle>오늘의 코인</LoginTitle>
        <Input placeholder="아이디" />
        <Input placeholder="비밀번호" />
        <Button>로그인</Button>
      </LoginContainer>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  background: #d9d9d9;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LoginContainer = styled.div`
  height: 25rem;
  border-radius: 2rem;
  margin: auto;
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
`;
const LoginTitle = styled.div`
  color: #000000;
  font-size: 3rem;
  font-weight: 800;
`;
const Input = styled.input`
  filter: blur(0.2px);
  background-color: rgba(255, 255, 255, 0.716);
  border: none;
  border-radius: 0.5rem;
  height: 3rem;
  width: 20rem;
  padding: 0 1rem;
  box-shadow:
    inset 0px -2px 10px 2px rgb(255, 255, 255),
    0px 3px 2px 0px rgb(255, 255, 255);
  outline: 2px solid gray;

  transition: all 0.3s ease-in-out;

  &:hover {
    outline: 4px solid #008cff;
  }
  &:focus {
    outline-color: #66adff;
  }
`;

const Button = styled.div`
  width: 20rem;
  height: 3rem;
  background-color: #00a2ff;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 2px solid #b4b4b4;

  &:hover {
    background-color: #007bfe;
  }
`;
