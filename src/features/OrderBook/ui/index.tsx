import { useOrderbook } from "../model";

type OrderbookEntry = [string, string];

export default function OrderbookChart() {
  const { orderbookData } = useOrderbook();

  const formatData = (orders: OrderbookEntry[], type: "ask" | "bid") => {
    const maxQuantity = Math.max(
      ...orders.map(([_, quantity]) => parseFloat(quantity)),
      1
    );

    return orders.slice(0, 10).map(([price, quantity], index) => {
      const percentage = (parseFloat(quantity) / maxQuantity) * 100;

      return (
        <div
          key={index}
          className={`flex flex-row items-center justify-around text-sm ${
            type === "ask" ? "bg-blue-100" : "bg-red-100"
          }`}
        >
          <span className="text-center">
            {parseInt(price).toLocaleString()} KRW
          </span>
          <div className="flex flex-row justify-start items-center min-w-[15rem] relative">
            <span className="mr-2">{quantity} BTC</span>
            <div
              className={`h-4 rounded-md ${type === "ask" ? "bg-blue-400" : "bg-red-400"} absolute left-20`}
              style={{
                width: `${percentage}%`,
                maxWidth: "8rem",
              }}
            ></div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-[50rem] max-w-5xl mx-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
        호가정보
      </h2>
      <div className="flex flex-row justify-around items-center text-gray-600 border-b pb-2">
        <span>가격(KRW)</span>
        <span className="min-w-[15rem]">수량(BTC)</span>
      </div>
      <div className="max-h-[32rem] overflow-y-auto border border-gray-300 rounded-md mt-2">
        {orderbookData && formatData(orderbookData.asks, "ask")}
        {orderbookData && formatData(orderbookData.bids, "bid")}
      </div>
    </div>
  );
}
