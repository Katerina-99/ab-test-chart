import rawData from "../data/data.json";

export type DataPoint = {
  date: Date;
  visits: number;
  conversions: number;
  conversionRate: number;
};

export type VariationData = {
  id: string;
  name: string;
  points: DataPoint[];
};

// Типы для сырых данных
type RawEntry = {
  date: string;
  visits: Record<string, number>;
  conversions: Record<string, number>;
};

type RawVariation = {
  id?: number;
  name: string;
};

type RawData = {
  variations: RawVariation[];
  data: RawEntry[];
};

export function normalizeData(): VariationData[] {
  const raw = rawData as RawData;

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
  return variations;
}
