import axios from "axios";
export const commentList = (coinName: string) => {
  try {
    const Response = axios.get("localhost:8080/comment-list", {
      params: { coinName },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return Response;
  } catch (error) {
    console.log(`${coinName}댓글 에러:${error}`);
    return {};
  }
};

export const commentLike = (commentId: string, userId: string) => {
  try {
    const response = axios.post("localhost:8080/like-comment", {
      params: { commentId, userId },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(`${commentId} 댓글 좋아요 에러 : ${error}`);
    return {};
  }
};
