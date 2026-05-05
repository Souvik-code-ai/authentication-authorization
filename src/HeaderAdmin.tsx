import React from "react";

const HeaderAdmin = ({ currentUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between mb-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="flex gap-3">
        <button className="bg-purple-500 text-white px-3 py-2 rounded">
          Add User
        </button>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-3 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HeaderAdmin;