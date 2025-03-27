import { useState, useEffect, useMemo } from "react";
import { useCoin } from "../../../shared";
import { useWebsocket } from "../../../shared";
import { fetchCoinPrice } from "../api";

export function useOrderSetting() {
  const [selectedPriceType, setSelectedPriceType] = useState("지정가");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  
  // 선택된 코인 정보 가져오기
  const { coin: selectedMarket } = useCoin();
  const { orderbookData, tradeData, isConnected } = useWebsocket();
  
  // 현재가 정보 - API와 실시간 거래 데이터에서 계산
  const currentPriceInfo = useMemo(() => {
    if (!selectedMarket || !tradeData || tradeData.length === 0) return null;
    
    const latestTrade = tradeData.find(trade => trade.symbol === `${selectedMarket}_KRW`);
    if (latestTrade) {
      return {
        price: parseInt(latestTrade.contPrice).toLocaleString(),
        isUp: latestTrade.updn === "up"
      };
    }
    return null;
  }, [tradeData, selectedMarket]);
  
  // 시장가 정보 - 오더북에서 계산
  const marketPriceInfo = useMemo(() => {
    if (!selectedMarket || !orderbookData) return null;
    
    let currentOrderbook = null;
    
    if (Array.isArray(orderbookData)) {
      currentOrderbook = orderbookData.find(data => data.symbol === `${selectedMarket}_KRW`);
    } else if (orderbookData.symbol === `${selectedMarket}_KRW`) {
      currentOrderbook = orderbookData;
    }
    
    if (currentOrderbook && currentOrderbook.asks && currentOrderbook.asks.length > 0) {
      const lowestAsk = currentOrderbook.asks[0][0];
      return {
        price: parseInt(lowestAsk).toLocaleString()
      };
    }
    
    return null;
  }, [orderbookData, selectedMarket]);
  
  // 코인 변경 시 초기 데이터 로드
  useEffect(() => {
    if (!selectedMarket) return;
    
    const loadInitialData = async () => {
      setIsLoading(true);
      
      try {
        const priceData = await fetchCoinPrice(selectedMarket);
        if (priceData && priceData.closing_price) {
          setPrice(priceData.closing_price);
        }
      } catch (error) {
        console.error("현재가 로드 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, [selectedMarket]);
  
  // 시장가 모드일 때 가격 업데이트
  useEffect(() => {
    if (selectedPriceType === "시장가" && marketPriceInfo) {
      const unformattedPrice = marketPriceInfo.price.replace(/,/g, '');
      setPrice(unformattedPrice);
    }
  }, [selectedPriceType, marketPriceInfo]);
  
  // 지정가 모드가 아닐 때 체결 가격 기반 업데이트
  useEffect(() => {
    if (selectedPriceType !== "지정가" && currentPriceInfo) {
      const unformattedPrice = currentPriceInfo.price.replace(/,/g, '');
      setPrice(unformattedPrice);
    }
  }, [selectedPriceType, currentPriceInfo]);
  
  // 총액 계산
  useEffect(() => {
    const priceValue = parseFloat(price.replace(/,/g, '')) || 0;
    const qtyValue = parseFloat(quantity) || 0;
    setTotalAmount((priceValue * qtyValue).toLocaleString('ko-KR'));
  }, [price, quantity]);
  
  // 수량 증감 함수
  const increaseQuantity = () => {
    const currentQty = parseFloat(quantity) || 0;
    const increment = selectedMarket === "BTC" ? 0.0001 : 0.01;
    setQuantity((currentQty + increment).toFixed(selectedMarket === "BTC" ? 4 : 2));
  };
  
  const decreaseQuantity = () => {
    const currentQty = parseFloat(quantity) || 0;
    const increment = selectedMarket === "BTC" ? 0.0001 : 0.01;
    if (currentQty > increment) {
      setQuantity((currentQty - increment).toFixed(selectedMarket === "BTC" ? 4 : 2));
    }
  };
  
  return {
    selectedMarket,
    selectedPriceType,
    setSelectedPriceType,
    quantity,
    setQuantity,
    price,
    setPrice,
    totalAmount,
    isLoading,
    increaseQuantity,
    decreaseQuantity,
    getCurrentPriceInfo: () => currentPriceInfo,
    getMarketPriceInfo: () => marketPriceInfo
  };
}