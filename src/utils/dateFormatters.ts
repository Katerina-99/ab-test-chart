import { format } from "date-fns";

export function formatAxisDate(date: Date, mode: "day" | "week") {
  if (mode === "day") return format(date, "dd MMM");

  const start = date;
  const end = new Date(start);

  end.setDate(end.getDate() + 6);

  return `${format(start, "dd MMM")} - ${format(end, "dd MMM")}`;
}

export function formatTooltipDate(date: Date, mode: "day" | "week") {
  if (mode === "day") return format(date, "dd MMM yyyy");

  const start = date;
  const end = new Date(start);

  end.setDate(end.getDate() + 6);

  return `${format(start, "dd MMM yyyy")} - ${format(end, "dd MMM yyyy")}`;
}
