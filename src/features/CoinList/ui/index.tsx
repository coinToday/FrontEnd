import { useCoin } from "../../../shared";
import { useCoinList } from "../model";
import { memo } from "react";

interface Market {
  coinCode: string;
  englishName: string;
  koreanName: string;
  rsi: string;
}

const CoinListUi = () => {
  const { markets } = useCoinList();
  const { handleSelectMarket } = useCoin();

  return (
    <div className="h-screen w-96 flex items-center justify-center bg-white">
      <div className="h-[80vh] w-full overflow-auto border border-black">
        {markets &&
          markets.map((market) => (
            <MemoizedMarketList
              key={market.coinCode}
              onSelect={handleSelectMarket}
              market={market}
            />
          ))}
      </div>
    </div>
  );
};

const MarketList = memo(
  ({
    market,
    onSelect,
  }: {
    market: Market;
    onSelect: (code: string) => void;
  }) => {
    return (
      <div
        className="border border-black flex flex-row justify-between items-start px-2 cursor-pointer text-black hover:bg-blue-100 active:bg-orange-100"
        onClick={() => onSelect(market.coinCode)}
      >
        <div className="flex flex-col justify-center items-start">
          <div className="text-base">{market.koreanName}</div>
          <div className="text-sm text-gray-500">{market.englishName}/KRW</div>
        </div>
        <div className="text-right">{market.rsi} RSI</div>
      </div>
    );
  }
);

const MemoizedMarketList = memo(MarketList);

export default memo(CoinListUi);
