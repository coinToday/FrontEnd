import { CandleChart, CoinList, OrderBook, Trade } from "../features";

export default function ExchangePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row relative">
        <div
          className=" ml-60
        "
        >
          <CandleChart />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <OrderBook />
      </div>
      <div>
        <Trade />
      </div>
    </div>
  );
}
