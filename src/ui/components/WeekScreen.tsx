import React from "react";
import { TypeToggle } from "./TypeToggle";
import type { Item, ItemType, WeekData, WeekKey } from "../../types";
import { formatDayLabel, formatWeekTitle, weekDates } from "../../date";
import { DayColumn } from "./DayColumn";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

export function WeekScreen(props: {
  weekKey: WeekKey;
  week: WeekData;
  inbox: Item[];
  onPrevWeek: () => void;
  onNextWeek: () => void;
  
  onAddToDay: (dateISO: string, type: ItemType, text: string) => void;
  onAddToInbox: (type: ItemType, text: string) => void;
  
  onToggleComplete: (id: string) => void;
  onNotesChange: (text: string) => void;

  // Shared DnD renderers
  renderDraggableList: (items: Item[], containerId: string) => React.ReactNode;
  renderItem: (item: Item) => React.ReactNode;
}) {
  const [inboxText, setInboxText] = React.useState("");
  const [inboxType, setInboxType] = React.useState<ItemType>("todo");

  function submitInbox() {
    const t = inboxText.trim();
    if (!t) return;
    props.onAddToInbox(inboxType, t);
    setInboxText("");
    setInboxType("todo");
  }

  const {
    weekKey,
    week,
    inbox,
    onPrevWeek,
    onNextWeek,
    onAddToDay,
    onToggleComplete,
    onNotesChange,
    renderDraggableList,
    renderItem
  } = props;

  const dates = weekDates(weekKey);

  // Sidebar Inbox droppable (so you can drag day -> inbox too, if you want)
  const inboxDrop = useDroppable({ id: "inbox" });

  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <div style={{ fontWeight: 600 }}>Week</div>
          <div className="small">{formatWeekTitle(weekKey)}</div>
        </div>
        <div className="row">
          <button className="btn" onClick={onPrevWeek}>← Prev</button>
          <button className="btn" onClick={onNextWeek}>Next →</button>
        </div>
      </div>

      <div className="gridWeek">
        {/* Sidebar */}
        <div className="card sidebar" ref={inboxDrop.setNodeRef}>
          <div className="sidebarHeader">
            <div style={{ fontWeight: 600 }}>Inbox</div>
            <div className="small">{inbox.length}</div>
          </div>
          <div className="small" style={{ marginBottom: 8 }}>
            Drag items from here into any day.
          </div>
          <div className="inlineAdd" style={{ marginBottom: 10 }}>
            <TypeToggle value={inboxType} onChange={setInboxType} />
            <input
              className="input"
              placeholder={inboxType === "todo" ? "Add a todo…" : "Add a note…"}
              value={inboxText}
              onChange={(e) => setInboxText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitInbox();
              }}
            />
            <button className="btn" onClick={submitInbox}>Add</button>
          </div>
          <div>
            <SortableContext items={inbox.map((i) => i.id)} strategy={verticalListSortingStrategy}>
              {renderDraggableList(inbox, "inbox")}
            </SortableContext>
          </div>

          {inbox.length === 0 && <div className="small">Empty.</div>}

          <hr className="hr" />

          <div className="small">
            You can create items in Inbox (Inbox tab), then schedule them here by drag & drop.
          </div>

          {/* ensure toggle handler is referenced (ItemRow uses it via renderItem) */}
          <div style={{ display: "none" }}>{onToggleComplete}</div>
        </div>

        {/* Main 2x4 grid */}
        <div className="weekMain">
          {dates.map((dateISO) => (
            <DayColumn
              key={dateISO}
              title={formatDayLabel(dateISO)}
              dateISO={dateISO}
              containerId={`day:${dateISO}`}
              items={week.days[dateISO] ?? []}
              onAdd={onAddToDay}
              renderItem={renderItem}
            />
          ))}

          {/* Notes cell */}
          <div className="card dayCol notesBox" style={{ gridColumn: "span 1" }}>
            <div className="dayHeader">
              <div className="dayTitle">Notes</div>
              <div className="small">{weekKey}</div>
            </div>
            <textarea
              value={week.notesText}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="Week notes…"
            />
            <div className="small">
              Stored per week (key = Monday date).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
