import styled from "styled-components";
import { useCoinList } from "../model";
import { memo, useCallback } from "react";

const CoinListUi = () => {
  const { markets, setSelectedMarket } = useCoinList();

  const handleSelectMarket = useCallback(
    (marketCode: string) => setSelectedMarket(marketCode),
    [setSelectedMarket]
  );

  return (
    <Container>
      <MarketContainer>
        {markets.map((market) => (
          <MemoizedMarketList
            key={market.coinCode}
            market={market}
            onSelect={handleSelectMarket}
          />
        ))}
      </MarketContainer>
    </Container>
  );
};

// MarketList를 memoization
const MarketList = ({
  market,
  onSelect,
}: {
  market: any;
  onSelect: (code: string) => void;
}) => {
  return (
    <MarketItem onClick={() => onSelect(market.coinCode)}>
      {market.koreanName} ({market.englishName})
    </MarketItem>
  );
};

const MemoizedMarketList = memo(MarketList);

export default memo(CoinListUi);

const MarketItem = styled.div`
  cursor: pointer;
  border: 1px solid black;
  padding: 10px;
`;

const MarketContainer = styled.div`
  height: 800px;
  width: 200px;
  overflow: auto;
  margin-top: 100px;
`;

const Container = styled.div``;
