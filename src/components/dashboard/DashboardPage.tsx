import ConversionRateChart from "../charts/ConversionRateChart";
import { normalizeData } from "../../utils/normalizeData";
import rawData from "../../data/data.json";

const DashboardPage = () => {
  const normalized = normalizeData(rawData);
  console.log(normalized);

  const colors = ["#46464f", "#4142ef", "#ff8346", "#35bdad"];

  const variationsWithColors = normalized.variations.map((v, index) => ({
    id: v.id,
    name: v.name,
    color: colors[index % colors.length],
    points: v.points,
  }));

  return (
    <div>
      <h2>Conversion Rate — Original</h2>
      <ConversionRateChart variations={variationsWithColors} />
    </div>
  );
};

export default DashboardPage;
