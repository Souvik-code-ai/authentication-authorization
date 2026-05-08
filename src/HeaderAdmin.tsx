import React from "react";

const HeaderAdmin = ({ setActivePage }) => {

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center mb-6">

      {/* LEFT SIDE */}
      <div className="flex gap-4">

        <button
          onClick={() => setActivePage("dashboard")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Dashboard
        </button>

        <button
          onClick={() => setActivePage("manageUsers")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Manage Users
        </button>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex gap-3">

        {/* ✅ ADD USER BUTTON */}
        <button
          onClick={() => setActivePage("addUser")}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default HeaderAdmin;