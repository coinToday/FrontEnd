import axios from "axios";
import { userId } from "../../../shared/userId";

// 코인 댓글 리스트 가져오기
export const commentList = async (coinName: string) => {
  const Response = await axios.get(
    `${import.meta.env.REACT_APP_API_BASE_URL}/comment-list?coinName=${coinName}`
  );
  console.log("코인 댓글 리스트", coinName, Response.data);
  if (Response.status !== 200) {
    console.error("댓글 리스트 가져오기 실패", Response.data);
    return null;
  }
  return Response.data;
};

// 코인 댓글 좋아요
export const commentLike = async (commentId: string) => {
  const response = await axios.post(
    `${import.meta.env.REACT_APP_API_BASE_URL}/like-comment`,
    {
      params: { commentId, userId },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

// 코인 댓글 작성하기
export const commentWrite = async (coinName: string, comment: string) => {
  console.log("코인 댓글 작성", coinName, comment, userId);
  const response = await axios.post(
    `${import.meta.env.REACT_APP_API_BASE_URL}/save-comment`,
    {
      coinName,
      userId,
      comment,
    }
  );
  return response.data;
};
