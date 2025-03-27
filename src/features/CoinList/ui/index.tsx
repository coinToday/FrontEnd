import { useCoin } from "../../../shared";
import { memo } from "react";
import { useCoinList } from "../model";
import useCoinTicker from "../model/useCoinTicker";

interface Market {
  coinCode: string;
  englishName: string;
  koreanName: string;
  rsi: string;
}

const CoinListUi = () => {
  const { tickerList, isLoading, error } = useCoinTicker(); // loading과 error 값 받음
  const { markets } = useCoinList();
  const { handleSelectMarket } = useCoin();

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 메시지 표시
  }

  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다: {error.message}</div>; // 에러 발생 시 메시지 표시
  }

  return (
    <div className="h-screen w-110 flex flex-col items-center justify-center bg-white">
      <div className="text-black flex flex-row w-full justify-around items-center">
        <div>코인</div>
        <div>현재가</div>
        <div>변동률</div>
        <div>거래금액</div>
        <div>rsi지수</div>
      </div>

      <div className="h-[80vh] w-full overflow-auto border border-black">
        {markets.map((market) => {
          const ticker = tickerList.find((t) => t.coinCode === market.coinCode);

          return (
            <MemoizedMarketList
              key={market.coinCode}
              onSelect={handleSelectMarket}
              market={market}
              ticker={
                ticker || {
                  price: "N/A",
                  changeRate: "N/A",
                  tradeVolume: "N/A",
                }
              } // ticker가 없을 경우 기본값을 제공
            />
          );
        })}
      </div>
    </div>
  );
};

const MarketList = memo(
  ({
    market,
    ticker,
    onSelect,
  }: {
    market: Market;
    ticker: { price: string; changeRate: string; tradeVolume: string };
    onSelect: (code: string) => void;
  }) => {
    return (
      <div
        className="border border-black flex flex-row justify-between items-center px-2 cursor-pointer text-black hover:bg-blue-100 active:bg-orange-100"
        onClick={() => onSelect(market.coinCode)}
      >
        <div className="flex flex-col justify-center items-start">
          <div className="text-base">{market.koreanName}</div>
          <div className="text-sm text-gray-500">{market.englishName}/KRW</div>
        </div>

        <div className="w-full flex flex-row justify-between items-center">
          <div> {ticker.price}</div>
          <div> {ticker.changeRate}%</div>
          <div> {ticker.tradeVolume}</div>
          <div>{market.rsi}</div>
        </div>
      </div>
    );
  }
);

const MemoizedMarketList = memo(MarketList);

export default memo(CoinListUi);
