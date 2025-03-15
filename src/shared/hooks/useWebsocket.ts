//trade, orderbook 웹소캣용 커스텀 훅

import { useCallback, useEffect, useRef, useState } from "react";

const Socket_URL = "wss://pubwss.bithumb.com/pub/ws";

type TradeData = {
  symbol: string;
  buySellGb: "1" | "2"; // 1: 매도, 2: 매수
  contPrice: string;
  contQty: string;
  contAmt: string;
  contDtm: string;
  updn: "up" | "dn";
};

type OrderbookData = {
  symbol: string;
  datetime: string;
  asks: [string, string][]; // [가격, 잔량]
  bids: [string, string][];
};

export default function useWebsocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const tradeBuffer = useRef<TradeData[]>([]);
  const orderbookBuffer = useRef<OrderbookData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [tradeData, setTradeData] = useState<TradeData[]>([]);
  const [orderbookData, setOrderbookData] = useState<OrderbookData[]>([]);

  const sendMessage = (message: object) => {
    if (wsRef.current && isConnected) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  const connectWebsocket = useCallback(() => {
    if (wsRef.current) return; //이미 연결 중일 경우 중복연결 방지

    wsRef.current = new WebSocket(Socket_URL);

    wsRef.current.onopen = () => {
      console.log("웹소켓 연결 성공");
      setIsConnected(true);
      console.log("연결상태", isConnected);
    };
    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "transaction") {
        tradeBuffer.current = [
          ...tradeBuffer.current,
          ...message.content.list,
        ].slice(-50);
      } else if (message.type === "orderbooksnapshot") {
        // orderbookBuffer 크기를 1로 유지-> 추후 수정
        orderbookBuffer.current = [message.content];
      }

      console.log("메시지 수신", message);
      console.log("tradeBuffer", tradeBuffer.current);
    };
    wsRef.current.onclose = (event) => {
      console.log("웹소캣 연결 끊김. 2초 후 재연결 시도");
      console.log("웹소켓 닫힘! 코드:", event.code, "이유:", event.reason);
      setIsConnected(false);
      wsRef.current = null;
      setTimeout(connectWebsocket, 2000); // 재연결 시도
    };
  }, []); // 빈 배열로 유지하여 함수가 재생성되지 않도록 함

  useEffect(() => {
    connectWebsocket();

    // 1초마다 tradeBuffer와 orderbookBuffer를 useState에 업데이트
    const interval = setInterval(() => {
      setTradeData([...tradeBuffer.current]);
      setOrderbookData([...orderbookBuffer.current]);
    }, 2000);

    return () => {
      if (wsRef.current) {
        wsRef.current.close(); // 직접 웹소캣을 닫는 메서드,웹소캣 열려 있으면 닫은 후 onclose 실행
      }
      clearInterval(interval);
    }; // 클린업 함수 - 언마운트시 실행
  }, []); //마운트시 실행

  console.log("트레이드", tradeData);
  return {
    isConnected,
    sendMessage,
    tradeData,
    orderbookData,
  };
}
