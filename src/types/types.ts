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

export type VariationWithColor = VariationData & {
  color: string;
};

// Типы для сырых данных
type RawEntry = {
  date: string;
  visits: Record<string, number | undefined>;
  conversions: Record<string, number | undefined>;
};

type RawVariation = {
  id?: number;
  name: string;
};

export type RawData = {
  variations: RawVariation[];
  data: RawEntry[];
};
