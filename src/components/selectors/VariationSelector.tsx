import { useState } from "react";
import styles from "./VariationSelector.module.css";

export interface VariationItem {
  id: string;
  name: string;
}

interface Props {
  variations: VariationItem[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

const VariationSelector = ({ variations, selected, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  // Выбраны ли все
  const allSelected = selected.length === variations.length;

  const label = allSelected
    ? "All variations selected"
    : variations
        .filter((v) => selected.includes(v.id))
        .map((v) => v.name)
        .join(", ");

  const handleToggleVariation = (id: string) => {
    let next;

    if (selected.includes(id)) {
      // запрещаем снять последний вариант
      if (selected.length === 1) return;

      next = selected.filter((itemId) => itemId !== id);
    } else {
      next = [...selected, id];
    }

    onChange(next);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={toggle}>
        <span className={styles.label}>{label}</span>
        <svg
          className={`${styles.icon} ${open ? styles.open : ""}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
        </svg>
      </button>

      {open && (
        <div className={styles.dropdown}>
          {variations.map((v) => (
            <label key={v.id} className={styles.option}>
              <input
                type="checkbox"
                checked={selected.includes(v.id)}
                onChange={() => handleToggleVariation(v.id)}
              />
              {v.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default VariationSelector;
