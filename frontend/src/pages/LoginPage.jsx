import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import { saveToken } from "../lib/auth";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      saveToken(res.data.token);
      toast.success("Logged in!");
      nav("/");
    } catch {
      toast.error("Invalid login");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 p-8 space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <form onSubmit={onLogin} className="space-y-4">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input input-bordered w-full" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input input-bordered w-full" />
          <button className="btn btn-primary w-full" type="submit">Login</button>
        </form>
        <p className="text-sm">New here? <Link to="/register" className="text-primary">Sign up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
