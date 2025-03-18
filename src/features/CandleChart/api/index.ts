// 초기 캔들 차트 데이터를 불러오는 API 함수
// 오픈 api에서 백엔드 api로 변경
export const fetchInitialData = async () => {
  try {
    const response = await fetch("http://116.126.197.110:30010/coin_price", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coinName: "XRP",
        coinState: "24h",
        startDate: "2025-01-12",
        endDate: "2025-02-12",
      }),
    });

    const data = await response.json();
    console.log("코인 가격 데이터:", data);

    if (!response.ok) throw new Error("API 요청 실패");

    return data.map((item: any) => ({
      coinName: item.coinName,
      timestamp: new Date(item.coinDate).getTime(), // 타임스탬프 변환
      open: Number(item.openingPrice), // 시가
      close: Number(item.closingPrice), // 종가
      high: Number(item.maxPrice), // 고가
      low: Number(item.minPrice), // 저가
      volume: Number(item.unitsTraded), // 거래량
      ris: Number(item.ris), // RSI 지수
    }));
  } catch (error) {
    console.error("초기 데이터 로드 실패:", error);
    return [];
  }
};
