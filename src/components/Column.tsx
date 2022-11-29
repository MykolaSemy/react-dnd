import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { MdAdd } from "react-icons/md";
import { useState } from "react";
import { Task } from "./Task";
interface ColumnProps {
  id: string;
  tasks: string[];
  onAddTask: (groupId: string, item: string) => void;
  onDeleteTask: (groupId: string, item: string) => void;
  activeId: string | null;
}
const Column: React.FC<ColumnProps> = ({
  id,
  tasks,
  onAddTask,
  onDeleteTask,
}) => {
  const [inputValue, setInputValue] = useState("");

  const { setNodeRef } = useDroppable({ id });
  const isValid: boolean = !tasks.includes(inputValue) && !!inputValue;

  const handleAddTask = () => {
    if (isValid) {
      onAddTask(id, inputValue);
      setInputValue("");
    }
  };

  return (
    <SortableContext id={id} items={tasks} strategy={rectSortingStrategy}>
      <div className="column" ref={setNodeRef}>
        <h1 className="column-title">{id}</h1>
        <div className="py-5">
          {!tasks.length && (
            <h1 className="opacity-40 text-center">No tasks here :(</h1>
          )}
          {tasks.map((item) => (
            <Task
              key={item}
              id={item}
              columnId={id}
              onDeleteTask={onDeleteTask}
            />
          ))}
          <div className="add-task-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="column-input"
              placeholder="Enter new task..."
            />
            <button
              disabled={!isValid}
              onClick={handleAddTask}
              className="column-add-task-button"
            >
              <MdAdd />
            </button>
          </div>
        </div>
      </div>
    </SortableContext>
  );
};

export default Column;
