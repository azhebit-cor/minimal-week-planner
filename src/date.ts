import type { WeekKey } from "./types";

export function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${y}-${m}-${day}`;
}

// Monday as start of week.
export function startOfWeekMonday(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0 Sun .. 6 Sat
  const diff = (day === 0 ? -6 : 1) - day; // shift to Monday
  d.setDate(d.getDate() + diff);
  return d;
}

export function addDays(date: Date, deltaDays: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + deltaDays);
  return d;
}

export function weekKeyFromDate(date: Date): WeekKey {
  return toISODate(startOfWeekMonday(date));
}

export function weekDates(weekKey: WeekKey): string[] {
  // weekKey is Monday
  const monday = new Date(weekKey + "T00:00:00");
  const res: string[] = [];
  for (let i = 0; i < 7; i++) res.push(toISODate(addDays(monday, i)));
  return res;
}

export function formatDayLabel(dateISO: string): string {
  const d = new Date(dateISO + "T00:00:00");
  const weekday = d.toLocaleDateString(undefined, { weekday: "short" });
  const month = d.toLocaleDateString(undefined, { month: "short" });
  const day = d.getDate();
  return `${weekday} · ${month} ${day}`;
}

export function formatWeekTitle(weekKey: WeekKey): string {
  const monday = new Date(weekKey + "T00:00:00");
  const sunday = addDays(monday, 6);

  const left = monday.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const right = sunday.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const year = monday.getFullYear();

  return `${left} – ${right}, ${year}`;
}