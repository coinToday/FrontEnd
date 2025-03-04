import { useEffect, useRef, useState } from "react";
import { fetchInitialData } from "./api";
import { init, dispose } from "klinecharts";
import { Ui } from "./Ui";

export const Model: React.FC = () => {
  const chartRef = useRef<ReturnType<typeof init> | null>(null);
  const [btcPrice, setBtcPrice] = useState<String>("가져오는 중...");
  //useState가 아닌 useRef를 사용하는 이유는 웹소켓 연결이 생성될 때 컴포넌트를 리렌더링되어도 변경되지 않는 값이기 떄문에 WebSocket 연결을 지속적으로 감지하기에는 useRef를 사용하는 것이 더 적합합니다.
  // 컴포넌트 렌더링 시 생성되는 웹소켓 값을 지속적으로 감시하고 연결

  useEffect(() => {
    chartRef.current = init("btc-chart");
    fetchInitialData().then((initialData) => {
      if (chartRef.current) {
        chartRef.current.applyNewData(initialData);
        // applyNewData: init으로 생성된 차트 객체의 메서드
      }
    });

    const websocket = new WebSocket("wss://pubwss.bithumb.com/pub/ws");

    websocket.onopen = () => {
      console.log("캔들 차트 웹소캣 연결됨");
      websocket.send(
        JSON.stringify({
          type: "ticker",
          Symbols: ["BTC_KRW"],
          tickTypes: ["1M"],
        })
      );
    };
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data); //문자열로 온 json 데이터를 js 객체로 변환
      if (data.hasOwnProperty("content") && data.content.tickType === "1M") {
        console.log(data);
        const content = data.content;
        const price = content.closePrice;
        setBtcPrice(price.toLocaleString() + " KRW");
        const newCandle = {
          timestamp: new Date().getTime(),
          open: Number(content.openPrice),
          high: Number(content.highPrice),
          low: Number(content.lowPrice),
          close: Number(content.closePrice),
          volume: Number(content.volume),
        };

        if (chartRef.current) {
          chartRef.current.updateData(newCandle);
          // applyNewData와 동일한 출처의 메서드
        }
      }
    };
    websocket.onclose = () => {
      console.log("캔들차트 웹소켓 해제");
    };
    websocket.onerror = (error) => {
      console.error("캔들차트 웹소켓 에러", error);
    };

    return () => {
      websocket.close();
      dispose("btc-chart");
    };
  }, []);
  return <Ui btcPrice={btcPrice} />;
};
