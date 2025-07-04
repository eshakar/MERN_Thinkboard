import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import { saveToken } from "../lib/auth";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { name, email, password, role });
      saveToken(res.data.token);
      toast.success("Registered!");
      nav("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 p-8 space-y-4">
        <h2 className="text-2xl font-bold">Register</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="input input-bordered w-full" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input input-bordered w-full" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input input-bordered w-full" />
          <select value={role} onChange={e => setRole(e.target.value)} className="select select-bordered w-full">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button className="btn btn-primary w-full" type="submit">Register</button>
        </form>
        <p className="text-sm">Already have one? <Link to="/login" className="text-primary">Login</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
