import type { AppData, WeekData, WeekKey } from "./types";
import { weekDates } from "./date";

const STORAGE_KEY = "minimal-week-planner:v1";

export function makeEmptyWeek(weekKey: WeekKey): WeekData {
  const dates = weekDates(weekKey);
  const days: Record<string, any[]> = {};
  for (const d of dates) days[d] = [];
  return { days, notesText: "" };
}

export function loadAppData(initialWeekKey: WeekKey): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const empty: AppData = { inbox: [], weeks: { [initialWeekKey]: makeEmptyWeek(initialWeekKey) } };
      return empty;
    }
    const parsed = JSON.parse(raw) as AppData;
    if (!parsed.weeks[initialWeekKey]) parsed.weeks[initialWeekKey] = makeEmptyWeek(initialWeekKey);
    if (!Array.isArray(parsed.inbox)) parsed.inbox = [];
    if (!parsed.weeks) parsed.weeks = { [initialWeekKey]: makeEmptyWeek(initialWeekKey) };
    return parsed;
  } catch {
    const empty: AppData = { inbox: [], weeks: { [initialWeekKey]: makeEmptyWeek(initialWeekKey) } };
    return empty;
  }
}

export function saveAppData(data: AppData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}