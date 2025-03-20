import { useState } from "react";
import BuySection from "./BuySection";
import SellSection from "./SellSection";
import AvgDownSection from "./AvgDownSection";

export default function OrderSetting() {
    const [activeSection, setActiveSection] = useState("buy");

    return (
        <div className="w-[22.5rem] h-[38.5rem] m-auto mt-[10rem] bg-dark-bg rounded-2xl p-4">
            <div className="flex justify-between pb-4">
                <h3 className="text-white text-[1rem] font-semibold">주문하기</h3>
            </div>
            <div className="flex justify-between bg-[#34343F] h-[3rem] rounded-md p-4 items-center" >
                <button 
                    className={`w-[7rem] h-[2.3rem] rounded-md transition-all duration-200 ${activeSection === "buy" ? "bg-[#17171c] text-red-500" : "text-[#c3c3c6] hover:bg-[#17171c] hover:text-red-500"}`}
                    onClick={() => setActiveSection("buy")}
                >
                    매수
                </button>
                <button 
                    className={`w-[7rem] h-[2.3rem] rounded-md transition-all duration-200 ${activeSection === "sell" ? "bg-[#17171c] text-blue-500" : "text-[#c3c3c6] hover:bg-[#17171c] hover:text-blue-500"}`}
                    onClick={() => setActiveSection("sell")}
                >
                    매도
                </button>
                <button 
                    className={`w-[7rem] h-[2.3rem] rounded-md transition-all duration-200 ${activeSection === "avgDown" ? "bg-[#17171c] text-green-500" : "text-[#c3c3c6] hover:bg-[#17171c] hover:text-green-500"}`}
                    onClick={() => setActiveSection("avgDown")}
                >
                    물타기
                </button>
            </div>
            {activeSection === "buy" && <BuySection />}
            {activeSection === "sell" && <SellSection />}
            {activeSection === "avgDown" && <AvgDownSection />}
        </div>
    );
}