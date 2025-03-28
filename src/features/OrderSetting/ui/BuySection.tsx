
import { useEffect } from "react";
import { useOrderSetting } from "../model";

export default function BuySection() {
  const {
    selectedMarket,
    selectedPriceType,
    setSelectedPriceType,
    quantity,
    setQuantity,
    price,
    setPrice,
    totalAmount,
    setTotalAmount,
    isLoading,
    increaseQuantity,
    decreaseQuantity,
  } = useOrderSetting();


  // BuySection.tsx에 디버깅 로그 추가
  useEffect(() => {
    console.log("현재 상태:", {
      수량: quantity,
      총액: totalAmount,
      가격: price,
      코인: selectedMarket
    });
  }, [quantity, totalAmount, price, selectedMarket]);

  return (
    <div className="w-full h-[85%] pt-4">
      <div className="flex flex-row justify-between items-center">

        <h1 className="text-white text-[1rem] font-bold">주문하기</h1>
        <div className="flex flex-row justify-between items-center bg-[#34343F] rounded-md p-2 gap-2">
          <button 
            className={`w-[7rem] h-[2.3rem] rounded-md text-[#c3c3c6] text-[1rem] hover:bg-[#17171c] ${selectedPriceType === "지정가" ? "bg-[#17171c]" : ""} transition-all duration-200`} 
            onClick={() => setSelectedPriceType("지정가")}
          >
            지정가
          </button>
          <button 
            className={`w-[7rem] h-[2.3rem] rounded-md text-[#c3c3c6] text-[1rem] hover:bg-[#17171c] ${selectedPriceType === "시장가" ? "bg-[#17171c]" : ""} transition-all duration-200`} 
            onClick={() => setSelectedPriceType("시장가")}
          >
            시장가
          </button>
        </div>
      </div>
      
      {/* 가격 입력 섹션 */}
      <div className="flex flex-row justify-between items-center mt-4">
        <h1 className="text-white text-[1rem] font-bold">구매가격</h1>

        <div className="flex flex-row justify-between items-center rounded-md">
          {isLoading ? (
            <div className="w-[15.6rem] h-[2.3rem] rounded-md bg-[#17171c] flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <input 
              type="text" 
              className="w-[15.6rem] h-[2.3rem] rounded-md text-[#c3c3c6] text-[1rem] bg-[#17171c] border-none outline-none p-2" 
              placeholder="가격 입력" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={selectedPriceType === "시장가"}
            />
          )}
        </div>
      </div>


      {/* 수량 입력 섹션 */}
      <div className="flex flex-row justify-between items-center mt-4">
        <h1 className="text-white text-[1rem] font-bold">수량</h1>
        <div className="flex flex-row justify-between items-center rounded-md">
          <input 
            type="text" 
            className="w-[11rem] h-[2.3rem] rounded-l-md text-[#c3c3c6] text-[1rem] bg-[#17171c] border-none outline-none p-2" 
            placeholder={`${selectedMarket || ''} 수량`}
            value={quantity}

            onChange={(e) => {
              // 수량 입력 시 정확한 값 처리
              const inputValue = e.target.value;
              
              // 숫자와 소수점만 허용하는 정규식 패턴
              const regex = selectedMarket === "BTC" 
                ? /^[0-9]*\.?[0-9]{0,8}$/ 
                : /^[0-9]*\.?[0-9]{0,4}$/;
                
              // 빈 값이거나 패턴에 맞는 경우만 허용
              if (inputValue === '' || regex.test(inputValue)) {
                setQuantity(inputValue);
              }
            }}

          />
          <button 
            className="w-[2.3rem] h-[2.3rem] text-[#c3c3c6] text-[1.5rem] bg-[#17171c] border-none outline-none"
            onClick={decreaseQuantity}
          >
            -
          </button>
          <button 
            className="w-[2.3rem] h-[2.3rem] text-[#c3c3c6] font-semibold text-[1rem] bg-[#17171c] border-none outline-none rounded-r-md"
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>
      </div>
<!-- <<<<<<< feature/coin
      
      {/* 총액 표시 */}
      <div className="flex flex-row justify-between items-center mt-4">
        <h1 className="text-white text-[1rem] font-bold">총액 (KRW)</h1>
        <div className="flex flex-row justify-between items-center rounded-md">
          <input 
            type="text" 
            className="w-[15.6rem] h-[2.3rem] rounded-md text-[#c3c3c6] text-[1rem] bg-[#17171c] border-none outline-none p-2" 
            value={`${totalAmount} KRW`}
            readOnly
          />
        </div>
      </div>
      
======= -->
      {/* 총액 입력 섹션 */}
      <div className="flex flex-row justify-between items-center mt-4">
        <h1 className="text-white text-[1rem] font-bold">총액</h1>
        <div className="flex flex-row justify-between items-center rounded-md relative">
          <input 
            type="text" 
            className="w-[15.6rem] h-[2.3rem] rounded-md text-[#c3c3c6] text-[1rem] bg-[#17171c] border-none outline-none p-2 pr-12" 
            placeholder="총액 입력"
            value={totalAmount === "0" ? "" : totalAmount}
            onChange={(e) => {
              // 숫자만 허용 (콤마 등 제거)
              const cleanValue = e.target.value.replace(/[^0-9]/g, '');
              console.log("총액 입력값:", cleanValue);
              setTotalAmount(cleanValue);
            }}
          />
          <span className="absolute right-3 text-[#c3c3c6]">KRW</span>
        </div>
      </div>
      {/* 구매 버튼 */}
      <div className="mt-6">
        <button 
          className="w-full h-[3rem] bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-all duration-200"
          disabled={!selectedMarket || !price || !quantity || isLoading}
        >
          매수하기
        </button>
      </div>
    </div>
  );
}