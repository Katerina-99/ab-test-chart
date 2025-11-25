import type { VariationData, DataPoint } from "../types/types";

type WeekBucket = {
  visits: number;
  conversions: number;
  dates: Date[];
};

function getWeekKey(date: Date): string {
  const temp = new Date(date);
  temp.setHours(0, 0, 0, 0);

  const day = temp.getDay();
  const diff = temp.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(temp.setDate(diff));

  const year = monday.getFullYear();

  const oneJan = new Date(monday.getFullYear(), 0, 1);
  const number = Math.ceil(
    ((monday.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7
  );

  return `${year}-W${number}`;
}

export function aggregateVariationByWeek<T extends VariationData>(
  variation: T
): T {
  const buckets: Record<string, WeekBucket> = {};

  variation.points.forEach((p) => {
    const key = getWeekKey(p.date);

    if (!buckets[key]) {
      buckets[key] = { visits: 0, conversions: 0, dates: [] };
    }

    buckets[key].visits += p.visits;
    buckets[key].conversions += p.conversions;
    buckets[key].dates.push(p.date);
  });

  const aggregatedPoints: DataPoint[] = Object.values(buckets).map((bucket) => {
    const visits = bucket.visits;
    const conversions = bucket.conversions;
    const conversionRate = visits > 0 ? (conversions / visits) * 100 : 0;

    // Берём первую дату недели как метку
    const firstDate = bucket.dates.sort((a, b) => a.getTime() - b.getTime())[0];

    return {
      date: firstDate,
      visits,
      conversions,
      conversionRate,
    };
  });

  aggregatedPoints.sort((a, b) => a.date.getTime() - b.date.getTime());
  console.log(aggregatedPoints);

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
