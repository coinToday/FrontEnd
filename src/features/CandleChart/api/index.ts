// 초기 캔들 차트 데이터를 불러오는 API 함수

import axios from "axios";

export const fetchInitialData = async () => {
  try {
    const response = await axios.get(
      "http://116.126.197.110:30010/coin_price",
      {
        params: {
          coinName: "XRP",
          coinState: "1M",
          startDate: "2025-02-12-01:50",
          endDate: "2025-02-23-10:45",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    console.log("코인 차트 가격 데이터:", data);
  } catch (error) {
    console.error("차트용 가격 로드 실패:", error);
    return [];
  }
};

/* 

  selectedMarket: string,
  chart_interval: string
    return data.map((item: any) => ({
      coinName: item.coinName,
      timestamp: new Date(item.coinDate).getTime(), // 타임스탬프 변환
      open: Number(item.openingPrice), // 시가
      close: Number(item.closingPrice), // 종가
      high: Number(item.maxPrice), // 고가
      low: Number(item.minPrice), // 저가
      volume: Number(item.unitsTraded), // 거래량
      ris: Number(item.ris), // RSI 지수
    })); */
