import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../store/services/userServices";
import { useDispatch } from "react-redux";
import { setUsers } from "../store/slices/appSlices";

export default function Users() {
  const { data, isSuccess } = useGetUsersQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUsers(data));
    }
  }, [isSuccess]);

  return data
    ? data.map((user) => (
        <li key={user.id} className="w-full ">
          <div className="w-full transition hover:bg-teal-600 hover:bg-opacity-30 overflow-hidden">
            <div className="flex items-center gap-4 p-4  transition transform hover:scale-105">
              <img
                className="rounded-full w-16 h-16 object-cover"
                src={user.userImg}
                alt="User's image"
              />
              <span className="font-semibold">
                {user.userName || user.email}
              </span>
              <span className="text-yellow-300 text-lg">★</span>
            </div>
          </div>
        </li>
      ))
    : "loading...";
}
