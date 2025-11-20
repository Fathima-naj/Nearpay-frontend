import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(formData)).then((res) => {
      if (res.error) {
        toast.error(res.payload || "Registration failed");
      } else {
        toast.success("Registered successfully!");
        navigate("/login");
      }
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
       <Toaster position='top-center'/>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-[#6E8C63] mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-[#5A4A42]">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border rounded-lg focus:outline-[#6E8C63]"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-[#5A4A42]">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border rounded-lg focus:outline-[#6E8C63]"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-[#5A4A42]">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border rounded-lg focus:outline-[#6E8C63]"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6E8C63] text-white p-3 rounded-lg hover:bg-[#57724F] transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-[#5A4A42]">
          Already have an account?{" "}
          <a href="/login" className="text-[#6E8C63] font-semibold">Login</a>
        </p>

      </div>
    </div>
  );
}
