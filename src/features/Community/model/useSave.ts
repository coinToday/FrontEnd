import { useRef } from "react";
import { commentWrite } from "../api";
import { useCoin } from "../../../shared";
import { Comment } from "./useList";

interface UseSaveProps {
  list: Comment[];
  setList: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function useSave({ list, setList }: UseSaveProps) {
  const { coin } = useCoin();
  const comment = useRef<HTMLInputElement>(null);
  const handleSubmitComment = async () => {
    if (!comment.current) return;
    const value = comment.current.value.trim(); // 공백 제거
    try {
      const response = await commentWrite(coin, comment.current.value);
      console.log("코인 댓글 작성 성공", response);
      comment.current.value = "";

      const newComment = {
        likes: 0,
        createdAt: new Date().toISOString(),
        nickName: sessionStorage.getItem("nickName") || "익명",
        id: crypto.randomUUID(),
        comment: value,
      };
      setList((prev) => [newComment, ...prev]);
      console.log("리스트:", list);
    } catch (error) {
      console.error("코인 댓글 작성 실패", error);
    }
  };
  return { handleSubmitComment, comment };
}
