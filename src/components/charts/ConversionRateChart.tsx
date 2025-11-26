import {
  CartesianGrid,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { formatAxisDate, formatTooltipDate } from "../../utils/dateFormatters";
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
  mode: "day" | "week";
  lineStyle: "line" | "smooth" | "area";
}

const ConversionRateChart = ({ variations, mode, lineStyle }: Props) => {
  //1. Берём длину по первой вариации (все имеют одинаковые даты)
  const pointsCount = variations[0]?.points.length ?? 0;

  // 2. Собираем общий массив данных для графика
  const chartData = Array.from({ length: pointsCount }).map((_, index) => {
    const date = variations[0].points[index].date;

    const base: any = { date };

    variations.forEach((v) => {
      base[v.id] = v.points[index].conversionRate;
    });

    return base;
  });

  console.log(chartData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => formatAxisDate(new Date(value), mode)}
          //   interval={2}
        />
        {/* Y ось в процентах */}
        <YAxis tickFormatter={(value) => `${value.toFixed(0)}%`} />
        {/* Tooltip в процентах */}
        <Tooltip
          formatter={(value) => `${Number(value).toFixed(2)}%`}
          labelFormatter={(value) => formatTooltipDate(new Date(value), mode)}
          contentStyle={{ textAlign: "left" }}
          //   cursor={{ strokeDasharray: "3 3" }}
        />
        <Legend
          align="right"
          verticalAlign="bottom"
          wrapperStyle={{ top: 300 }}
        />
        {variations.map((v) => {
          if (lineStyle === "area") {
            return (
              <Area
                key={v.id}
                type="monotone"
                dataKey={v.id}
                name={v.name}
                stroke={v.color}
                fill={v.color}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            );
          }

          return (
            <Line
              key={v.id}
              type={lineStyle === "smooth" ? "monotone" : "linear"}
              dataKey={v.id}
              name={v.name}
              stroke={v.color}
              strokeWidth={2}
              dot={false}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ConversionRateChart;
