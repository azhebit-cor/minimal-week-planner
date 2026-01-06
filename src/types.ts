export type ItemType = "todo" | "note";

export type Item = {
  id: string;
  type: ItemType;
  text: string;
  completed?: boolean; // only for todo
  createdAt: number;   // ms epoch
};

export type WeekKey = string; // YYYY-MM-DD (Monday date)

export type WeekData = {
  days: Record<string, Item[]>; // date (YYYY-MM-DD) -> items
  notesText: string;
};

export type AppData = {
  inbox: Item[];
  weeks: Record<WeekKey, WeekData>;
};

export type Screen = "week" | "month";