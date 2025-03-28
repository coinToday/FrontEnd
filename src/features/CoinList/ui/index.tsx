import { useCoin } from "../../../shared";
import { memo } from "react";
import { useCoinList } from "../model";
import useCoinTicker from "../model/useCoinTicker";

interface Market {
  coinCode: string;
  englishName: string;
  koreanName: string;
  rsi: string;
  like?: boolean;
}

const CoinListUi = () => {
  const { tickerList, isLoading, error } = useCoinTicker(); // loading과 error 값 받음
  const { markets } = useCoinList();
  const { handleSelectMarket } = useCoin();

  console.log("markets:", markets);

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 메시지 표시
  }

  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다: {error.message}</div>; // 에러 발생 시 메시지 표시
  }

  return (
    <div className="h-screen w-[30rem] flex flex-col items-center justify-center bg-white text-[0.9rem] px-2">
      <div className="w-full text-black grid grid-cols-[0.8fr_2.5fr_1fr_1fr_1fr] gap-2 place-items-end px-5 pb-1">
        <div>코인</div>
        <div>현재가</div>
        <div>변동률</div>
        <div>거래금액</div>
        <div>rsi지수</div>
      </div>

      <div className="h-[80vh] w-full overflow-auto">
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
                  changeRate: 0,
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
    ticker: { price: string; changeRate: number; tradeVolume: string };
    onSelect: (code: string) => void;
  }) => {
    return (
      <div
        className={`rounded-md grid grid-cols-[1.3fr_2fr] px-2 cursor-pointer pb-3 hover:bg-blue-100 active:bg-orange-100 ${
          ticker.changeRate > 0
            ? "text-[#FF3435]"
            : ticker.changeRate < 0
              ? "text-[#038DDC]"
              : "text-[#9E9EA4]"
        }`}
        onClick={() => onSelect(market.coinCode)}
      >
        <div className="flex flex-row justify-start items-center gap-4">
          <div className="text-[#9E9EA4] hover:text-yellow-500">
            {market.like ? "★" : "☆"}
          </div>
          <div className="grid grid-rows-2">
            <div>{market.koreanName}</div>
            <div className=" text-[#9E9EA4] text-[0.8rem]">
              {market.coinCode}/KRW
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[2fr_1.5fr_3fr_1fr] gap-3">
          <div className="text-right"> {ticker.price}</div>
          <div className=" text-right"> {ticker.changeRate}%</div>
          <div className="text-right">
            {ticker.tradeVolume}
            <span className="text-[0.7rem] text-[#9E9EA4]">백만</span>
          </div>
          <div className="text-right">{market.rsi}</div>
        </div>
      </div>
    );
  }
);

const MemoizedMarketList = memo(MarketList);

export default memo(CoinListUi);
