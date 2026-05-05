import React from "react";

const HeaderUser = ({ currentUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between mb-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      <button
        onClick={handleLogout}
        className="bg-black text-white px-3 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default HeaderUser;