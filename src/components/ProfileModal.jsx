import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Rodal from "rodal";
import {
  useGetUserQuery,
  useLazyGetUsersQuery,
  useUpdateUserMutation,
} from "../store/services/userServices";
import { toast } from "react-toastify";

export default function ProfileModal({ showModal, setShowModal }) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const [localFile, setLocalFile] = useState("");
  const { user } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef();
  const { data: profile, refetch } = useGetUserQuery(user.user?.id);
  const [update, { isLoading }] = useUpdateUserMutation();
  const [getUsers, {}] = useLazyGetUsersQuery();

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
    const file = e.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onload = function (e) {
      setLocalFile(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  const saveHandler = () => {
    const formdata = new FormData();
    formdata.append("userName", inputValue);
    formdata.append("img", file);

    update(formdata)
      .unwrap()
      .then(() => {
        // refetch();
        setShowModal(false);
        toast.success("Updated");
        getUsers();
      });
  };

  useEffect(() => {
    if (profile) {
      setInputValue(profile.userName);
    }
  }, [profile]);

  if (!profile) return <p>Loading...</p>;

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
        <div
          onClick={() => fileRef.current.click()}
          className="w-[120px] h-[120px] rounded-full"
        >
          <img
            src={localFile || profile.userImg}
            className="max-w-full max-h-full object-cover"
            alt=""
          />
        </div>
        <input
          ref={fileRef}
          onChange={handleFileChange}
          aria-label="eng"
          type="file"
          hidden
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
