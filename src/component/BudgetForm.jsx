import { useState } from "react";
import { useDispatch } from "react-redux";
import { upsertBudget } from "../slice/budgetSlice";
import toast from "react-hot-toast";

export default function BudgetForm({ categoryId, existingBudget, year, month, currentSpent = 0, onClose }) {
  const [limit, setLimit] = useState(existingBudget ? existingBudget.limitCents / 100 : 0);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        upsertBudget({
          categoryId,
          limitCents: limit * 100,
          year,
          month
        })
      ).unwrap();

      if (limit * 100 >= currentSpent) {
        toast.success("Budget set! Within budget");
      } else {
        toast.error("Budget set! ⚠ Over budget");
      }

      onClose(); 
    } catch (err) {
      console.error("Failed to upsert budget:", err);
      toast.error("Failed to update budget");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
     
      <div 
        className="absolute inset-0 bg-white/30 backdrop-blur-sm"
        onClick={onClose} 
      ></div>

      <form
        onSubmit={handleSubmit}
        className="relative p-6 bg-white rounded-xl shadow-lg z-10 w-80 md:w-96"
      >
        <h2 className="text-lg font-bold mb-4 text-[#5A4A42]">Set Budget</h2>

        <label className="block mb-2 font-semibold text-[#5A4A42]">Budget Amount (₹)</label>
        <input
          type="number"
          min={0}
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#6E8C63]"
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded border text-[#5A4A42] hover:bg-gray-100 transition">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-[#6E8C63] text-white rounded-lg hover:bg-[#57724F] transition">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
