import React, { useState } from "react";
import SidebarUser from "./SidebarUser";
import HeaderUser from "./HeaderUser";

const UserDashboard = ({ currentUser }) => {

  const [activePage, setActivePage] = useState("dashboard");

  const [editMode, setEditMode] = useState(false);

  const [userData, setUserData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    role: currentUser.role,
  });

  const API = "https://69b17104adac80b427c530f7.mockapi.io/users";

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ UPDATE USER
  const handleUpdate = async () => {

    const res = await fetch(`${API}/${currentUser.id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...currentUser,
        ...userData,
      }),
    });

    const updatedUser = await res.json();

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setEditMode(false);

    alert("Profile Updated Successfully");
  };

  // ✅ DELETE ACCOUNT
  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    await fetch(`${API}/${currentUser.id}`, {
      method: "DELETE",
    });

    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-gray-200">

      {/* SIDEBAR */}
      <SidebarUser setActivePage={setActivePage} />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <HeaderUser
          currentUser={currentUser}
          setActivePage={setActivePage}
        />

        {/* ✅ DASHBOARD SECTION */}
        {activePage === "dashboard" && (

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-3xl font-bold mb-6">
              User Dashboard
            </h2>

            <div className="space-y-4 text-lg">

              <p>
                Welcome back,
                <strong> {currentUser.name}</strong>
              </p>

              <p>
                Your role is:
                <strong> {currentUser.role}</strong>
              </p>

              <p>
                Your registered email:
                <strong> {currentUser.email}</strong>
              </p>

            </div>

          </div>
        )}

        {/* ✅ PROFILE SECTION */}
        {activePage === "profile" && (

          <div className="bg-white p-6 rounded-xl shadow max-w-2xl">

            <h2 className="text-3xl font-bold mb-6">
              User Profile
            </h2>

            {editMode ? (

              <>
                {/* EDIT FORM */}

                <div className="space-y-4">

                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    className="border p-3 rounded w-full"
                  />

                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="border p-3 rounded w-full"
                  />

                  <input
                    type="text"
                    name="role"
                    value={userData.role}
                    disabled
                    className="border p-3 rounded w-full bg-gray-100"
                  />

                </div>

                <div className="flex gap-4 mt-6">

                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-5 py-2 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-gray-500 text-white px-5 py-2 rounded"
                  >
                    Cancel
                  </button>

                </div>
              </>

            ) : (

              <>
                {/* USER INFO */}

                <div className="space-y-4 text-lg">

                  <p>
                    <strong>Name:</strong> {userData.name}
                  </p>

                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>

                  <p>
                    <strong>Role:</strong> {userData.role}
                  </p>

                  <p>
                    <strong>User ID:</strong> {currentUser.id}
                  </p>

                </div>

                {/* BUTTONS */}

                <div className="flex gap-4 mt-6">

                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-blue-500 text-white px-5 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-5 py-2 rounded"
                  >
                    Delete Account
                  </button>

                </div>
              </>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default UserDashboard;