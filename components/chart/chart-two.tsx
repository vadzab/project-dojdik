import _ from "lodash";
import React, { useState, useEffect, ReactElement } from "react";
type DataType = {
  price: number;
  v1: number;
  v2: number;
  v3: number;
  v4: number;
  v5: number;
};
const generateData = (): DataType[] => {
  const dataLength = Math.floor(Math.random() * 6) + 10; // 10 to 15 items

  return Array.from({ length: dataLength }, () => ({
    price: Math.floor(Math.random() * 900) + 100, // Random price between 100 and 999
    v1: Math.random() > 0.2 ? Math.floor(Math.random() * 900) + 100 : 0, // Some values can be zero
    v2: Math.random() > 0.2 ? Math.floor(Math.random() * 900) + 100 : 0, // Some values can be zero
    v3: Math.random() > 0.2 ? Math.floor(Math.random() * 900) + 100 : 0, // Some values can be zero
    v4: Math.random() > 0.2 ? Math.floor(Math.random() * 900) + 100 : 0, // Some values can be zero
    v5: Math.random() > 0.2 ? Math.floor(Math.random() * 900) + 100 : 0, // Some values can be zero
  })).sort((a, b) => a.price - b.price);
};

const data = generateData();
const colors = [
  ["#4C51BF", "#8186DC"],
  ["#ED64A6", "#F687B3"],
  ["#48BB78", "#7AE3A5"],
  ["#ECC94B", "#F6E05E"],
  ["#F56565", "#FC8181"],
];
const variants = [
  "Экспорт с мониторингом",
  "ГОСТ",
  "Близко к ГОСТу",
  "С превышением по параметрам",
  "Отходы",
];

