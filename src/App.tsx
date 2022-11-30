import { useState, useEffect } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Column from "./components/Column";
import Item from "./components/Item";
import { columnsData } from "./services/columnsData";
import {
  handleDragCancel,
  handleDragEnd,
  handleDragOver,
  handleDragStart,
} from "./utils/dragHandlers";
import { useAllSensors } from "./hooks/useAllSensors";

const App = () => {
  const [columns, setColumns] = useState<Record<string, string[]>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setColumns(columnsData);
  }, []);

  const sensors = useAllSensors();

  const handleAddTask = (columnId: string, task: string) => {
    setColumns({
      ...columns,
      [columnId]: [...columns[columnId], task],
    });
  };
  const handleDeleteTask = (columnId: string, deleteTask: string) => {
    setColumns({
      ...columns,
      [columnId]: columns[columnId].filter((task) => task !== deleteTask),
    });
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
