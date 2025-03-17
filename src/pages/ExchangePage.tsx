import { CandleChart, OrderBook, Trade } from "../features";

export default function ExchangePage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <CandleChart />
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
