import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
// import styles from "./ConversionRateChart.module.css";

interface Point {
  date: Date;
  conversionRate: number;
}

interface VariationForChart {
  id: string;
  name: string;
  color: string;
  points: Point[];
}

interface Props {
  variations: VariationForChart[];
}

const ConversionRateChart = ({ variations }: Props) => {
  //1. Берём длину по первой вариации (все имеют одинаковые даты)
  const pointsCount = variations[0]?.points.length ?? 0;

  // 2. Собираем общий массив данных для графика
  const chartData = Array.from({ length: pointsCount }).map((_, index) => {
    const date = variations[0].points[index].date;

    const base: any = {
      label: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };

    variations.forEach((v) => {
      base[v.id] = v.points[index].conversionRate;
    });

    return base;
  });

  console.log(chartData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" interval={2} />
        {/* Y ось в процентах */}
        <YAxis tickFormatter={(value) => `${value.toFixed(0)}%`} />
        {/* Tooltip в процентах */}
        <Tooltip
          formatter={(value) => `${Number(value).toFixed(2)}%`}
          labelFormatter={(label) => `Date: ${label}`}
          cursor={{ strokeDasharray: "3 3" }}
        />
        <Legend />
        {variations.map((v) => (
          <Line
            key={v.id}
            type="monotone"
            dataKey={v.id}
            name={v.name}
            stroke={v.color}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ConversionRateChart;
