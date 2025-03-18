import axios from "axios";

export const tradeApi = async () => {
  try {
    const response = await axios.get(
      "https://api.bithumb.com/public/transaction_history/BTC_KRW"
    );
    console.log("체결내역 성공", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("체결내역 에러", error);
  }
};
