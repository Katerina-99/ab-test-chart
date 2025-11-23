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
import styles from "./ConversionRateChart.module.css";

interface Point {
  date: Date;
  conversionRate: number;
}

interface Props {
  data: Point[];
}
const ConversionRateChart = ({ data }: Props) => {
  const formattedData = data.map((point) => ({
    ...point,
    label: point.date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  console.log(formattedData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />

        {/* Y ось в процентах */}
        <YAxis tickFormatter={(value) => `${value.toFixed(0)}%`} />

        {/* Tooltip в процентах */}
        <Tooltip
          formatter={(value) => `${Number(value).toFixed(2)}%`}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="conversionRate"
          stroke="var(--chart-color-1)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ConversionRateChart;
