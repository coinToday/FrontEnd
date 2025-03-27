import axios from "axios";

export const fetchTickerData = async () => {
  const response = await axios.get(
    "https://api.bithumb.com/public/ticker/ALL_KRW"
  );
  const data = response.data;
  console.log("ticker:", data);
  return data;
};
