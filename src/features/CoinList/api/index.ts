import axios from "axios";

export const fetchCoinList = async () => {
  const response = await axios.get(
    "http://116.126.197.110:30010/coin-name-list",
    {
      headers: { accept: "application/json" },
    }
  );
  console.log("코인 차트 호출:", response.data);
  return response.data;
};
