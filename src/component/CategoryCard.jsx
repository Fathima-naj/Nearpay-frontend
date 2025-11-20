import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../slice/categorySlice";
import BudgetForm from "./BudgetForm";
import { OctagonAlert, Trash2 } from "lucide-react";

export default function CategoryCard({ category, onRefresh, year, month }) {
  const { name, color, spent, limitCents, _id } = category;
  const dispatch = useDispatch();
  const [openBudget, setOpenBudget] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Delete category "${name}"?`)) {
      try {
        await dispatch(deleteCategory(_id)).unwrap();
        onRefresh();
      } catch (err) {
        console.error("Failed to delete category:", err);
      }
    }
  };

  const spentAmount = spent / 100;
  const limitAmount = limitCents / 100;
  const remaining = limitAmount - spentAmount;
  const percent = limitAmount > 0 ? Math.min((spentAmount / limitAmount) * 100, 100) : 0;

  let barColor = "bg-green-500";
  if (percent > 80 && percent < 100) barColor = "bg-yellow-400";
  if (percent >= 100) barColor = "bg-red-500";

  const remainingColor =
    limitCents === 0
      ? "text-gray-500"
      : remaining >= 0
      ? "text-green-600"
      : "text-red-600";

  return (
    <div className="p-5 bg-white rounded-xl shadow-md border border-[#E4D4C7] relative hover:shadow-lg transition">

      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
      >
        <Trash2 />
      </button>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-5 h-5 rounded-full border border-[#D4CFC6]" style={{ backgroundColor: color }}></div>
        <h3 className="text-lg font-semibold text-[#5A4A42]">{name}</h3>
      </div>

      <p className="text-sm text-gray-600">
        Spent: <span className="font-semibold">₹{spentAmount}</span>
      </p>
      <p className="text-sm text-gray-600">
        Budget: <span className="font-semibold">₹{limitAmount}</span>
      </p>
      <p className={`text-sm mt-1 font-semibold ${remainingColor}`}>
        Remaining: ₹{remaining.toFixed(2)}
      </p>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
        <div
          className={`h-3 rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      {limitCents > 0 && percent >= 100 && (
        <p className="text-red-600 text-sm mt-2 font-semibold flex items-center gap-1">
          <OctagonAlert /> Over Budget!
        </p>
      )}
      {limitCents > 0 && percent >= 80 && percent < 100 && (
        <p className="text-yellow-600 text-sm mt-2 font-semibold flex items-center gap-1">
          <OctagonAlert /> Almost exceeding!
        </p>
      )}

      <button
        onClick={() => setOpenBudget(true)}
        className="mt-4 w-full py-2 bg-[#6E8C63] text-white rounded-lg font-medium hover:bg-[#57724F] transition"
      >
        Set Budget
      </button>

      {openBudget && (
        <BudgetForm
          categoryId={_id}
          existingBudget={{ limitCents, _id }}
          year={year}
          month={month}
          onClose={() => {
            setOpenBudget(false);
            onRefresh();
          }}
        />
      )}
    </div>
  );
}
