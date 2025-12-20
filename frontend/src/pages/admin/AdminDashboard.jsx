import React, { useEffect, useState } from "react";
import LoadingUI from "../../components/LoadingUI";
import { FetchData } from "../../utils/FetchFromApi";

const AdminDashboard = ({ startLoading, stopLoading }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        startLoading();
        const res = await FetchData("/admin/dashboard", "get", null, true);
        setData(res.data.data);
      } finally {
        stopLoading();
      }
    };
    fetchDashboard();
  }, []);

  if (!data) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">Total Heads: {data.stats.totalHeads}</div>
        <div className="card">Total Employees: {data.stats.totalEmployees}</div>
      </div>
    </div>
  );
};

export default LoadingUI(AdminDashboard);
