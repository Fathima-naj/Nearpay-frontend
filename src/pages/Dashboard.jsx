// import { useState, useEffect } from "react";
// import HeaderMonths from "../component/HeaderMonth";
// import CategoryCard from "../component/CategoryCard";
// import ExpenseModal from "../component/ExpenseModal";
// import AddCategoryForm from "../component/category";
// import { Toaster } from "react-hot-toast";

// export default function Dashboard() {
//   const [selectedMonth, setSelectedMonth] = useState({
//     month: new Date().getMonth(),
//     year: new Date().getFullYear(),
//   });

//   const [categories, setCategories] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [refresh, setRefresh] = useState(false);
// useEffect(() => {
//   const fetchCategories = async () => {
//     try {
//       const res = await fetch(
//         `https://nearpay-backend.onrender.com/api/dashboard?month=${selectedMonth.month}&year=${selectedMonth.year}`,
//         {
//           method: 'GET',
//           credentials: 'include', // This is correct
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
      
//       // Check if response is ok
//       if (!res.ok) {
//         if (res.status === 401) {
//           // Redirect to login if unauthorized
//           window.location.href = '/login';
//           return;
//         }
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
      
//       const data = await res.json();
//       setCategories(data.categories || []); // Add fallback to empty array
//     } catch (err) {
//       console.error("Dashboard fetch error:", err);
//       setCategories([]); // Set empty array on error
//     }
//   };
//   fetchCategories();
// }, [selectedMonth, refresh]);

//   return (
//     <div className="p-6">
//       <Toaster position="top-right" />

//       <HeaderMonths selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />

//       <AddCategoryForm onRefresh={() => setRefresh((p) => !p)} />

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//         {categories.map((cat) => (
//           <CategoryCard
//             key={cat._id}
//             category={cat}
//             onRefresh={() => setRefresh((p) => !p)}
//             year={selectedMonth.year}
//             month={selectedMonth.month}
//           />
//         ))}
//       </div>

//       <button
//         onClick={() => setOpenModal(true)}
//         className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full text-2xl shadow-lg"
//       >
//         +
//       </button>

//       {openModal && (
//         <ExpenseModal
//           open={openModal}
//           onClose={() => setOpenModal(false)}
//           year={selectedMonth.year}
//           month={selectedMonth.month}
//           onRefresh={() => setRefresh((p) => !p)}
//         />
//       )}
//     </div>
//   );
// }


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
        console.log('Fetching from:', `https://nearpay-backend.onrender.com/api/dashboard?month=${selectedMonth.month}&year=${selectedMonth.year}`);
        
        const res = await fetch(
          `https://nearpay-backend.onrender.com/api/dashboard?month=${selectedMonth.month}&year=${selectedMonth.year}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        console.log('Response status:', res.status);
        console.log('Response headers:', res.headers);
        
        // Check if response is ok
        if (!res.ok) {
          if (res.status === 401) {
            console.log('Unauthorized - redirecting to login');
            window.location.href = '/login';
            return;
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Received data:', data);
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, [selectedMonth, refresh]);

  // Safe rendering with additional checks
  return (
    <div className="p-6">
      <Toaster position="top-right" />

      <HeaderMonths selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />

      <AddCategoryForm onRefresh={() => setRefresh((p) => !p)} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {categories && categories.length > 0 ? (
          categories.map((cat) => (
            <CategoryCard
              key={cat._id}
              category={cat}
              onRefresh={() => setRefresh((p) => !p)}
              year={selectedMonth.year}
              month={selectedMonth.month}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No categories found or not authenticated</p>
            <button 
              onClick={() => window.location.href = '/login'}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Go to Login
            </button>
          </div>
        )}
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