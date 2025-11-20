import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../slice/categorySlice";
import { createExpense, fetchReport } from "../slice/expenseSlice";
import toast from "react-hot-toast";

export default function ExpenseModal({ open, onClose, year, month, onRefresh }) {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.categories.items);
  const [form, setForm] = useState({
    categoryId: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (open) dispatch(fetchCategories());
  }, [open, dispatch]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!form.categoryId || !form.amount) {
      toast.error("Please fill all fields");
      return;
    }

    const payload = {
      categoryId: form.categoryId,
      amountCents: Math.round(Number(form.amount) * 100),
      date: form.date,
    };

    try {
      const res = await dispatch(createExpense(payload)).unwrap();
      await dispatch(fetchReport({ year, month }));

      const cat = res.category || categories.find(c => c._id === form.categoryId);
      const spent = cat?.spent ?? payload.amountCents;
      const limit = cat?.limitCents ?? 0;

      if (limit === 0 || spent <= limit) {
        toast.success("Expense added Within budget");
      } else {
        toast.error("Expense added ⚠ Over budget");
      }

      onRefresh();
      onClose();

    } catch (err) {
      console.error("Failed to add expense:", err);
      toast.error("Failed to add expense");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div 
        className="absolute inset-0 bg-white/30 backdrop-blur-sm"
        onClick={onClose} 
      ></div>

      <div className="relative p-6 bg-white rounded-xl shadow-lg z-10 w-80 md:w-96">
        <h3 className="text-lg font-bold mb-4 text-[#5A4A42]">Add Expense</h3>
        <form onSubmit={handleSave} className="space-y-3">
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6E8C63] transition"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            type="number"
            step="0.01"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6E8C63] transition"
            placeholder="Amount"
          />

          <input
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            type="date"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6E8C63] transition"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-[#5A4A42] hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#6E8C63] text-white rounded-lg hover:bg-[#57724F] transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
