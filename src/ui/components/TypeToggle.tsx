import type { ItemType } from "../../types";

export function TypeToggle(props: { value: ItemType; onChange: (v: ItemType) => void }) {
  const { value, onChange } = props;
  return (
    <div className="row" style={{ gap: 6 }}>
      <span className="small">todo</span>
      <button
        className="btn"
        style={{ padding: "6px 10px", borderRadius: 999 }}
        onClick={() => onChange(value === "todo" ? "note" : "todo")}
        title="Toggle todo/note"
      >
        {value === "todo" ? "✓" : "—"}
      </button>
      <span className="small">note</span>
    </div>
  );
}