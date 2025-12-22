import React, { useState } from "react";
import InputBox from "../../components/InputBox";
import logo from "../../assets/Logo.png";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate()
  const searchedValue = useParams().searchData;
  const [searchInput, setSearchInput] = useState(searchedValue || "");
  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/employees/${searchInput}`);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex justify-center items-center flex-col w-1/2">
        <img src={logo} className="w-80" />
        <h1>Welcome to Riders Kart EMS</h1>
        {/* <InputBox
          LabelName="Enter detail to search"
          Placeholder="Enter employee name, contact number, email, pincode to search .."
        /> */}
        <div className="flex justify-center items-center w-full">
          <InputBox
            Value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            Placeholder="Enter employee name, contact number, email, pincode to search .."
            className="w-full"
            keyPress={handleSearch}
          />
          <button
            onClick={handleSearch}
            className="relative lg:right-10 right-0 bg-neutral-300 rounded-full p-1"
          >
            <CiSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
