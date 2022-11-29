import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BsFillTrashFill } from "react-icons/bs";
import Item from "./Item";
interface TaskProps {
  id: string;
  columnId: string;
  onDeleteTask: (groupId: string, item: string) => void;
}
export const Task: React.FC<TaskProps> = ({ id, onDeleteTask, columnId }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.1 : 1,
  };

  return (
    <div className="w-full flex items-center justify-between ">
      <div
        style={style}
        className="w-full"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <Item id={id} />
      </div>
      <div
        onClick={() => onDeleteTask(columnId, id)}
        className="bg-red-300 p-2 flex items-center justify-center rounded-full mx-2 cursor-pointer"
      >
        <BsFillTrashFill />
      </div>
    </div>
  );
};
