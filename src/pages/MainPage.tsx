import styled from "styled-components";
import back from "../shared/mainBack.svg";
import phone from "../shared/phone.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../entities/Button";
interface ContainerProps {
  scaleValue: number;
  scrollY: number;
}

export default function MainPage() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const nav = useNavigate();
  const goToLogin = () => {
    nav("/login");
  };
  const scaleValue = Math.min(1 + scrollY / 1000, 1.5);

  return (
    <Container>
      <Background scaleValue={scaleValue} scrollY={scrollY} />

      <MainContainer>
        <Section>
          <FirstSection>
            <Title>보조지표로 똑똑하게 투자하세요</Title>
            <SubTitle>
              기술적 분석의 핵심 보조지표를 활용한
              <br /> 스마트 매매 도우미
              <Button onClick={goToLogin}>Sign up</Button>
            </SubTitle>
          </FirstSection>
          <SecondSection>
            <BoxContainer
              style={{
                filter: "blur()",
                color: "white",
                backgroundColor: "#76767641",
                backdropFilter: "blur(10px)",
              }}
            >
              <BoxTitle>주요뉴스</BoxTitle>
              <NewsWrapper>
                <NewsSection>
                  中 딥시크, 결국 ‘키보드 패턴’ 수집 제외
                </NewsSection>
                <NewsSection>
                  11년 만에 깨어난 비트코인 고래, 3천만 ...
                </NewsSection>
                <NewsSection>
                  아발란체(AVAX), 강한 수요 존 확보···3 ...
                </NewsSection>
                <NewsSection>
                  [주요 뉴스] XRP 기반 ETF 등장할까? ...
                </NewsSection>
              </NewsWrapper>
            </BoxContainer>
            <BoxContainer
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 255, 255, 0.531) 30%, rgba(224, 214, 214, 0.295) 95%)",
                color: "#000000",
                height: "100%",
              }}
            >
              <BoxTitle>코인정보</BoxTitle>
              <CoinSection>
                <CoinWrapper>
                  <CoinName>비트코인</CoinName>
                  <CoinEngName>BTC</CoinEngName>
                </CoinWrapper>
                <CoinCount>147,400,000원</CoinCount>
              </CoinSection>
              <CoinSection>
                어제보다<CoinPlusCount>+1,809,000원(+1.31%)</CoinPlusCount>
              </CoinSection>
            </BoxContainer>
          </SecondSection>
        </Section>
        <Section>
          <FirstSection>
            <Title>RSI 구간별 예약 매매 기능</Title>
            <SubTitle>
              RSI 지수를 활용하여 원하는 매매 시점을 미리 설정하세요 <br />
              나만의 매매 전략을 자유롭게 설정할 수 있습니다
            </SubTitle>
            <Button>Trade Now</Button>
          </FirstSection>
          <SecondSection>
            <BoxContainer
              style={{
                background:
                  "radial-gradient(circle, rgba(186, 179, 179, 0.531) 30%, rgba(255, 251, 251, 0.116) 95%)",
                color: "white",
              }}
            >
              <BoxTitle>RSI란?</BoxTitle>
              <RSIText>
                RSI (Relative Strength Index) 지표란 <br />
                상대강도지수로, 주식의 추세 강도를 백분율로
                <br /> 나타내는 지표를 말해요. 보통 RSI가 70 이상이라면 <br />
                과매수 (overbought), 30 이하라면 <br />
                과매도 (over sold) 상태로 판단해요.
              </RSIText>
            </BoxContainer>
            <PhoneImage src={phone} alt="Phone Image" />
          </SecondSection>
        </Section>
      </MainContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 0;
  overflow-x: hidden;
  background: linear-gradient(#000000 80%, #201c33eb, #0032a8dd 98%, #021425);
`;

const Background = styled.div<ContainerProps>`
  width: inherit;
  height: 60%;
  background-image: url(${back});
  transform: scale(${(props) => props.scaleValue});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  z-index: -1;
  filter: brightness(${(props) => Math.max(0, 0.5 - props.scrollY / 1500)});
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding-top: 10rem;
  padding-bottom: 10rem;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 200hv;
`;

const FirstSection = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 2rem;
  letter-spacing: -0.3rem;
`;
const Title = styled.div`
  font-size: 4.3rem;
  color: rgb(0, 102, 255);
  font-weight: 800;
  letter-spacing: -0.4rem;
`;
const SubTitle = styled.div`
  font-size: 2.3rem;
  color: white;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SecondSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 3rem;
  position: relative;
`;
const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  font-size: 1.3rem;
  border-radius: 2rem;
  width: fit-content;
  height: fit-content;
  padding: 3rem 2rem;
  gap: 1.2rem;
  backdrop-filter: blur(5px);
`;
const BoxTitle = styled.div`
  font-weight: 600;
`;
const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-right: 5rem;
`;
const NewsSection = styled.div``;
const CoinSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const CoinWrapper = styled.div``;
const CoinName = styled.div`
  font-size: 1.5rem;
`;
const CoinEngName = styled.div`
  font-size: 1rem;
`;
const CoinCount = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
`;
const CoinPlusCount = styled.div`
  color: red;
  padding-left: 0.5rem;
`;

const RSIText = styled.div``;

const PhoneImage = styled.img`
  position: absolute;
  bottom: 0; // 이미지가 화면 중간에 위치하도록
  right: 0;
  transform: rotate(15deg);
`;
