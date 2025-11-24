import { useState } from "react";
import styles from "./PeriodSelector.module.css";

type Period = "day" | "week";

interface Props {
  value: Period;
  onChange: (p: Period) => void;
}

const PeriodSelector = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  const label = value === "day" ? "Day" : "Week";

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
          <div
            className={styles.option}
            onClick={() => {
              onChange("day");
              setOpen(false);
            }}
          >
            Day
          </div>

          <div
            className={styles.option}
            onClick={() => {
              onChange("week");
              setOpen(false);
            }}
          >
            Week
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodSelector;
