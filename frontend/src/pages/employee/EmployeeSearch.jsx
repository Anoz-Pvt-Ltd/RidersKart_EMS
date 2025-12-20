import React, { useState } from "react";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import { FetchData } from "../../utils/FetchFromApi";
import { useNavigate } from "react-router-dom";

const EmployeeSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const search = async () => {
    const res = await FetchData(`/employee/search?name=${query}`, "get");
    setResults(res.data.data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Search Employees</h2>

      <div className="flex gap-3 max-w-xl">
        <InputBox
          Placeholder="Search by name"
          Value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button label="Search" onClick={search} />
      </div>

      <ul className="mt-6 space-y-3">
        {results.map((emp) => (
          <li
            key={emp._id}
            className="p-3 border rounded cursor-pointer"
            onClick={() => navigate(`/employees/${emp._id}`)}
          >
            {emp.name} — {emp.designation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeSearch;
