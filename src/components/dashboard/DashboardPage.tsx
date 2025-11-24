import ConversionRateChart from "../charts/ConversionRateChart";
import { normalizeData } from "../../utils/normalizeData";
import rawData from "../../data/data.json";
import PeriodSelector from "../selectors/PeriodSelector";
import VariationSelector from "../selectors/VariationSelector";
import { useState } from "react";
import styles from "./DashboardPage.module.css";

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

  const [period, setPeriod] = useState<"day" | "week">("day");

  // Variation selector — по умолчанию все выбраны
  const allVariationsIds = variationsWithColors.map((v) => v.id);
  const [selectedVariations, setSelectedVariations] =
    useState<string[]>(allVariationsIds);

  // Фильтруем выбранные варианты
  const filteredVariations = variationsWithColors.filter((v) =>
    selectedVariations.includes(v.id)
  );

  return (
    <div>
      <div className={styles.selectorWrapper}>
        <VariationSelector
          variations={normalized.variations}
          selected={selectedVariations}
          onChange={setSelectedVariations}
        />
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>
      <ConversionRateChart variations={filteredVariations} />
    </div>
  );
};

export default DashboardPage;
