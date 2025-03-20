import { useState } from "react";

export default function BuySection() {
    const [selectedPriceType, setSelectedPriceType] = useState("지정가");

    return (
        <div className="w-full h-[85%] pt-4">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-white text-[1rem] font-bold">구매가격</h1>
                <div className="flex flex-row justify-between items-center bg-[#34343F] rounded-md p-2">
                    {/* 현재 코인의 시장가 지정가 */}
                    <button className={`w-[7rem] h-[2.3rem] rounded-md text-[#c3c3c6] text-[1rem] hover:bg-[#17171c] ${selectedPriceType === "지정가" ? "bg-[#17171c]" : ""} transition-all duration-200`} onClick={() => setSelectedPriceType("지정가")}>지정가</button>
                    <button className={`w-[7rem] h-[2.3rem] rounded-md text-[#c3c3c6] text-[1rem] hover:bg-[#17171c] ${selectedPriceType === "시장가" ? "bg-[#17171c]" : ""} transition-all duration-200`} onClick={() => setSelectedPriceType("시장가")}>시장가</button>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-white text-[1rem] font-bold">수량</h1>
                <div className="flex flex-row justify-between items-center rounded-md pt-2">
                    
                    <input type="text" className="w-[15rem] h-[2.3rem] rounded-md text-[#c3c3c6] text-[1rem] bg-[#17171c] border-none outline-none" />
                </div>
            </div>
        </div>
    )
}