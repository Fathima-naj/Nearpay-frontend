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
          `https://nearpay-backend.onrender.com/api/dashboard?month=${selectedMonth.month}&year=${selectedMonth.year}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!res.ok) {
          if (res.status === 401) {
            window.location.href = '/login';
            return;
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, [selectedMonth, refresh]);

  return (
    <div className="min-h-screen text-[#5A4A42] p-6 md:p-12">
      <Toaster position="top-right" />

      <HeaderMonths selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />

      <div className="my-6">
        <AddCategoryForm onRefresh={() => setRefresh((p) => !p)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories && categories.length > 0 ? (
          categories.map((cat) => (
            <CategoryCard
              key={cat._id}
              category={cat}
              onRefresh={() => setRefresh((p) => !p)}
              year={selectedMonth.year}
              month={selectedMonth.month}
              className="bg-white rounded-xl shadow-md border border-[#E4D4C7] hover:shadow-lg transition"
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-500 text-lg mb-4">
              No categories found or not authenticated
            </p>
            <button 
              onClick={() => window.location.href = '/login'}
              className="px-6 py-3 rounded-lg bg-[#6E8C63] text-white font-medium hover:bg-[#57724F] transition"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>

      <button
        onClick={() => setOpenModal(true)}
        className="fixed bottom-6 right-6 bg-[#E57E6F] text-white p-5 rounded-full text-3xl shadow-xl hover:bg-[#D86C5D] transition"
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
