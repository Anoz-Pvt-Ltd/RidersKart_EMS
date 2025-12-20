import React, { useRef } from "react";
import Button from "../../components/Button";
import InputBox from "../../components/InputBox";
import LoadingUI from "../../components/LoadingUI";
import { FetchData } from "../../utils/FetchFromApi";
import { parseErrorMessage } from "../../utils/ErrorMessageParser";

const EmployeeRegistrationForm = ({ startLoading, stopLoading }) => {
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formRef.current));

    try {
      startLoading();
      await FetchData("/head/register-employee", "post", data, true);
      alert("Employee Registered Successfully");
      formRef.current.reset();
    } catch (err) {
      alert(parseErrorMessage(err?.response?.data));
    } finally {
      stopLoading();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-white p-8 max-w-3xl mx-auto shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4">Register Employee</h2>

      <InputBox LabelName="Name" Name="name" required />
      <InputBox LabelName="Employee ID" Name="employeeId" required />
      <InputBox LabelName="Designation" Name="designation" required />
      <InputBox LabelName="Department" Name="department" required />
      <InputBox LabelName="Pin Code" Name="pincode" required />

      <Button label="Register Employee" type="submit" className="mt-4" />
    </form>
  );
};

export default LoadingUI(EmployeeRegistrationForm);
