import { useQuery } from "@tanstack/react-query";
import { fetchTickerData } from "../api";
import useCoinList from "./useCoinList";

interface Ticker {
  coinCode: string;
  price: string;
  changeRate: number;
  tradeVolume: string;
}

export default function useCoinTicker() {
  const { markets } = useCoinList();

  // useQuery를 사용하여 ticker 데이터를 패칭하고, 1분마다 자동으로 새로 받아오도록 설정
  const {
    data: tickerData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tickerData"], // queryKey
    queryFn: fetchTickerData, // fetch function
    refetchInterval: 60000, // 1분마다 자동으로 새로 패치
    enabled: markets.length > 0, // markets 데이터가 있을 때만 실행되도록 설정
  });

  // 데이터가 로드되면 tickerData를 markets 배열의 순서대로 정렬
  const tickerList = markets
    .map(({ coinCode }) => {
      if (!tickerData) return null;

      const ticker = tickerData.data[coinCode];
      return ticker
        ? {
            coinCode,
            price: ticker.closing_price,
            changeRate: parseFloat(ticker.fluctate_rate_24H),
            tradeVolume: (ticker.acc_trade_value_24H / 1_000_000).toFixed(2),
          }
        : null;
    })
    .filter((item): item is Ticker => item !== null); // null 값 제거

  if (isLoading) {
    return { tickerList: [], isLoading };
  }

  if (error) {
    console.error("Error fetching ticker data:", error);
    return { tickerList: [], error };
  }

  return { tickerList, isLoading, error };
}
