import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import type { Item } from "../../types";

export function ItemRow(props: {
  item: Item;
  onToggleComplete?: (id: string) => void;
}) {
  const { item, onToggleComplete } = props;

  const sortable = useSortable({ id: item.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
    opacity: sortable.isDragging ? 0.65 : 1
  };

  const isTodo = item.type === "todo";
  const completed = !!item.completed;

  return (
    <div
      ref={sortable.setNodeRef}
      style={style}
      className="itemRow"
      {...sortable.attributes}
      data-id={item.id}
    >
      <div>
        {isTodo ? (
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleComplete?.(item.id)}
            aria-label="Complete"
          />
        ) : (
          <span className="small"> </span>
        )}
      </div>

      <div className={"itemText" + (completed ? " completed" : "")}>{item.text || <span className="small">(empty)</span>}</div>

      <svg
        className="grip"
        viewBox="0 0 24 24"
        {...sortable.listeners}
        aria-label="Drag"
        role="img"
      >
        <path
          fill="currentColor"
          d="M9 5h2v2H9V5zm4 0h2v2h-2V5zM9 9h2v2H9V9zm4 0h2v2h-2V9zM9 13h2v2H9v-2zm4 0h2v2h-2v-2zM9 17h2v2H9v-2zm4 0h2v2h-2v-2z"
        />
      </svg>
    </div>
  );
}