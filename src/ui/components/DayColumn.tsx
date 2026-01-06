import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Item, ItemType } from "../../types";
import { TypeToggle } from "./TypeToggle";

export function DayColumn(props: {
  title: string;
  dateISO: string; // for day columns; for notes, dateISO can be ""
  containerId: string;
  items: Item[];
  onAdd: (dateISO: string, type: ItemType, text: string) => void;
  renderItem: (item: Item) => React.ReactNode;
}) {
  const { title, dateISO, containerId, items, onAdd, renderItem } = props;

  const droppable = useDroppable({ id: containerId });

  const [text, setText] = React.useState("");
  const [type, setType] = React.useState<ItemType>("todo");

  function submit() {
    const t = text.trim();
    if (!t) return;
    onAdd(dateISO, type, t);
    setText("");
    setType("todo");
  }

  return (
    <div className="card dayCol" ref={droppable.setNodeRef}>
      <div className="dayHeader">
        <div className="dayTitle">{title}</div>
        <div className="small">{items.length}</div>
      </div>

      <div className="list">
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((it) => (
            <React.Fragment key={it.id}>{renderItem(it)}</React.Fragment>
          ))}
        </SortableContext>
      </div>

      <div className="inlineAdd">
        <TypeToggle value={type} onChange={setType} />
        <input
          className="input"
          placeholder={type === "todo" ? "Add todo…" : "Add note…"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
        />
        <button className="btn" onClick={submit}>
          +
        </button>
      </div>

      {droppable.isOver && (
        <div className="small" style={{ marginTop: 6 }}>
          Drop to move here.
        </div>
      )}
    </div>
  );
}
