import { startOfWeek } from "date-fns";
import type { VariationData, DataPoint } from "../types/types";

type WeekBucket = {
  visits: number;
  conversions: number;
  startDate: Date; // храним понедельник сразу
};

function getMonday(date: Date): Date {
  return startOfWeek(date, { weekStartsOn: 1 }); // 1 = понедельник
}

export function aggregateVariationByWeek<T extends VariationData>(
  variation: T
): T {
  const buckets: Record<string, WeekBucket> = {};

  variation.points.forEach((p) => {
    const monday = getMonday(p.date);

    const key = `${monday.getFullYear()}-W${Math.ceil(
      ((monday.getTime() - new Date(monday.getFullYear(), 0, 1).getTime()) /
        86400000 +
        new Date(monday.getFullYear(), 0, 1).getDay() +
        1) /
        7
    )}`;

    if (!buckets[key]) {
      buckets[key] = {
        visits: 0,
        conversions: 0,
        startDate: monday,
      };
    }

    buckets[key].visits += p.visits;
    buckets[key].conversions += p.conversions;
  });

  const aggregatedPoints: DataPoint[] = Object.values(buckets).map((bucket) => {
    const visits = bucket.visits;
    const conversions = bucket.conversions;
    const conversionRate = visits > 0 ? (conversions / visits) * 100 : 0;

    return {
      date: bucket.startDate, // всегда понедельник!
      visits,
      conversions,
      conversionRate,
    };
  });

  // Сортируем по дате
  aggregatedPoints.sort((a, b) => a.date.getTime() - b.date.getTime());

  return {
    ...variation,
    points: aggregatedPoints,
  };
}

export function aggregateAllVariationsByWeek<T extends VariationData>(
  variations: T[]
): T[] {
  return variations.map(aggregateVariationByWeek);
}
