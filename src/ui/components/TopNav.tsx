import type { Screen } from "../../types";

export function TopNav(props: {
  screen: Screen;
  onChange: (s: Screen) => void;
  right?: React.ReactNode;
}) {
  const { screen, onChange, right } = props;

  return (
    <div className="topbar">
      <div className="brand">Minimal Planner</div>
      <div className="row" style={{ justifyContent: "flex-end", flex: 1 }}>
        <div className="nav">
          <button className={screen === "week" ? "active" : ""} onClick={() => onChange("week")}>
            Week
          </button>
          <button className={screen === "month" ? "active" : ""} onClick={() => onChange("month")}>
            Month
          </button>
        </div>
        {right}
      </div>
    </div>
  );
}