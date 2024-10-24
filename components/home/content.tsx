"use client";
import React, { useEffect, useState } from "react";

type InitialData = { price: number; volumes: number[] };

export const Content = () => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    value: 0,
    x: 0,
    y: 0,
  });
  const [data, setData] = useState<InitialData[]>([]);

  useEffect(() => {
    const generateRandomVolumes = () => {
      const parts = Math.floor(Math.random() * 8) + 3; // Randomly between 3 and 10 parts

      return Array.from(
        { length: parts },
        () => Math.floor(Math.random() * 3) + 1,
      );
    };

    const initialData: InitialData[] = Array.from({ length: 15 }, (_, i) => ({
      price: (i + 1) * 10,
      volumes: generateRandomVolumes(),
    }));

    setData(initialData);
  }, []);

  const handleMouseMove = (e: any, volume: any) => {
    setTooltip({
      visible: true,
      value: volume,
      x: e.clientX + 10,
      y: e.clientY + 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const colors = [
    "bg-red-300",
    "bg-green-300",
    "bg-blue-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-indigo-300",
    "bg-teal-300",
    "bg-orange-300",
    "bg-gray-300",
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded overflow-hidden relative mt-4">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Волшебные данные Таранова
        </h2>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Цена</span>
            <span>Объем</span>
          </div>
          <div className="flex items-end space-x-2 mt-2">
            {data.map((item, index) => (
              <div
                key={index}
                className="w-8 flex flex-col justify-end"
                style={{ height: `${item.volumes.reduce((a, b) => a + b)}rem` }}
              >
                {item.volumes.map((volume, idx) => (
                  <div
                    key={idx}
                    className={`${colors[idx % colors.length]} transform transition-transform duration-200 hover:scale-110`}
                    style={{ height: `${volume}rem` }}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={(e) => handleMouseMove(e, volume)}
                  />
                ))}
                <span className="text-xs text-center mt-1">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {tooltip.visible && (
        <div
          className="fixed bg-gray-700 text-white text-xs rounded py-1 px-2 pointer-events-none"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          {tooltip.value}
        </div>
      )}
    </div>
  );
};
