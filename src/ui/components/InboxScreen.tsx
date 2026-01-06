import type { Item, ItemType } from "../../types";
import { TypeToggle } from "./TypeToggle";

export function InboxScreen(props: {
  inbox: Item[];
  onAdd: (type: ItemType, text: string) => void;
  onToggleComplete: (id: string) => void;
  renderDraggableList: (items: Item[], containerId: string) => React.ReactNode;
}) {
  const { inbox, onAdd, onToggleComplete, renderDraggableList } = props;

  const [text, setText] = React.useState("");
  const [type, setType] = React.useState<ItemType>("todo");

  function submit() {
    const t = text.trim();
    if (!t) return;
    onAdd(type, t);
    setText("");
    setType("todo");
  }

  return (
    <div className="card" style={{ padding: 14 }}>
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <div style={{ fontWeight: 600 }}>Inbox</div>
          <div className="small">Quick capture. Drag items to Week (from the Week screen sidebar).</div>
        </div>
      </div>

      <div className="row" style={{ marginBottom: 10 }}>
        <TypeToggle value={type} onChange={setType} />
        <input
          className="input"
          placeholder={type === "todo" ? "Add a todo…" : "Add a note…"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
        />
        <button className="btn" onClick={submit}>Add</button>
      </div>

      <hr className="hr" />

      {/* DnD list (sortable in Inbox; moving to Week happens on Week screen sidebar) */}
      <div>{renderDraggableList(inbox, "inbox")}</div>

      {inbox.length === 0 && <div className="small">No items yet.</div>}

      <div style={{ marginTop: 10 }} className="small">
        Tip: todos can be completed in Inbox too (checkbox). Completed items remain visible.
      </div>
    </div>
  );
}

import React from "react";
