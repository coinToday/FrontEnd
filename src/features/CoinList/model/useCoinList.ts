import { create } from "zustand";
import { fetchCoin } from "../api";
import { useEffect } from "react";

interface Market {
  coinCode: string;
  englishName: string;
  koreanName: string;
  rsi: string;
}

// zustand store 인터페이스
interface CoinListStore {
  markets: Market[];
  loading: boolean;
  fetchCoinList: () => Promise<void>;
}

const useCoinListStore = create<CoinListStore>((set) => ({
  markets: [],
  loading: false,
  fetchCoinList: async () => {
    // 이미 로딩 중이면 중복 호출 방지
    if (useCoinListStore.getState().loading) return;

    set({ loading: true });
    try {
      const data = await fetchCoin();
      const formattedMarkets = data.map((market: { rsi: string }) => ({
        ...market,
        rsi: !isNaN(Number(market.rsi))
          ? parseFloat(market.rsi).toFixed(1)
          : market.rsi,
      }));
      set({ markets: formattedMarkets, loading: false });
    } catch (error) {
      console.error("코인 리스트 에러:", error);
      set({ loading: false });
    }
  },
}));

export default function useCoinList() {
  const { markets, fetchCoinList } = useCoinListStore();

  useEffect(() => {
    if (markets.length === 0) {
      fetchCoinList();
    }
  }, []); // 최초 한 번만 호출되도록 빈 의존성 배열 사용

  return { markets };
}
