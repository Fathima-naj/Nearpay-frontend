export default function LandingPage() {
  return (
    <div className="min-h-screen text-[#5A4A42]">

      <nav className="flex justify-between items-center px-6  py-4 
                      bg-white shadow-sm sticky top-0 z-20">

        <h1 className="text-2xl font-bold text-[#6E8C63] tracking-wide cursor-pointer">
          ExpenseTrack
        </h1>

        <div className="hidden md:flex space-x-8 text-[#5A4A42] font-medium">
          <a href="#features" className="hover:text-[#6E8C63] transition">Features</a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/register"
            className="px-4 py-2 rounded-lg bg-[#6E8C63] text-white font-medium 
                       hover:bg-[#57724F] transition"
          >
            Register
          </a>

          <a
            href="/login"
            className="px-4 py-2 rounded-lg border border-[#6E8C63] text-[#6E8C63] 
                       font-medium hover:bg-[#EEF3EC] transition"
          >
            Login
          </a>
        </div>

      </nav>

      <section className="px-6 md:px-12 py-20 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#5A4A42]">
            Control Your <span className="text-[#6E8C63]">Spending</span> With Smart Tracking
          </h2>

          <p className="text-lg">
            Track expenses, set budgets, and get monthly insights — all in one clean interface.
          </p>

          <a
            href="/register"
            className="inline-block px-6 py-3 bg-[#E57E6F] text-white rounded-lg text-lg 
                       hover:bg-[#D86C5D] transition"
          >
            Get Started Free
          </a>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img
            src="/landing.jpg"
            alt="Expense Illustration"
            className="w-72 md:w-96"
          />
        </div>
      </section>

      <section id="features" className="px-6 md:px-12 py-16">
        <h3 className="text-3xl font-bold text-center mb-10 text-[#5A4A42]">
          Top Features
        </h3>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition border border-[#E4D4C7]">
            <h4 className="text-xl font-semibold mb-3 text-[#6E8C63]">Add Expenses</h4>
            <p>Quickly add daily expenses with category & date fields.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition border border-[#E4D4C7]">
            <h4 className="text-xl font-semibold mb-3 text-[#6E8C63]">Monthly Budgeting</h4>
            <p>Set limits per category and track progress visually.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition border border-[#E4D4C7]">
            <h4 className="text-xl font-semibold mb-3 text-[#6E8C63]">Reports</h4>
            <p>View detailed breakdowns of spent, budget & remaining.</p>
          </div>

        </div>
      </section>

      <section className="px-6 md:px-12 py-16 bg-[#6E8C63] text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Start Tracking Smarter</h3>
        <p className="mb-6 text-lg">
          Build better financial habits with real-time insights and budgeting tools.
        </p>

        <a
          href="/register"
          className="px-6 py-3 bg-white text-[#6E8C63] rounded-lg text-lg hover:bg-[#F5E7DD]"
        >
          Create Free Account
        </a>
      </section>

      <footer className="py-6 text-center text-[#5A4A42] bg-[#F5E7DD]">
        © 2025 ExpenseTrack. All rights reserved.
      </footer>

    </div>
  );
}
