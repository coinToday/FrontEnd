import styled from "styled-components";

interface UiProps {
  btcPrice: String;
}

export const Ui = ({ btcPrice }: UiProps) => {
  return (
    <Container>
      <h1 style={{ fontSize: "2rem" }}>빗썸 비트코인 실시간 가격 정보</h1>
      <Title>
        현재 BTC 가격: <span>{btcPrice}</span>
      </Title>
      <Title>차트</Title>
      <div id="btc-chart" style={{ width: "100%", height: "500px" }}></div>
    </Container>
  );
};

const Container = styled.div`
  border: 10px solid red;
  width: 1080px;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 2rem;
  color: #4ab717;
`;
// const TransactionList = styled.div`
//   margin-top: 20px;
//   border-top: 1px solid #ddd;
//   padding-top: 10px;
// `;

// const TransactionItem = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 5px 0;
//   border-bottom: 1px solid #ddd;

//   span {
//     font-size: 1rem;
//   }
// `;

// const Text = styled.div``;
// const Nav = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: center;
// `;
