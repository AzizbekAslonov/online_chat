import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useProfileMutation } from "../store/services/userServices";

export default function Profile() {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const { profile } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const [getProfile, { isSuccess }] = useProfileMutation();
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
    //  dispatch(setProfile(selectedFile));
  };
  const saveHandler = () => {
    const formdata = new FormData();
    formdata.append("nickName", inputValue);
    formdata.append("avatar", file);
    //  getProfile(formdata)
    //    .unwrap()
    //    .then((profilData) => {
    //      console.log(profilData);
    //      // dispatch(setProfile(profilData));
    //      setInputValue("");
    //    });
    navigate("/");
  };
  useEffect(() => {
    // console.log(profile);
  }, [profile]);
  return (
    <div className="w-full h-screen bg-saidbar-background text-white">
      <h6 className="text-[30px] min-h-max text-center">
        hi let's create your profile
      </h6>
      <div className="p-4">
        <p>Come up with nickname:</p>

        <input
          type="text"
          className={`-outline-offset-1 rounded-sm bg-slate-600 ${
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
          className="w-30 h-30 bg-slate-600 p-2 rounded-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
}
