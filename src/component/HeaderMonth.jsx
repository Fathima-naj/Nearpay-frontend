import { useState } from "react";

export default function HeaderMonths({ selectedMonth, setSelectedMonth }) {
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h2 className="text-2xl font-bold text-[#5A4A42]">
        {months[selectedMonth.month]} {selectedMonth.year}
      </h2>

      <select
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6E8C63] transition"
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
