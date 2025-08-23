import { useCoin } from "../../../shared";
import { Comment } from "../model/useList";
import { useState } from "react";

function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
}

interface ListUIProps {
  list: Comment[];
  handleLike: (id: string) => Promise<void>;
}

export default function ListUI({ list, handleLike }: ListUIProps) {
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const { coin } = useCoin();

  const toggleLike = (id: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    console.log("ddd", id, likedMap[id]);
    handleLike(id);
  };

  return (
    <div className="w-[70%] h-[70%]">
      <div className="text-2xl text-white flex flex-row justify-center items-end mb-4">
        <span>비트코인</span>
        <div className="text-sm ml-2">{coin}/KRW</div>
      </div>

      <div className="bg-[#303035] rounded-lg p-4 space-y-4 overflow-y-auto max-h-full">
        {list.map((item) => {
          const isLiked = likedMap[item.id] || false;
          return (
            <div
              key={item.id}
              className="bg-[#3a3a40] w-full p-4 rounded-xl shadow-md text-white"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{item.nickName}</span>
                <span className="text-xs text-gray-400">
                  {formatDate(item.createdAt)}
                </span>
              </div>
              <p className="text-sm mb-2 break-words">{item.comment}</p>
              <div className="text-right">
                <span
                  className="inline-block text-sm cursor-pointer text-gray-300 hover:scale-125 transition-transform"
                  onClick={() => toggleLike(item.id)}
                >
                  {isLiked ? "♥" : "♡"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
