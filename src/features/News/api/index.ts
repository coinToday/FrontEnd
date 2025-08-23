import axios from "axios";
import { fetchCoin } from "../../CoinList/api/fetchCoin";

// 뉴스 데이터 가져오기
export const fetchNews = async (coinName: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.REACT_APP_API_BASE_URL}/coin-news`,
      {
        params: { coin_name: coinName },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching news", error);
    return [];
  }
};

// 코인 목록 가져오기
export const fetchCoinList = fetchCoin;
