import ConversionRateChart from "../charts/ConversionRateChart";
import { normalizeData } from "../../utils/normalizeData";
import rawData from "../../data/data.json";

const DashboardPage = () => {
  const normalized = normalizeData(rawData);
  console.log(normalized);

  const original = normalized.variations.find((v) => v.id === "0");

  return (
    <div>
      <h2>Conversion Rate — Original</h2>
      <ConversionRateChart data={original?.points || []} />
    </div>
  );
};

export default DashboardPage;
