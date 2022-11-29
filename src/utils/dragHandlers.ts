import { arrayMove } from "@dnd-kit/sortable";
import { removeAtIndex, insertAtIndex } from "./array";

export const handleDragStart = (
  { active }: any,
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>
) => setActiveId(active.id);

export const handleDragCancel = (
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>
) => setActiveId(null);

export const handleDragOver = (
  { active, over }: any,
  setColumns: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
) => {
  const overId = over?.id;

  if (!overId) {
    return;
  }

  const activeContainer = active.data.current.sortable.containerId;
  const overContainer = over.data.current?.sortable.containerId || over.id;

  if (activeContainer !== overContainer) {
    setColumns((columns) => {
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in columns
          ? columns[overContainer].length + 1
          : over.data.current.sortable.index;

      return moveBetweenContainers(
        columns,
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        active.id
      );
    });
  }
};

export const handleDragEnd = (
  { active, over }: any,
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>,
  columns: Record<string, string[]>,
  setColumns: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
) => {
  if (!over) {
    setActiveId(null);
    return;
  }

  if (active.id !== over.id) {
    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    const activeIndex = active.data.current.sortable.index;
    const overIndex =
      over.id in columns
        ? columns[overContainer].length + 1
        : over.data.current.sortable.index;

    setColumns((columns) => {
      let newColumns;
      if (activeContainer === overContainer) {
        newColumns = {
          ...columns,
          [overContainer]: arrayMove(
            columns[overContainer],
            activeIndex,
            overIndex
          ),
        };
      } else {
        newColumns = moveBetweenContainers(
          columns,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      }

      return newColumns;
    });
  }

  setActiveId(null);
};
export const moveBetweenContainers = (
  items: Record<string, string[]>,
  activeContainer: string,
  activeIndex: number,
  overContainer: string,
  overIndex: number,
  item: string
) => {
  return {
    ...items,
    [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
    [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
  };
};
