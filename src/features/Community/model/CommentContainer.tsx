import useList from "./useList";
import useSave from "./useSave";
import ListUI from "../ui/listUI";
import SaveUI from "../ui/saveUI";

export default function CommentContainer() {
  const { list, setList, handleLike } = useList();
  const { handleSubmitComment, comment } = useSave({ list, setList });

  return (
    <div>
      <ListUI list={list} handleLike={handleLike} />
      <SaveUI handleSubmitComment={handleSubmitComment} comment={comment} />
    </div>
  );
}
