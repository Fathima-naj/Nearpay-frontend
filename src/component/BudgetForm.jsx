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
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <label className="block mb-2 font-semibold">Set Budget (₹)</label>
      <input
        type="number"
        min={0}
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save
      </button>
      <button type="button" onClick={onClose} className="ml-2 px-4 py-2 rounded border">
        Cancel
      </button>
    </form>
  );
}