export const ChartTwo = ({ darkMode }: { darkMode: boolean }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: ReactElement | null;
    x: number;
    y: number;
  }>({
    visible: false,
    content: null,
    x: 0,
    y: 0,
  });
  const [selectedBar, setSelectedBar] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const chartWidth = isMobile ? windowWidth - 40 : 800;
  const chartHeight = isMobile ? 300 : 400; // Adjusted height for better visibility
  const barWidth = (chartWidth - 100) / (data.length * 1.2);
  const barSpacing = barWidth * 0.2;

  const maxValue = Math.max(
    ...data.map((item) => Object.values(item).reduce((a, b) => a + b, 0)),
  );

  const handleBarClick = (item: DataType, index: number, e: any) => {
    setSelectedBar(index);
    const content = (
      <div className="p-1 text-xs">
        <button
          className="absolute top-0 right-0 p-1 text-xs"
          onClick={(e) => {
            e.stopPropagation();
            setTooltip({ visible: false, content: <></>, x: 0, y: 0 });
            setSelectedBar(null);
          }}
        >
          &times;
        </button>
        <ul className="space-y-0.5">
          {variants.map((variant, i) => (
            <li
              key={i}
              className={`flex justify-between p-1 transition-colors duration-150 ease-in-out ${darkMode ? "hover:bg-gray-600 text-gray-300" : "hover:bg-gray-100 text-black"}`}
            >
              <span className="font-semibold mr-2">{variant}:</span>
              <span>{_.get(item, `v${i + 1}`)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
    const tooltipX = Math.min(Math.max(e.clientX, 50), chartWidth - 150); // Ensure tooltip is within chart bounds
    const tooltipY = Math.min(Math.max(e.clientY, 10), chartHeight - 100); // Ensure tooltip is within chart bounds

    setTooltip({ visible: true, content: content, x: tooltipX, y: tooltipY });
  };

  const handleChartClick = () => {
    if (selectedBar !== null) {
      setTooltip({ visible: false, content: <></>, x: 0, y: 0 });
      setSelectedBar(null);
    }
  };

  const renderBar = (item: DataType, index: number) => {
    let y = 0;
    const totalHeight = Object.keys(item)
      .filter((key) => key !== "price")
      .reduce(
        (sum, key) => sum + (_.get(item, key) / maxValue) * chartHeight,
        0,
      );

    return (
      <g key={`bar-${index}`}>
        {Object.keys(item)
          .filter((key) => key !== "price")
          .map((key, variantIndex, arr) => {
            const height = (_.get(item, key) / maxValue) * chartHeight;
            const isFirst = variantIndex === 0;
            const isLast = variantIndex === arr.length - 1;
            const bar = (
              <rect
                key={`${index}-${variantIndex}`}
                fill={`url(#gradient-${variantIndex})`}
                height={height}
                opacity={
                  selectedBar === null || selectedBar === index ? 1 : 0.5
                }
                rx={isFirst ? 4 : 0}
                ry={isLast ? 4 : 0}
                width={barWidth}
                x={index * (barWidth + barSpacing) + 50}
                y={chartHeight - y - height}
                onClick={(e) => handleBarClick(item, index, e)}
                onMouseEnter={(e) =>
                  !selectedBar &&
                  setTooltip({
                    visible: true,
                    content: (
                      <span>
                        {variants[variantIndex]}: {_.get(item, key)}
                      </span>
                    ),
                    x: e.clientX + 5,
                    y: e.clientY - 200,
                  })
                }
                onMouseLeave={() =>
                  !selectedBar &&
                  setTooltip({ visible: false, content: <></>, x: 0, y: 0 })
                }
                onMouseMove={(e) =>
                  !selectedBar &&
                  setTooltip({
                    visible: true,
                    content: (
                      <span>
                        {variants[variantIndex]}: {_.get(item, key)}
                      </span>
                    ),
                    x: e.clientX + 5,
                    y: e.clientY - 200,
                  })
                }
              />
            );

            y += height;

            return bar;
          })}
        <rect
          fill="none"
          height={totalHeight}
          rx={4}
          ry={4}
          stroke={darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
          strokeWidth="1"
          width={barWidth}
          x={index * (barWidth + barSpacing) + 50}
          y={chartHeight - totalHeight}
        />
      </g>
    );
  };

  const yAxisLabels = Array.from({ length: 5 }, (_, i) =>
    Math.round((maxValue / 4) * i),
  );

  return (
    <div
      className={`w-full max-w-4xl mx-auto p-4 overflow-x-auto relative ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      onClick={handleChartClick}
    >
      <svg height={chartHeight + 50} width={chartWidth}>
        <defs>
          {colors.map((color, index) => (
            <linearGradient
              key={`gradient-${index}`}
              id={`gradient-${index}`}
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop offset="0%" stopColor={color[1]} />
              <stop offset="100%" stopColor={color[0]} />
            </linearGradient>
          ))}
        </defs>
        {yAxisLabels.map((label, index) => (
          <text
            key={index}
            fill={darkMode ? "white" : "black"}
            fontSize="10"
            textAnchor="end"
            x="30"
            y={chartHeight - (label / maxValue) * chartHeight}
          >
            {label}
          </text>
        ))}
        {data.map((item, index) => renderBar(item, index))}
        {data.map((item, index) => (
          <text
            key={index}
            fill={darkMode ? "white" : "black"}
            fontSize={isMobile ? "10" : "12"}
            textAnchor="middle"
            x={index * (barWidth + barSpacing) + 50 + barWidth / 2}
            y={chartHeight + 20}
          >
            {item.price} ₽
          </text>
        ))}
        <line
          stroke={darkMode ? "white" : "black"}
          x1="50"
          x2={chartWidth}
          y1={chartHeight}
          y2={chartHeight}
        />
        <line
          stroke={darkMode ? "white" : "black"}
          x1="50"
          x2="50"
          y1="0"
          y2={chartHeight}
        />
      </svg>
      <div className="flex flex-wrap justify-center mt-4">
        {variants.map((variant, index) => (
          <div key={variant} className="flex items-center mr-4 mb-2">
            <div
              className="w-4 h-4 mr-2"
              style={{
                background: `linear-gradient(to bottom, ${colors[index][1]}, ${colors[index][0]})`,
              }}
            />
            <span className="text-sm">{variant}</span>
          </div>
        ))}
      </div>
      {tooltip.visible && (
        <div
          className={`absolute ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} border border-gray-300 p-1 shadow-lg text-xs`}
          style={{ top: tooltip.y, left: tooltip.x }}
          onClick={(e) => e.stopPropagation()}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};
