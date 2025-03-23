import { useEffect, useRef } from "react";
import { useWebsocket } from "../../../shared";

export function useOrderbook() {
  const { sendMessage, orderbookData } = useWebsocket();
  const cacheRef = useRef(
    sessionStorage.getItem("orderbookData")
      ? JSON.parse(sessionStorage.getItem("orderbookData")!)
      : null
  );

  useEffect(() => {
    sendMessage({ type: "orderbooksnapshot", symbols: ["BTC_KRW"] });
  }, [sendMessage]);

  useEffect(() => {
    if (orderbookData) {
      cacheRef.current = orderbookData;
      sessionStorage.setItem("orderbookData", JSON.stringify(orderbookData));
    }
  }, [orderbookData]);

  return { orderbookData: orderbookData || cacheRef.current };
}
