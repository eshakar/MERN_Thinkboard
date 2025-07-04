import { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "../lib/axios";
import toast from "react-hot-toast";



const DashboardPage = () => {
  const [dt, setDt] = useState({ byUser: [], byTag: [], perDay: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/analytics")
      .then(r => setDt(r.data))
      .catch(err => toast.error("Analytics load failed"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-10 text-center">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-3xl font-bold mb-6">ThinkBoard</h1>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="card p-4 bg-base-100"><h2 className="mb-2 font-semibold">Top Users</h2>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={dt.byUser.map(u => ({ name: u._id, count: u.count }))}>
              <XAxis dataKey="name"/><YAxis/><Tooltip/>
              <Bar dataKey="count" fill="#4f46e5"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-4 bg-base-100"><h2 className="mb-2 font-semibold">Top Tags</h2>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart><Pie data={dt.byTag.map(t => ({ name: t._id, value: t.count }))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} label/>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-4 bg-base-100 lg:col-span-3"><h2 className="mb-2 font-semibold">Notes / Day (Last 7d)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dt.perDay.map(d => ({ date: d._id, count: d.count }))}>
              <XAxis dataKey="date"/><YAxis/><Tooltip/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Line type="monotone" dataKey="count" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
