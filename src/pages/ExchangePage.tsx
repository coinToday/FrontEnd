import React, { useEffect, useRef, useState } from "react";
import { init, dispose } from "klinecharts";
import { fetchInitialData } from "../features/CandleChart/api"; //HTTP 요청 함수
import axios from "axios";
import styled from "styled-components";
import { OrderBook, Trade } from "../features";

// useEffect 클린업 함수 지정
// FSD 구조로 변경, 사이드바로 코인리스트 옮기기

interface Market {
  net_type: string;
  net_name: string;
}

const fetchMarketCodes = async () => {
  try {
    const response = await axios.get(
      "https://api.bithumb.com/public/network-info",
      {
        headers: { accept: "application/json" },
      }
    );
    console.log("network info", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching network info:", error);
    throw error;
  }
};

const BitcoinChart: React.FC = () => {
  /*const timeoutRef = useRef<number | null>(null); // setTimeout ID 저장
  const chartRef = useRef<any>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<string | null>("BTC");
  const [chart_interval, setChart_interval] = useState<string>("1M");

  useEffect(() => {
    const chart = init("btc-chart");
    chartRef.current = chart;

    // 초기 캔들 데이터 로드
    const loadInitialData = async () => {
      if (!selectedMarket) return;
      const initialData = await fetchInitialData(
        selectedMarket,
        chart_interval
      );
      if (initialData.length > 0) {
        if (chart) {
          chart.applyNewData(initialData);
        }
      }
    };

    loadInitialData();

    return () => {
      dispose("btc-chart");
      chartRef.current = null;
    };
  }, [selectedMarket, chart_interval]);

  useEffect(() => {
    const loadMarkets = async () => {
      const data = await fetchMarketCodes();
      setMarkets(data);
      console.log("markets", data);
    };
    loadMarkets();
  }, []);

  useEffect(() => {
    console.log("차트", chart_interval);
    if (!selectedMarket || chart_interval !== "1M") return;
    const websocket = new WebSocket("wss://pubwss.bithumb.com/pub/ws");

    if (chart_interval === "1M") {
      websocket.onopen = () => {
        console.log("WebSocket connected");
        console.log("selectedMarket!!", selectedMarket);
        if (selectedMarket) {
          websocket.send(
            JSON.stringify({
              type: "ticker",
              symbols: [`${selectedMarket}_KRW`],
              tickTypes: ["1M"],
            })
          );
        }
      };

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("timeref", timeoutRef.current);
        if (data?.content) {
          const { content } = data;

          if (!timeoutRef.current) {
            timeoutRef.current = window.setTimeout(() => {
              const { openPrice, highPrice, lowPrice, closePrice, volume } =
                content;
              const newData = {
                timestamp: Date.now(),
                open: Number(openPrice),
                high: Number(highPrice),
                low: Number(lowPrice),
                close: Number(closePrice),
                volume: Number(volume),
              };

              if (chartRef.current) {
                chartRef.current.updateData(newData);
                console.log("newData (delayed)", newData);
                timeoutRef.current = null;
              }
            }, 60000);
          }
        }
      };
    }

    websocket.onclose = () => console.log("WebSocket disconnected");
    websocket.onerror = (error) => console.error("WebSocket error:", error);

    return () => {
      websocket.close();
    };
  }, [selectedMarket, chart_interval]);

  return (
    <Container>
      <MarketContainer>
        {markets.map((market) => (
          <MarKetList
            key={market.net_type}
            onClick={() => setSelectedMarket(market.net_type)}
          >
            {market.net_name}
          </MarKetList>
        ))}
      </MarketContainer>
      <ChartContainer>
        {selectedMarket && (
          <div>
            <div>Selected Market: {selectedMarket}</div>
            <div>Chart_interval:{chart_interval}</div>
            <IntervalContainer>
              <InterVal
                onClick={() => {
                  setChart_interval("1M");
                }}
              >
                1M
              </InterVal>
              <InterVal
                onClick={() => {
                  setChart_interval("10M");
                }}
              >
                10M
              </InterVal>
              <InterVal
                onClick={() => {
                  setChart_interval("1H");
                }}
              >
                1H
              </InterVal>
              <InterVal
                onClick={() => {
                  setChart_interval("12H");
                }}
              >
                12H
              </InterVal>
            </IntervalContainer>
          </div>
        )}
        <Cha id="btc-chart" />;
      </ChartContainer>*/ return (
    <SubContainer>
      test
      <Trade />
      <OrderBook />
    </SubContainer>
  );
};

export default BitcoinChart;

const SubContainer = styled.div`
  border: 1px solid black;
`;
const Cha = styled.div`
  margin-left: 200px;
  width: 800px;
  height: 500px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MarKetList = styled.div`
  cursor: pointer;
  border: 1px solid black;
  padding: 10px;
`;

const MarketContainer = styled.div`
  height: 800px;
  width: 200px;
  overflow: auto;
  margin-top: 100px;
`;

const IntervalContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;
const InterVal = styled.div`
  border: 1px solid black;
  padding: 0 10px;
  width: fit-content;

  &:hover {
    background-color: lightgray;
  }

  &:active {
    background-color: gray;
  }
`;
