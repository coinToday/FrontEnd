import { useEffect, useState } from "react";
import { useWebsocket } from "../../../shared";

type OrderbookEntry = [string, string]; // [price, quantity]

interface OrderbookData {
  asks: OrderbookEntry[];
  bids: OrderbookEntry[];
}

export function useOrderbook() {
  const { sendMessage, orderbookData } = useWebsocket();
  const [orderbook, setOrderbook] = useState<OrderbookData>({
    asks: [],
    bids: [],
  });

  useEffect(() => {
    sendMessage({ type: "orderbooksnapshot", symbols: ["BTC_KRW"] });
  }, [sendMessage]);

  useEffect(() => {
    if (orderbookData.length > 0) {
      setOrderbook(orderbookData[0]);
    }
  }, [orderbookData]);

  return { orderbook };
}
