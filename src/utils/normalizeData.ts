import type { VariationData, DataPoint, RawData } from "../types/types";

export function normalizeData(raw: RawData): { variations: VariationData[] } {
  const variations: VariationData[] = raw.variations.map((v) => ({
    id: v.id ? String(v.id) : "0",
    name: v.name,
    points: [] as DataPoint[],
  }));

  raw.data.forEach((entry) => {
    const date = new Date(entry.date);

    variations.forEach((variation) => {
      const id = variation.id;

      const visits = Number(entry.visits[id] ?? 0);
      const conversions = Number(entry.conversions[id] ?? 0);

      const conversionRate = visits > 0 ? (conversions / visits) * 100 : 0;

      variation.points.push({
        date,
        visits,
        conversions,
        conversionRate,
      });
    });
  });
  return { variations };
}
