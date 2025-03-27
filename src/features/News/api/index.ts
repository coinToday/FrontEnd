import axios from "axios";

// 뉴스 데이터 가져오기
export const fetchNews = async (coinName: string) => {
  try {
    const response = await axios.get("http://116.126.197.110:30010/coin-news", {
      params: { coin_name: coinName }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching news", error);
    return [];
  }
};

// 코인 목록 가져오기
export const fetchCoinList = async () => {
  try {
    const response = await axios.get("http://116.126.197.110:30010/coin-name-list?state=like");
    return response.data;
  } catch (error) {
    console.error("Error fetching coin list", error);
    return [];
  }
};