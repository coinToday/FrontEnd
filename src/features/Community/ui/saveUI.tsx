import { RefObject } from "react";

interface SaveUIProps {
  handleSubmitComment: () => Promise<void>;

  comment: RefObject<HTMLInputElement | null>;
}

export default function SaveUI({ handleSubmitComment, comment }: SaveUIProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitComment();
  };
  return (
    <div className="w-[70%] bg-[#303035] rounded-lg flex flex-col justify-center items-center borer border-white">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-row justify-center items-center px-2 gap-2"
      >
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          ref={comment}
          className="rounded-sm w-[80%]"
        ></input>
        <button
          type="submit"
          className="max-w-fit px-2 text-white cursor-pointer border border-slate-600 rounded hover:bg-slate-600"
          disabled={!comment}
        >
          작성
        </button>
      </form>
    </div>
  );
}
