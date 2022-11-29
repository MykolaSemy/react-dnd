interface ItemProps {
  id: string;
  dragOverlay?: boolean;
}
const Item: React.FC<ItemProps> = ({ id, dragOverlay }) => {
  return (
    <div
      className={`${
        dragOverlay ? "cursor-grabbing " : "grab "
      }" bg-white shadow-lg px-5 py-1 my-2 rounded  h-14 w-full "`}
    >
      {id}
    </div>
  );
};
export default Item;
