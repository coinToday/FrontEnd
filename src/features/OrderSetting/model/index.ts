import { useState, useEffect, useRef } from "react";
import { useCoin } from "../../../shared";
import { useWebsocket } from "../../../shared";
import { fetchCoinPrice } from "../api";

export function useOrderSetting() {
  const [selectedPriceType, setSelectedPriceType] = useState("지정가");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPriceInfo, setCurrentPriceInfo] = useState<{ price: string, isUp: boolean } | null>(null);
  const [marketPriceInfo, setMarketPriceInfo] = useState<{ price: string } | null>(null);
  
  // 선택된 코인 정보 가져오기
  const { coin: selectedMarket } = useCoin();
  const { orderbookData, tradeData, sendMessage, isConnected } = useWebsocket();
  
  // 이전 코인 기록
  const prevCoinRef = useRef<string | null>(null);
  
  // 코인 변경 감지 및 데이터 로드
  useEffect(() => {
    if (!selectedMarket) return;
    
    const loadCoinData = async () => {
      // 코인이 변경된 경우에만 로딩 상태로 전환
      if (prevCoinRef.current !== selectedMarket) {
        setIsLoading(true);
        prevCoinRef.current = selectedMarket;
        
        // 웹소켓 구독
        if (isConnected) {
          sendMessage({
            type: "orderbooksnapshot",
            symbols: [`${selectedMarket}_KRW`]
          });
          
          sendMessage({
            type: "transaction",
            symbols: [`${selectedMarket}_KRW`]
          });
        }
        
        // API로 현재가 가져오기
        try {
          const priceData = await fetchCoinPrice(selectedMarket);
          if (priceData && priceData.closing_price) {
            setPrice(priceData.closing_price);
            
            // 현재가 정보 업데이트
            setCurrentPriceInfo({
              price: parseInt(priceData.closing_price).toLocaleString(),
              isUp: priceData.fluctate_24H.startsWith("-") ? false : true
            });
          }
        } catch (error) {
          console.error("현재가 로드 오류:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadCoinData();
  }, [selectedMarket, isConnected, sendMessage]);
  
  // 오더북 데이터 업데이트 시 시장가 정보 갱신
  useEffect(() => {
    if (!selectedMarket || !orderbookData) return;
    
    let currentOrderbook = null;
    
    if (Array.isArray(orderbookData)) {
      currentOrderbook = orderbookData.find(data => data.symbol === `${selectedMarket}_KRW`);
    } else if (orderbookData.symbol === `${selectedMarket}_KRW`) {
      currentOrderbook = orderbookData;
    }
    
    if (currentOrderbook && currentOrderbook.asks && currentOrderbook.asks.length > 0) {
      const lowestAsk = currentOrderbook.asks[0][0];
      
      // 시장가 정보 업데이트
      setMarketPriceInfo({
        price: parseInt(lowestAsk).toLocaleString()
      });
      
      // 시장가 모드일 때 가격 업데이트
      if (selectedPriceType === "시장가") {
        setPrice(lowestAsk);
      }
    }
  }, [orderbookData, selectedMarket, selectedPriceType]);
  
  // 체결 데이터 업데이트 시 현재가 정보 갱신
  useEffect(() => {
    if (!selectedMarket || !tradeData || tradeData.length === 0) return;
    
    const latestTrade = tradeData.find(trade => trade.symbol === `${selectedMarket}_KRW`);
    if (latestTrade) {
      setCurrentPriceInfo({
        price: parseInt(latestTrade.contPrice).toLocaleString(),
        isUp: latestTrade.updn === "up"
      });
    }
  }, [tradeData, selectedMarket]);
  
  // 가격 타입 변경 시
  useEffect(() => {
    if (!selectedMarket || !marketPriceInfo) return;
    
    if (selectedPriceType === "시장가" && marketPriceInfo) {
      // 시장가 모드로 변경 시 오더북의 최저 매도가로 설정
      const unformattedPrice = marketPriceInfo.price.replace(/,/g, '');
      setPrice(unformattedPrice);
    }
  }, [selectedPriceType, marketPriceInfo, selectedMarket]);
  
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
  
  // 현재가 정보 가져오기 함수
  const getCurrentPriceInfo = () => {
    return currentPriceInfo;
  };
  
  // 시장가 정보 가져오기 함수
  const getMarketPriceInfo = () => {
    return marketPriceInfo;
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
    getCurrentPriceInfo,
    getMarketPriceInfo
  };
}