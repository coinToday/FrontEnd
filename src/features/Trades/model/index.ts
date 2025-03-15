import { useEffect, useMemo, useState } from "react";
import { tradeApi } from "../api";
import { useWebsocket } from "../../../shared";

interface TradeData {
  transaction_date: string;
  price: string;
  units_traded: string;
  total: string;
  type: string;
}

type WebsocketTradeData = {
  symbol: string;
  buySellGb: "1" | "2"; // 1: 매도, 2: 매수
  contPrice: string;
  contQty: string;
  contAmt: string;
  contDtm: string;
  updn: "up" | "dn";
};

export const useTradeData = () => {
  const { isConnected, tradeData, sendMessage } = useWebsocket();
  const [httpTradeData, setHttpTradeData] = useState<TradeData[]>([]);

  useEffect(() => {
    const fetchTradeData = async () => {
      const response = await tradeApi();
      setHttpTradeData(response.slice(0, 50).reverse());
    };
    fetchTradeData();
  }, []);

  useEffect(() => {
    console.log("aldald연결상태", isConnected);
    if (isConnected) {
      sendMessage({ type: "transaction", symbols: ["BTC_KRW", "ETH_KRW"] });
    }
  }, [isConnected]);

  // useWebsocket에서 trade가 변할 때마다 계산
  const mergedData = useMemo(() => {
    const convertedTrades: TradeData[] = tradeData
      .map((t: WebsocketTradeData) => ({
        transaction_date: t.contDtm,
        price: t.contPrice,
        units_traded: t.contQty,
        total: t.contAmt,
        type: t.buySellGb === "1" ? "ask" : "bid",
      }))
      .slice(0, 50)
      .reverse();

    return [...convertedTrades, ...httpTradeData].slice(0, 50);
  }, [tradeData, httpTradeData]);

  return { tradeData: mergedData };
};
