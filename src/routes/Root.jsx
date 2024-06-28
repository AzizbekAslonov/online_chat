import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import Users from "../components/Users";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faUser } from "@fortawesome/free-solid-svg-icons";
import { setUser } from "../store/slices/appSlices";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileModal from "../components/ProfileModal";

export default function Root() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to={"register"} />;
  }

  const logoutHandler = () => {
    localStorage.removeItem("user");
    dispatch(setUser(null));
    navigate("login");
  };

  return (
    <div className="flex h-screen  bg-gray-100 ">
      <ToastContainer />
      <div className="flex-[1_1_30%] bg-saidbar-background   text-white h-screen min-h-[100vh] ">
        <nav className="flex items-center justify-between">
          <div className="flex mr-3 mt-3">
            <FontAwesomeIcon
              className="cursor-pointer"
              onClick={logoutHandler}
              size="xl"
              icon={faBackspace}
            />
            <h3 className="mx-2">Logout </h3>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon
              className="cursor-pointer"
              onClick={() => setShowModal(true)}
              size="xl"
              icon={faUser}
            />
            <h3 className="mx-2">Profile</h3>
          </div>
        </nav>
        <ul role="list" className="w-full">
          <Users />
        </ul>
      </div>
      <div className="flex-[1_1_70%] bg-channel-background bg-slate-500  text-white overflow-y-auto  h-screen min-h-[100vh]">
        <Outlet />
      </div>
      <ProfileModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
