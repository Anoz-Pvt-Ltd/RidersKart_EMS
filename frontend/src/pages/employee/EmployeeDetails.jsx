import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../../utils/FetchFromApi";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    FetchData(`/employee/${id}`, "get").then((res) => setEmp(res.data.data));
  }, [id]);

  if (!emp) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{emp.name}</h2>
      <p>Employee ID: {emp.employeeId}</p>
      <p>Designation: {emp.designation}</p>
      <p>Department: {emp.department}</p>
    </div>
  );
};

export default EmployeeDetails;
