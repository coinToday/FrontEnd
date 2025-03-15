import axios from "axios";

export const orderBookApi = async () => {
  try {
    const response = await axios.get(
      "https://api.bithumb.com/public/orderbook/BTC_KRW"
    );

    console.log("호가 성공", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("호가 에러:", error);
    return [];
  }
};
