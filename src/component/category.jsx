import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../slice/categorySlice";

export default function AddCategoryForm({ onRefresh }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#60a5fa");
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
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
        className="border p-2 rounded"
        required
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-12 h-10 p-0 border rounded"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}
