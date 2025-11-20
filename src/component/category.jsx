import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../slice/categorySlice";

export default function AddCategoryForm({ onRefresh }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#c8253bff");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      await dispatch(createCategory({ name, color })).unwrap();
      setName("");
      onRefresh(); 
    } catch (err) {
      console.error("Failed to create category:", err);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col sm:flex-row gap-3 mb-6 items-center"
    >
    
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
        className="border border-gray-300 rounded-lg p-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#6E8C63] transition"
        required
      />

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-12 h-10 p-0 border border-gray-300 rounded-lg cursor-pointer transition"
      />

      <button
        type="submit"
        className="bg-[#6E8C63] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#57724F] transition"
      >
        Add
      </button>
    </form>
  );
}
