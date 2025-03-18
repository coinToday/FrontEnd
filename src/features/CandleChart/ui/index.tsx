import React, { useEffect, useRef, useState } from "react";
import { init, dispose } from "klinecharts";
import styled from "styled-components";
import { fetchInitialData } from "../api";
import { useCoinList } from "../../CoinList/model";
// useEffect 클린업 함수 지정
// 웹소캣 삭제 -> 분봉별 백엔드와의 http 통신 리다이렉트로 변경 예정

const BitcoinChart: React.FC = () => {
  const chartRef = useRef<any>(null);

  const [chart_interval, setChart_interval] = useState<string>("1M");

  const { selectedMarket } = useCoinList();

  useEffect(() => {
    const chart = init("btc-chart");
    chartRef.current = chart;

    // 초기 캔들 데이터 로드
    const loadInitialData = async () => {
      if (!selectedMarket) return;
      const initialData = await fetchInitialData();
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

  return (
    <Container>
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
      </ChartContainer>
    </Container>
  );
};

export default BitcoinChart;

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
