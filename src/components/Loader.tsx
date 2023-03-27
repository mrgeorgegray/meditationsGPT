import React from "react";

function Loader(props: React.CSSProperties) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      display="block"
      style={{ margin: "auto", background: "0 0", ...props }}
    >
      <circle
        cx="50"
        cy="50"
        r="0"
        fill="none"
        stroke="#080808"
        strokeWidth="2"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.5873015873015872s"
          values="0;40"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="0s"
        />
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1.5873015873015872s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="0s"
        />
      </circle>
      <circle
        cx="50"
        cy="50"
        r="0"
        fill="none"
        stroke="#898989"
        strokeWidth="2"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.5873015873015872s"
          values="0;40"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="-0.7936507936507936s"
        />
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1.5873015873015872s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="-0.7936507936507936s"
        />
      </circle>
    </svg>
  );
}

export default React.memo(Loader);
