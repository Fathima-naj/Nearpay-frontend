import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../slice/categorySlice";
import BudgetForm from "./BudgetForm";
import {OctagonAlert, X} from "lucide-react"

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
  if (percent > 80 && percent < 100) barColor = "bg-yellow-500";
  if (percent >= 100) barColor = "bg-red-500";

  const remainingColor =
    limitCents === 0
      ? "text-gray-600"
      : remaining >= 0
      ? "text-green-600"
      : "text-red-600";

  return (
    <div className="p-4 rounded shadow border bg-white relative">
     
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-red-500 font-bold"
      >
        <X/>
      </button>

      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
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

      <div className="w-full bg-gray-200 rounded h-3 mt-3">
        <div className={`h-3 rounded ${barColor}`} style={{ width: `${percent}%` }}></div>
      </div>

      {limitCents > 0 && percent >= 100 && (
        <p className="text-red-600 text-sm mt-2 font-semibold"><OctagonAlert className="inline"/> Over Budget!</p>
      )}
      {limitCents > 0 && percent >= 80 && percent < 100 && (
        <p className="text-yellow-600 text-sm mt-2 font-semibold"><OctagonAlert className="inline"/> Almost exceeding!</p>
      )}

      <button
        onClick={() => setOpenBudget(true)}
        className="mt-3 px-2 py-1 bg-green-500 text-white rounded"
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
