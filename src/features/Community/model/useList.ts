import { useEffect, useState } from "react";
import { commentLike, commentList } from "../api";
import { useCoin } from "../../../shared";

export interface Comment {
  likes: number;
  createdAt: string;
  nickName: string;
  id: string;
  comment: string;
}

export default function useList() {
  const { coin } = useCoin();
  const [list, setList] = useState<Comment[]>([]);

  const handleLike = async (id: string) => {
    try {
      await commentLike(id);
    } catch (error) {
      console.log("댓글 좋아요 실패", error);
    }
  };

  const handleListComment = async () => {
    try {
      const response = await commentList(coin);
      if (!response) return;
      setList(response);
    } catch (error) {
      console.error("댓글 불러오기 실패", error);
    }
  };

  useEffect(() => {
    handleListComment();
  }, []);

  return { list, setList, handleLike };
}
