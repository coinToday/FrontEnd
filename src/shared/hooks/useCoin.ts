import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";

// zustand 스토어 인터페이스
interface CoinListStore {
  coin: string;
  setCoin: (coinName: string) => void;
}

const useCoinStore = create<CoinListStore>((set) => ({
  coin: "BTC",
  setCoin: (coinName) => set({ coin: coinName }),
}));

export default function useCoin() {
  const { coin, setCoin } = useCoinStore();
  const navigate = useNavigate();

  const handleSelectMarket = useCallback(
    (coinCode: string) => {
      setCoin(coinCode);
      navigate(`/exchange/${coinCode}`);
      // console.log("선택한 코인", coinCode);
    },
    [setCoin, navigate]
  );

  return { coin, handleSelectMarket, setCoin };
}
