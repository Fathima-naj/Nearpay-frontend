import { useState } from "react";

export default function HeaderMonths({ selectedMonth, setSelectedMonth }) {
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {months[selectedMonth.month]} {selectedMonth.year}
      </h2>

      <select
        className="border px-3 py-2 rounded-lg"
        value={`${selectedMonth.month}-${selectedMonth.year}`}
        onChange={(e) => {
          const [month, year] = e.target.value.split("-");
          setSelectedMonth({ month: Number(month), year: Number(year) });
        }}
      >
        {[2024, 2025, 2026].map((year) =>
          months.map((_, index) => (
            <option key={`${index}-${year}`} value={`${index}-${year}`}>
              {months[index]} {year}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
