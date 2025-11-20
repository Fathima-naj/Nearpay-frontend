import { useState, useEffect } from "react";
import HeaderMonths from "../component/HeaderMonth";
import CategoryCard from "../component/CategoryCard";
import ExpenseModal from "../component/ExpenseModal";
import AddCategoryForm from "../component/category";
import { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/dashboard?month=${selectedMonth.month}&year=${selectedMonth.year}`,
          { credentials: "include" }
        );
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchCategories();
  }, [selectedMonth, refresh]);

  return (
    <div className="p-6">
      <Toaster position="top-right" />

      <HeaderMonths selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />

      <AddCategoryForm onRefresh={() => setRefresh((p) => !p)} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {categories.map((cat) => (
          <CategoryCard
            key={cat._id}
            category={cat}
            onRefresh={() => setRefresh((p) => !p)}
            year={selectedMonth.year}
            month={selectedMonth.month}
          />
        ))}
      </div>

      <button
        onClick={() => setOpenModal(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full text-2xl shadow-lg"
      >
        +
      </button>

      {openModal && (
        <ExpenseModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          year={selectedMonth.year}
          month={selectedMonth.month}
          onRefresh={() => setRefresh((p) => !p)}
        />
      )}
    </div>
  );
}
