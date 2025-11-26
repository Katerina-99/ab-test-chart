import { useState } from "react";
import styles from "./LineStyleSelector.module.css";

type LineStyle = "line" | "smooth" | "area";

interface Props {
  value: LineStyle;
  onChange: (p: LineStyle) => void;
}

const LineStyleSelector = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  const labelMap = {
    line: "Line",
    smooth: "Smooth",
    area: "Area",
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={toggle}>
        <span className={styles.label}>Line style: {labelMap[value]}</span>
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
          {(["line", "smooth", "area"] as LineStyle[]).map((style) => (
            <div
              key={style}
              className={styles.option}
              onClick={() => {
                onChange(style);
                setOpen(false);
              }}
            >
              {labelMap[style]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LineStyleSelector;
