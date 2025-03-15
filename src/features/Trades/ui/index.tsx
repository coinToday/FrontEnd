import { useTradeData } from "../model";

export default function Trade() {
  const { tradeData } = useTradeData();

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const time = date.toLocaleTimeString("ko-KR", { hour12: false });

    return (
      <span>
        <strong>{`${month}.${day}`}</strong> {time}
      </span>
    );
  };

  return (
    <div className="w-full h-[30rem] mx-auto flex flex-col overflow-y-hidden gap-1 bg-white shadow-lg rounded-[2rem] border border-[#9a0000dd]">
      <div className=" p-4 text-#333D4B text-2g font-bold">체결내역</div>
      <div className="p-4 text-#333D4B text-2g font-bold">
        <div className=" flex flex-col h-full text-sm text-gray-700">
          <thead className="flex flex-row justify-center items-center gap-10 full">
            <th className="py-2  w-[10rem]">체결시간</th>
            <th className="py-2  w-[10rem]">체결가격(KRW)</th>
            <th className="py-2  w-[10rem]">체결량(BTC)</th>
            <th className="py-2  w-[10rem]">체결금액(KRW)</th>
          </thead>
          <div className="h-[20rem] flex flex-col overflow-y-scroll p-2">
            {tradeData.map((trade, index) => (
              <div
                key={index}
                className="border-b flex flex-row justify-center items-center w-full gap-10 text-center "
              >
                <div className="py-2 w-[10rem]">
                  {formatTime(trade.transaction_date)}
                </div>
                <div
                  className={`py-2  w-[10rem] ${trade.type === "bid" ? "text-red-500" : "text-blue-500"}`}
                >
                  {Number(trade.price).toLocaleString()}
                </div>
                <div className="py-2  w-[10rem] ">
                  {Number(trade.units_traded).toFixed(8)}
                </div>
                <div className="py-2  w-[10rem]">
                  {Number(trade.total).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
