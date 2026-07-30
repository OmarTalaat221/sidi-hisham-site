import styles from "./StyledBackground.module.css";

const StyledBackground = ({
  wave = false,
  children,
  style,
  className = "",
  color,
  variant = "default",
  motion = "soft",
}) => {
  const wrapperClasses = [
    styles.styledBackground,
    className,
    color === "white" ? styles.white : "",
    variant === "footer" ? styles.footer : "",
    motion === "none" ? styles.motionNone : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div style={style} className={wrapperClasses}>
      {wave && (
        <div className={styles.wave} aria-hidden="true">
          <svg
            className={styles.waves}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
            focusable="false"
          >
            <defs>
              <path
                id="sedi-hisham-gentle-wave"
                d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
              />
            </defs>

            <g className={styles.parallax}>
              <use
                xlinkHref="#sedi-hisham-gentle-wave"
                x={48}
                y={0}
                className={`${styles.waveLayer} ${styles.waveLayerOne}`}
              />
              <use
                xlinkHref="#sedi-hisham-gentle-wave"
                x={48}
                y={2}
                className={`${styles.waveLayer} ${styles.waveLayerTwo}`}
              />
              <use
                xlinkHref="#sedi-hisham-gentle-wave"
                x={48}
                y={4}
                className={`${styles.waveLayer} ${styles.waveLayerThree}`}
              />
            </g>
          </svg>
        </div>
      )}

      {children}
    </div>
  );
};

export default StyledBackground;
