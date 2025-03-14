import back from "../shared/mainBack.svg";
import phone from "../shared/phone.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const brightness = Math.max(0, 0.5 - scrollY / 1500);

  return (
    <div className="w-full m-0 flex flex-row relative z-0 overflow-x-hidden">
      <div className="w-full h-[1024px] bg-cover bg-center bg-no-repeat absolute z-[-1] overflow-hidden">
        <div 
          className={`w-full h-[100%] bg-cover bg-center bg-no-repeat absolute z-[-1]`}
          style={{
            backgroundImage: `url(${back})`,
            transform: `scale(${scaleValue})`,
            filter: `brightness(${brightness})`
          }}
        />
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col justify-between h-screen py-40">
          <div className="flex flex-col mx-auto w-[80rem]">
            <h1 className="text-[4rem] font-semibold text-white">보조지표로 똑똑하게 투자하세요</h1>
            <div className="flex items-center gap-4 mt-4">
              <div className="subtitle text-white text-[2.25rem] leading-10 font-semibold">기술적 분석의 핵심 보조지표를 활용한<br />스마트 매매 도우미</div>
              <button onClick={goToLogin} className="ml-20 text-[1.25rem] bg-[#038DCC] hover:bg-[#038DCC]/80 transition-all duration-300 text-white px-8 py-4 rounded-full font-medium w-[192px] h-[72px]">Sign up</button>
            </div>
          </div>
          <div className="flex flex-row justify-start gap-12 w-[80rem] mx-auto pt-[150px] relative">
            <div className="backdrop-blur-lg bg-[#767676]/40 text-white flex flex-col items-start justify-start text-lg rounded-2xl w-[30rem] h-[18rem] p-8 gap-5">
              {/* 뉴스 api 가져오기 */}
              <div className="font-bold text-[1.4rem] mb-4">주요뉴스</div>
              <div className="flex flex-col gap-3 pr-20 text-[1.25rem] font-normal">
                <div>中 딥시크, 결국 '키보드 패턴' 수집 제외</div>
                <div>11년 만에 깨어난 비트코인 고래, 3천만 ...</div>
                <div>아발란체(AVAX), 강한 수요 존 확보···3 ...</div>
                <div>[주요 뉴스] XRP 기반 ETF 등장할까? ...</div>
              </div>
            </div>
            <div className="bg-[#ffffff]/70 h-full flex flex-col items-start justify-between text-lg rounded-2xl w-[37rem] p-8 gap-5 text-[#24272D]">
              <div className="font-bold text-[1.4rem]">코인정보</div>
              <div className="flex flex-row justify-center items-center gap-8">
                <div>
                  <div className="w-[50px] h-[50px] bg-red-500 flex rounded-full float-left"></div>
                  <div className="text-[1.5rem] font-normal">비트코인</div>
                  <div className="text-[1em] font-medium">BTC</div>
                </div>
                <div className="text-[3.37rem] font-medium tracking-tighter">147,400,000<span className="font-normal text-[2.25rem] pl-1.5">원</span></div>
              </div>
              <div className="flex flex-row">
                어제보다<span className="text-red-500 pl-2">+1,809,000원(+1.31%)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-white py-20 mt-[10rem]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* 왼쪽 텍스트 영역 */}
              <div className="w-full -mt-[10rem] ml-[7rem]">
                <h2 className="text-[4rem] font-extrabold">
                  RSI 구간별 예약 매매 기능
                </h2>
                <div className="text-[2.25rem] leading-tight mt-6">
                  <p>RSI 지수를 활용하여 원하는 매매 시점을 미리 설정하세요</p>
                  <p>나만의 매매 전략을 자유롭게 설정할 수 있습니다</p>
                </div>
                <button className=" mt-7 w-[22rem] h-[72px] bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-full py-4 px-10 text-xl font-medium transition-all duration-300">
                  Trade Now
                </button>
                
                {/* RSI 설명 박스 */}
                <div className="mt-[15rem] bg-[#ffffff]/10 rounded-xl p-6 max-w-md">
                  <h3 className="font-bold text-xl mb-3">RSI란?</h3>
                  <p className="text-xl font-pretendard leading-tight">
                    RSI (Relative Strength Index) 지표란<br/>
                    상대강도지수로, 주식의 추세 강도를 백분율로<br/>
                    나타내는 지표를 말해요. 보통 RSI가 70 이상이라면<br/>
                    과매수 (overbought), 30 이하라면<br/>
                    과매도 (over sold) 상태로 판단해요.
                  </p>
                </div>
              </div>
              
              {/* 오른쪽 휴대폰 이미지 */}
              <div className="relative -mt-[10rem] -ml-[10rem] w-full md:w-1/2">
                <div className="relative transform rotate-6 mt-[27rem]">
                  <img 
                    src={phone} 
                    alt="Trading App in Phone" 
                    className="w-auto h-auto max-w-xs md:max-w-md mr-[18rem]" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
