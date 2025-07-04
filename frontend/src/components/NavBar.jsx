import { Link, useNavigate } from "react-router";
import { PlusIcon, PieChartIcon, LogOutIcon } from "lucide-react";
import { removeToken, getToken } from "../lib/auth";

const Navbar = () => {
  const nav = useNavigate();
  const handleLogout = () => {
    removeToken();
    nav("/login");
  };
  const loggedIn = !!getToken();

  return (
    <header className="bg-base-300 border-b">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary font-mono">ThinkBoard</h1>
        {loggedIn && (
          <div className="flex items-center gap-3">
            <Link to="/create" className="btn btn-primary"><PlusIcon /></Link>
            <Link to="/analytics" className="btn btn-secondary"><PieChartIcon /></Link>
            <button onClick={handleLogout} className="btn btn-ghost">
              <LogOutIcon className="size-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
