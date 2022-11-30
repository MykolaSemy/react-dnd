import { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from "./components/Column";
import Item from "./components/Item";
import { columnsData } from "./services/columnsData";
import {
  handleDragCancel,
  handleDragEnd,
  handleDragOver,
  handleDragStart,
} from "./utils/dragHandlers";

const App = () => {
  const [columns, setColumns] = useState<Record<string, string[]>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setColumns(columnsData);
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddTask = (columnId: string, task: string) => {
    const newColumns = {
      ...columns,
      [columnId]: [...columns[columnId], task],
    };
    setColumns(newColumns);
  };
  const handleDeleteTask = (columnId: string, deleteTask: string) => {
    const newColumns = {
      ...columns,
      [columnId]: columns[columnId].filter((task) => task !== deleteTask),
    };
    setColumns(newColumns);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => handleDragStart(e, setActiveId)}
      onDragCancel={() => handleDragCancel(setActiveId)}
      onDragOver={(e) => handleDragOver(e, setColumns)}
      onDragEnd={(e) => handleDragEnd(e, setActiveId, columns, setColumns)}
    >
      <div className="app">
        <div className="my-16 justify-center items-start flex">
          {Object.keys(columns).map((column) => (
            <Column
              onDeleteTask={handleDeleteTask}
              onAddTask={handleAddTask}
              id={column}
              tasks={columns[column]}
              activeId={activeId}
              key={column}
            />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeId ? <Item id={activeId} dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default App;
