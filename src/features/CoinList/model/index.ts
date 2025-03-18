import { useEffect, useRef, useReducer, useMemo } from "react";
import { fetchCoinList } from "../api";

interface Market {
  coinCode: string;
  englishName: string;
  koreanName: string;
}

type State = {
  markets: Market[];
  selectedMarket: string | null;
};

type Action =
  | { type: "SET_MARKETS"; payload: Market[] }
  | { type: "SET_SELECTED_MARKET"; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_MARKETS":
      return { ...state, markets: action.payload };
    case "SET_SELECTED_MARKET":
      return { ...state, selectedMarket: action.payload };
    default:
      return state;
  }
};

export const useCoinList = () => {
  const [{ markets, selectedMarket }, dispatch] = useReducer(reducer, {
    markets: [],
    selectedMarket: "BTC",
  });

  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) return; // 이미 데이터를 가져왔으면 API 호출 X

    const loadMarkets = async () => {
      try {
        const data = await fetchCoinList();
        dispatch({ type: "SET_MARKETS", payload: data });
        console.log("코인리스트:", data);
        isFetched.current = true;
      } catch (error) {
        console.error("코인 리스트 불러오기 실패:", error);
      }
    };

    loadMarkets();
  }, []);

  const memoizedMarkets = useMemo(() => markets, [markets]);

  return {
    markets: memoizedMarkets,
    selectedMarket,
    setSelectedMarket: (market: string) =>
      dispatch({ type: "SET_SELECTED_MARKET", payload: market }),
  };
};
