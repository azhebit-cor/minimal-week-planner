import type { AppData } from "./types";

export type ContainerId = string;

export function isContainerId(id: string): boolean {
  return id === "inbox" || id.startsWith("day:");
}

export function parseDayFromContainerId(containerId: ContainerId): string | null {
  if (!containerId.startsWith("day:")) return null;
  return containerId.slice("day:".length);
}

export function getContainerIdForItemGlobal(itemId: string, data: AppData): ContainerId | null {
  if (data.inbox.some((i) => i.id === itemId)) return "inbox";

  for (const week of Object.values(data.weeks)) {
    for (const [dateISO, items] of Object.entries(week.days)) {
      if (items.some((i) => i.id === itemId)) return `day:${dateISO}`;
    }
  }
  return null;
}
