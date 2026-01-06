import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { AppData, Item } from "../../types";
import { toISODate } from "../../date";

function startOfMonth(date: Date) {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, n: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function calendarGridForMonth(monthDate: Date): { date: Date; inMonth: boolean }[] {
  const first = startOfMonth(monthDate);
  const month = first.getMonth();

  const day = first.getDay(); // 0 Sun..6 Sat
  const diff = (day === 0 ? -6 : 1) - day; // back to Monday
  const gridStart = addDays(first, diff);

  const cells: { date: Date; inMonth: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = addDays(gridStart, i);
    cells.push({ date: d, inMonth: d.getMonth() === month });
  }
  return cells;
}

function monthTitle(d: Date) {
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

// Find items for a specific day across stored weeks
function itemsForDay(data: AppData, dayISO: string): Item[] {
  for (const week of Object.values(data.weeks)) {
    const items = week.days[dayISO];
    if (items) return items;
  }
  return [];
}

export function MonthScreen(props: {
  data: AppData;
  renderItem: (item: Item) => React.ReactNode;
  onPickDay: (dayISO: string) => void; // jump to Week view if desired
}) {
  const { data, renderItem, onPickDay } = props;

  const [cursor, setCursor] = React.useState(() => new Date());
  const grid = calendarGridForMonth(cursor);

  return (
    <div className="card" style={{ padding: 14 }}>
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <div style={{ fontWeight: 600 }}>Month</div>
          <div className="small">{monthTitle(cursor)}</div>
        </div>
        <div className="row">
          <button className="btn" onClick={() => setCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}>
            ← Prev
          </button>
          <button className="btn" onClick={() => setCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}>
            Next →
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(160px, 1fr))",
          gap: 10
        }}
      >
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="small" style={{ padding: "0 6px" }}>
            {d}
          </div>
        ))}

        {grid.map((cell, idx) => {
          const iso = toISODate(cell.date);
          const items = itemsForDay(data, iso);
          return (
            <MonthDayCell
              key={idx}
              iso={iso}
              dayNumber={cell.date.getDate()}
              inMonth={cell.inMonth}
              items={items}
              renderItem={renderItem}
              onPickDay={onPickDay}
            />
          );
        })}
      </div>
    </div>
  );
}

function MonthDayCell(props: {
  iso: string;
  dayNumber: number;
  inMonth: boolean;
  items: Item[];
  renderItem: (item: Item) => React.ReactNode;
  onPickDay: (dayISO: string) => void;
}) {
  const { iso, dayNumber, inMonth, items, renderItem, onPickDay } = props;
  const containerId = `day:${iso}`;
  const drop = useDroppable({ id: containerId });

  return (
    <div
      ref={drop.setNodeRef}
      className="card"
      style={{
        padding: 10,
        minHeight: 140,
        background: "#fff",
        opacity: inMonth ? 1 : 0.45,
        borderColor: inMonth ? "var(--border)" : "rgba(230,230,230,0.6)",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}
    >
      <div className="row" style={{ justifyContent: "space-between" }}>
        <button className="btn" style={{ padding: "6px 10px" }} onClick={() => onPickDay(iso)} title="Open week">
          {dayNumber}
        </button>
        <div className="small">{items.length ? `${items.length}` : ""}</div>
      </div>

      <div style={{ overflow: "auto" }}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="list" data-container={containerId}>
            {items.map((it) => (
              <React.Fragment key={it.id}>{renderItem(it)}</React.Fragment>
            ))}
          </div>
        </SortableContext>
      </div>

      {drop.isOver && <div className="small">Drop to move here.</div>}
    </div>
  );
}
