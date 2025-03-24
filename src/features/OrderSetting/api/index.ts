import { useCallback } from "react";
import { useWebsocket } from "../../../shared";
import axios from "axios";

// HTTP API 추가
export const fetchCoinPrice = async (coinCode: string) => {
  try {
    const response = await axios.get(
      `https://api.bithumb.com/public/ticker/${coinCode}_KRW`
    );
    console.log(`${coinCode} 현재가 로드 성공:`, response.data);
    return response.data.data;
  } catch (error) {
    console.error(`${coinCode} 현재가 로드 에러:`, error);
    return null;
  }
};

export function useOrderSettingAPI() {
  const { isConnected, sendMessage, tradeData, orderbookData } = useWebsocket();
  
  // 현재가 즉시 가져오기 (HTTP API 사용)
  const fetchCurrentPrice = useCallback(async (market: string): Promise<string | null> => {
    try {
      const data = await fetchCoinPrice(market);
      if (data && data.closing_price) {
        return data.closing_price;
      }
    } catch (error) {
      console.error(`${market} 현재가 API 에러:`, error);
    }
    return null;
  }, []);
  
  // 코인 데이터 구독 함수
  const subscribeToMarketData = useCallback((market: string) => {
    if (isConnected && market) {
      console.log(`${market} 데이터 구독 요청`);
      
      // 오더북 데이터 구독 (즉시 응답을 위해 snapshot 사용)
      sendMessage({
        type: "orderbooksnapshot", 
        symbols: [`${market}_KRW`]
      });
      
      // 체결 데이터 구독
      sendMessage({
        type: "transaction",
        symbols: [`${market}_KRW`]
      });
    }
  }, [isConnected, sendMessage]);
  
  // 현재 가격 정보를 가져오는 함수
  const getCurrentPrice = useCallback((market: string): string | null => {
    if (!market) return null;
    
    // 1. 오더북 데이터 확인
    if (orderbookData) {
      let currentOrderbook = null;
      
      // 오더북 데이터 형식에 따라 처리
      if (Array.isArray(orderbookData)) {
        currentOrderbook = orderbookData.find(data => data.symbol === `${market}_KRW`);
      } else if (orderbookData.symbol === `${market}_KRW`) {
        currentOrderbook = orderbookData;
      }
      
      if (currentOrderbook && currentOrderbook.asks && currentOrderbook.asks.length > 0) {
        return currentOrderbook.asks[0][0];
      }
    }
    
    // 2. 체결 데이터 확인
    if (tradeData && tradeData.length > 0) {
      const latestTrade = tradeData.find(trade => trade.symbol === `${market}_KRW`);
      if (latestTrade) {
        return latestTrade.contPrice;
      }
    }
    
    return null;
  }, [orderbookData, tradeData]);
  
  return {
    subscribeToMarketData,
    getCurrentPrice,
    fetchCurrentPrice,
    isConnected,
    tradeData,
    orderbookData
  };
}