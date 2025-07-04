import { Link, useNavigate } from "react-router";
import { PlusIcon, PieChartIcon, LogOutIcon } from "lucide-react";
import { removeToken, getToken } from "../lib/auth";

const NavBar = () => {
  const nav = useNavigate();
  const loggedIn = !!getToken();
 

  const handleLogout = () => {
    removeToken();
    nav("/login");
  };

  return (
    <header className="bg-base-300 border-b">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary font-mono">ThinkBoard</h1>

        <div className="flex items-center gap-3">
          {!loggedIn ? (
            <>
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn btn-secondary">Register</Link>
            </>
          ) : (
            <>
              <Link to="/create" className="btn btn-primary">
                <PlusIcon className="size-5" />
                <span className="ml-2">New Note</span>
              </Link>

              {loggedIn && (
                <Link to="/analytics" className="btn btn-secondary">
                  <PieChartIcon className="size-5" />
                  <span className="ml-2">Analytics</span>
                </Link>
              )}

              <button onClick={handleLogout} className="btn btn-ghost">
                <LogOutIcon className="size-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;

