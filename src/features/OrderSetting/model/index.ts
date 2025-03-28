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

  const [inputType, setInputType] = useState("quantity");

  
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
    
// <<<<<<< feature/coin
//     const loadInitialData = async () => {
//       setIsLoading(true);
      
//       try {
//         const priceData = await fetchCoinPrice(selectedMarket);
//         if (priceData && priceData.closing_price) {
//           setPrice(priceData.closing_price);
//         }
//       } catch (error) {
//         console.error("현재가 로드 오류:", error);

    console.log(`코인 감지 [OrderSetting]: ${selectedMarket}`);
    
    // 수량과 총액을 초기화
    setQuantity("");
    setTotalAmount("0");
    
    // 가격 데이터 로드
    const loadPriceData = async () => {
      setIsLoading(true);
      
      try {
        console.log(`${selectedMarket} 가격 데이터 로드 중...`);
        const priceData = await fetchCoinPrice(selectedMarket);
        
        if (priceData && priceData.closing_price) {
          console.log(`${selectedMarket} 가격 로드 성공:`, priceData.closing_price);
          setPrice(priceData.closing_price);
        } else {
          console.error(`${selectedMarket} 가격 데이터 없음`);
          setPrice("");
        }
      } catch (error) {
        console.error(`${selectedMarket} 가격 로드 오류:`, error);
        setPrice("");
      } finally {
        setIsLoading(false);
      }
    };
    

    loadPriceData();

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
//   useEffect(() => {
//     const priceValue = parseFloat(price.replace(/,/g, '')) || 0;
//     const qtyValue = parseFloat(quantity) || 0;
//     setTotalAmount((priceValue * qtyValue).toLocaleString('ko-KR'));
//   }, [price, quantity]);
  

  // 수량 증감 함수
  const increaseQuantity = () => {
    const currentQty = parseFloat(quantity) || 0;
    const increment = selectedMarket === "BTC" ? 0.0001 : 0.01;

    const newQuantity = (currentQty + increment).toFixed(selectedMarket === "BTC" ? 4 : 2);
    
    // 수량 업데이트
    setQuantity(newQuantity);
    setInputType("quantity");

    // 가격이 있으면 총액도 업데이트 - 새 수량으로 계산해야 함
    if(price) {
      const priceValue = parseFloat(price.replace(/,/g, '')) || 0;
      const newQtyValue = parseFloat(newQuantity) || 0; // 새 수량으로 계산
      const calculatedTotal = (priceValue * newQtyValue);
      setTotalAmount(calculatedTotal.toLocaleString('ko-KR'));
    }
  };


  const decreaseQuantity = () => {
    const currentQty = parseFloat(quantity) || 0;
    const increment = selectedMarket === "BTC" ? 0.0001 : 0.01;
    if (currentQty > increment) {

      const newQuantity = (currentQty - increment).toFixed(selectedMarket === "BTC" ? 4 : 2);
      
      // 수량 업데이트
      setQuantity(newQuantity);
      setInputType("quantity");

      if(price) {
        const priceValue = parseFloat(price.replace(/,/g, '')) || 0;
        const newQtyValue = parseFloat(newQuantity) || 0;
        const calculatedTotal = (priceValue * newQtyValue);
        setTotalAmount(calculatedTotal.toLocaleString('ko-KR'));
      }
    }
  };
  
  // 수량 입력 핸들러 수정
  const handleQuantityChange = (value: string) => {
    const regex = selectedMarket === "BTC" ? /^[0-9]*\.?[0-9]{0,4}$/ : /^[0-9]*\.?[0-9]{0,2}$/;
    
    // 빈 값이거나 정규식에 맞는 경우만 수량 업데이트
    if (value === '' || regex.test(value)) {
      setQuantity(value);
      
      // 가격이 있는 경우에만 총액 계산
      if (price) {
        const priceValue = parseFloat(price.replace(/,/g, '')) || 0;
        const qtyValue = parseFloat(value) || 0;
        setTotalAmount((priceValue * qtyValue).toLocaleString('ko-KR'));
      }
      
      setInputType("quantity");
    }
  };

  // 총액 입력 핸들러
  const handleTotalAmountChange = (value: string) => {
    if(!value || value === "0") {
      setQuantity("");
      setTotalAmount("0");
      return;
    }

    const parsedAmount = parseInt(value);
    setTotalAmount(parsedAmount.toLocaleString('ko-KR'));

    if(price && parseFloat(price.replace(/,/g, '')) > 0) {
      const priceValue = parseFloat(price.replace(/,/g, ''));
      const calculatedQty = parsedAmount / priceValue;

      console.log({
        입력총액: parsedAmount,
        코인가격: priceValue,
        계산수량_raw: calculatedQty,
        코인종류: selectedMarket
      });

      // 소수점 8자리 까지 표시
      setQuantity(calculatedQty.toFixed(8));
    }

    setInputType("totalAmount");
  };

  // 코인 변경 시 수량 초기화 추가
  useEffect(() => {
    setQuantity("");
    setTotalAmount("0");
  }, [selectedMarket]);
  

  // 가격 입력 핸들러 개선
  const handlePriceChange = (value: string) => {
    // 콤마 제거 후 숫자만 유지
    const numericValue = value.replace(/[^0-9]/g, '');
    
    if (!numericValue) {
      setPrice("");
      return;
    }
    
    // 숫자 값을 정수로 변환하고 다시 콤마 포맷팅
    const parsedPrice = parseInt(numericValue);
    setPrice(parsedPrice.toLocaleString('ko-KR'));
    
    // 현재 입력 타입에 따라 다른 필드 업데이트
    if (inputType === "quantity" && quantity) {
      // 수량 기준: 가격이 변경되면 총액 재계산
      const qtyValue = parseFloat(quantity) || 0;
      setTotalAmount((parsedPrice * qtyValue).toLocaleString('ko-KR'));
    } else if (inputType === "totalAmount" && totalAmount) {
      // 총액 기준: 가격이 변경되면 수량 재계산
      const totalValue = parseFloat(totalAmount.replace(/,/g, '')) || 0;
      
      if (parsedPrice > 0) {
        const calculatedQty = totalValue / parsedPrice;
        const decimalPlaces = selectedMarket === "BTC" ? 8 : 4;
        setQuantity(calculatedQty.toFixed(decimalPlaces));
      }
    }
  };
  
  return {
    selectedMarket,
    selectedPriceType,
    setSelectedPriceType,
    quantity,

    setQuantity: handleQuantityChange,
    price,
    setPrice: handlePriceChange,
    totalAmount,
    setTotalAmount: handleTotalAmountChange,

    isLoading,
    increaseQuantity,
    decreaseQuantity,
    getCurrentPriceInfo: () => currentPriceInfo,

    getMarketPriceInfo: () => marketPriceInfo,
    inputType

  };
}