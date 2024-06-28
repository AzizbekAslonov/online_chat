import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Rodal from "rodal";

export default function ProfileModal({ showModal, setShowModal }) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const { profile } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (!/^[a-zA-Z]{3,}$/.test(value)) {
      setErrorMessage("Enter at least 3 English letters");
    } else {
      setErrorMessage("");
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  };
  const saveHandler = () => {
    const formdata = new FormData();
    formdata.append("nickName", inputValue);
    formdata.append("avatar", file);
    navigate("/");
  };
  useEffect(() => {
    // console.log(profile);
  }, [profile]);
  return (
    <Rodal
      width={700}
      height={500}
      visible={showModal}
      onClose={() => setShowModal(false)}
    >
      <h1 className="text-[30px] min-h-max text-center">
        hi let's update your profile
      </h1>
      <div className="p-4">
        <p>Come up with nickname:</p>

        <input
          type="text"
          className={`-outline-offset-1 bg-amber-400 rounded-sm  ${
            errorMessage ? "outline-red-500" : ""
          }`}
          value={inputValue}
          onChange={handleChange}
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <br />
        <br />

        <label htmlFor="file-input" lang="en">
          Upload your avatar:
        </label>
        <br />
        <input
          onChange={handleFileChange}
          aria-label="eng"
          type="file"
          id="file-input"
          lang="en"
        />
        <p id="error-message" className="error"></p>
        <br />
        <br />
        <br />
        <button
          onClick={saveHandler}
          className="w-30 h-30 bg-amber-400 p-2 rounded-sm"
        >
          Save
        </button>
      </div>
    </Rodal>
  );
}
