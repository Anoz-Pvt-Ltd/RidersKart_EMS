import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingUI from "../../components/LoadingUI";
import Button from "../../components/Button";
import { FetchData } from "../../utils/FetchFromApi";
import { parseErrorMessage } from "../../utils/ErrorMessageParser";

const HeadDashboard = ({ startLoading, stopLoading }) => {
  const [headData, setHeadData] = useState(null);
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      startLoading();
      const response = await FetchData("/head/dashboard", "get", null, true);

      if (response.data.success) {
        setHeadData(response.data.data);
      }
    } catch (error) {
      alert(parseErrorMessage(error?.response?.data));
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!headData) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {headData.name}
          </h1>
          <p className="text-gray-500 text-sm">
            {headData.designation} · {headData.department}
          </p>
        </div>

        <Button
          label="Register Employee"
          onClick={() => navigate("/head/register-employee")}
          className="mt-4 md:mt-0"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-sm text-gray-500">Total Employees Created</h3>
          <p className="text-3xl font-bold text-gray-800">
            {headData.stats?.totalEmployees || 0}
          </p>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Your Employees</h2>

        {headData.createdEmployees?.length === 0 ? (
          <p className="text-gray-500">No employees registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Name</th>
                  <th>Employee ID</th>
                  <th>Designation</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {headData.createdEmployees.map((emp) => (
                  <tr key={emp._id} className="border-b">
                    <td className="py-2">{emp.name}</td>
                    <td>{emp.employeeId}</td>
                    <td>{emp.designation}</td>
                    <td>{emp.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingUI(HeadDashboard);
