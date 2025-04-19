import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../UserSlice";
import { useNavigate } from "react-router-dom";
import { selectLoggedInUser } from "../../auth/AuthSlice";

export const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const loggedInUser = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);
  

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  // useEffect(()=>{
  //   dispatch()
  // } , [errors])

  if (!userInfo) return <p className="text-center mt-10 text-gray-600">Loading user data...</p>;

  const {
    fullName,
    email,
    phoneNumber,
    role,
    salary,
    staffType,
    joiningDate,
    address,
  } = userInfo.data || {};

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">User Details</h1>

      <div className="space-y-3 text-gray-700">
        <p><span className="font-semibold">Name:</span> {fullName}</p>
        <p><span className="font-semibold">Email:</span> {email}</p>
        <p><span className="font-semibold">Phone:</span> {phoneNumber}</p>
        <p><span className="font-semibold">Role:</span> {role}</p>
        {salary && <p><span className="font-semibold">Salary:</span> ₹{salary}</p>}
        {staffType && <p><span className="font-semibold">Staff Type:</span> {staffType}</p>}
        {joiningDate && <p><span className="font-semibold">Joining Date:</span> {joiningDate}</p>}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {address ? (
          <button
            onClick={() => navigate("/updateAddress")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition"
          >
            Edit Your Address
          </button>
        ) : (
          <button
            onClick={() => navigate("/addAddress")}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition"
          >
            Add Your Address
          </button>
        )}

        {role === "worker" && ["manager", "admin"].includes(staffType) && (
          <button
            onClick={() => navigate("/newPlan")}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-xl transition"
          >
            Add Subscription Plan
          </button>
        )}
      </div>
    </div>
  );
};
