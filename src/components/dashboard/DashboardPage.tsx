import { useState } from "react";
import rawData from "../../data/data.json";
import { normalizeData } from "../../utils/normalizeData";
import { aggregateAllVariationsByWeek } from "../../utils/aggregateByWeek";
import ConversionRateChart from "../charts/ConversionRateChart";
import PeriodSelector from "../selectors/PeriodSelector";
import VariationSelector from "../selectors/VariationSelector";
import styles from "./DashboardPage.module.css";
import type { VariationWithColor } from "../../types/types";

const DashboardPage = () => {
  const normalized = normalizeData(rawData);
  console.log(normalized);

  const colors = ["#46464f", "#4142ef", "#ff8346", "#35bdad"];

  const variationsWithColors: VariationWithColor[] = normalized.variations.map(
    (v, index) => ({
      id: v.id,
      name: v.name,
      color: colors[index % colors.length],
      points: v.points,
    })
  );

  const [period, setPeriod] = useState<"day" | "week">("day");

  // Variation selector — по умолчанию все выбраны
  const allVariationsIds = variationsWithColors.map((v) => v.id);
  const [selectedVariations, setSelectedVariations] =
    useState<string[]>(allVariationsIds);

  // Фильтруем выбранные варианты
  const filteredVariations = variationsWithColors.filter((v) =>
    selectedVariations.includes(v.id)
  );

  const finalVariations =
    period === "week"
      ? aggregateAllVariationsByWeek(filteredVariations)
      : filteredVariations;

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
      <ConversionRateChart variations={finalVariations} />
    </div>
  );
};

export default DashboardPage;
