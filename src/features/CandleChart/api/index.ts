// 초기 캔들 차트 데이터를 불러오는 API 함수
export const fetchInitialData = async (
    coin: string | null | undefined,
    chart_interval: string | undefined
  ) => {
    try {
      const response = await fetch(
        `https://api.bithumb.com/public/candlestick/${coin}_KRW/${chart_interval}`
      );
      const data = await response.json();
      console.log("http", data);
      if (data.status !== "0000") throw new Error("API 요청 실패");
  
      console.log("캔들차트 http 패치");
      return data.data.map((item: any) => ({
        timestamp: Number(item[0]), // 기준 시간
        open: Number(item[1]), // 시가
        close: Number(item[2]), // 종가
        high: Number(item[3]), // 고가
        low: Number(item[4]), // 저가
        volume: Number(item[5]), // 거래량
      }));
    } catch (error) {
      console.error("초기 데이터 로드 실패:", error);
      return [];
    }
  };
  