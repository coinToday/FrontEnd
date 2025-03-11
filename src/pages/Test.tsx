import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import "../app/index.css";

export default function CoinAPI() {
  const [coinData, setCoinData] = useState(null);
  const [coinName, setCoinName] = useState("XRP");
  const [coinState, setCoinState] = useState("5m");
  const [startDate, setStartDate] = useState("2025-02-12-01:50");
  const [endDate, setEndDate] = useState("2025-02-12-10:45");
  const [price, setPrice] = useState(3360.34);
  const [amount, setAmount] = useState(2.52);
  const [comments, setComments] = useState<
    { nickName: string; comment: string; createdAt: string }[]
  >([]);
  const [news, setNews] = useState<{ title: string; url: string }[]>([]);
  const [comment, setComment] = useState("");
  const [nickName, setNickName] = useState("User");

  const fetchCoinPrice = async () => {
    try {
      const response = await axios.get(
        "http://165.229.142.136:8080/coin_price",
        {
          params: { coinName, coinState, startDate, endDate },
        }
      );
      setCoinData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching coin price", error);
    }
  };

  const buyCoin = async () => {
    try {
      await axios.post("http://165.229.142.80:8080/buy-coin", {
        coinName: "DOGE",
        coinPrice: "257",
        cash: "10000",
      });
      alert("매수 완료");
    } catch (error) {
      console.error("Error buying coin", error);
    }
  };

  const sellCoin = async () => {
    try {
      await axios.post("http://165.229.142.136:8080/sell_coin", {
        coinName,
        coinPrice: price,
        amount,
      });
      alert("매도 완료");
    } catch (error) {
      console.error("Error selling coin", error);
    }
  };

  const fetchNews = async () => {
    try {
      //확인인
      const response = await axios.get(
        "http://165.229.142.136:8080/coin-news",
        { params: { coin_name: "XRP" } }
      );
      setNews(response.data);
    } catch (error) {
      console.error("Error 뉴스스", error);
    }
  };

  const fetchComments = async () => {
    try {
      //확인인
      const response = await axios.get(
        "http://165.229.142.136:8080/comment-list",
        { params: { coinName } }
      );
      setComments(response.data);
      console.log("댓글 리스트", response);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  };

  const saveComment = async () => {
    //확인
    try {
      const response = await axios.post(
        "http://165.229.142.136:8080/save-comment",
        {
          coinName,
          user_id: 1,
          comment,
        }
      );
      setComment("");
      console.log("댓글작성완료", response);
      fetchComments();
    } catch (error) {
      console.error("Error saving comment", error);
    }
  };
  const holdingAsset = async () => {
    try {
      const response = await axios.get(
        "http://165.229.142.136:8080/get-user-cash"
      );
      console.log("자산", response.data);
    } catch (error) {
      console.log("자산에러", error);
    }
  };

  return (
    <Container>
      <div className="text-2xl font-bold text-red-500">코인 API 테스트</div>
      <Card>
        <Input
          placeholder="코인명"
          value={coinName}
          onChange={(e) => setCoinName(e.target.value)}
        />
        <Input
          placeholder="시간 단위 (예: 5m)"
          value={coinState}
          onChange={(e) => setCoinState(e.target.value)}
        />
        <Input
          placeholder="시작 날짜"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          placeholder="종료 날짜"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button onClick={fetchCoinPrice}>코인 가격 조회</Button>
      </Card>
      <Card>
        <Input
          placeholder="가격"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <Input
          placeholder="수량"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <Button onClick={buyCoin}>매수</Button>
        <Button onClick={sellCoin}>매도</Button>
      </Card>
      <Card>
        <Title>코인 뉴스</Title>
        {news.map((item, index) => (
          <NewsItem key={index} href={item.url} target="_blank">
            {item.title}
          </NewsItem>
        ))}
      </Card>
      <Card>
        <Title>댓글</Title>
        <Input
          placeholder="닉네임"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <Input
          placeholder="댓글"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={saveComment}>댓글 작성</Button>
        {comments.map((c, index) => (
          <CommentItem key={index}>
            <b>{c.nickName}</b>: {c.comment} <small>({c.createdAt})</small>
          </CommentItem>
        ))}
      </Card>
      <Card>
        <Button onClick={() => fetchNews()}>코인 뉴스</Button>

        <Button onClick={() => fetchComments()}>댓글</Button>
        <Button onClick={() => holdingAsset()}>자산산</Button>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background-color: #353535;
  color: #ffffff;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const Card = styled.div`
  width: 350px;
  background-color: #525252;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #c7c7c7;
  color: #000000;
  outline: none;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #121212;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #666;
  }
`;

const Pre = styled.pre`
  background-color: #eaeaea;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.9rem;
`;

const NewsItem = styled.a`
  color: #0000ee;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const CommentItem = styled.div`
  background: #ddd;
  padding: 8px;
  border-radius: 4px;
`;
