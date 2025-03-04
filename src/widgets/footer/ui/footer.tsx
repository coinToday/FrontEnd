import styled from "styled-components";

const Container = styled.div`
  color: white;
  font-size: 1.2rem;
  width: 100%;
  height: 25rem;
  background: linear-gradient(
    #d9d9d9ab 0%,
    #9b7fb3a9 41%,
    #4969c8 66%,
    #072b4c
  );
  padding: 6rem 10rem;
  font-weight: 800;
  position: relative;
`;

const Title = styled.span`
  font-size: 2.5rem;
  position: absolute;
  top: 20%;
  left: 10%;
`;

const Black = styled.span`
  color: #000000;
`;

const Menu1 = styled.div`
  position: absolute;
  top: 30%;
  left: 40%;
`;

const Menu2 = styled.div`
  position: absolute;
  top: 30%;
  left: 70%;
`;
export default function Footer() {
  return (
    <Container>
      <Title>
        <Black>RSI</Black> 지수로 거래하는
        <br /> <Black> 오늘의 코인</Black>
      </Title>
      <Menu1>
        제작자 <br />
        <br />
        권민강ㅤㅤ github: <br />
        오상훈ㅤㅤ github: <br />
        윤여정 ㅤㅤgithub: <br />
        조승빈ㅤㅤ github:
      </Menu1>
      <Menu2>
        사이트맵 <br />
        <br />
        ↗ 오늘의 코인 메인
        <br /> ↗ 거래소
        <br /> ↗ 시장동향 <br />↗<br /> ↗ 포트폴리오
      </Menu2>
    </Container>
  );
}
