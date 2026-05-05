import React from "react";

const SidebarUser = () => {
  return (
    <div className="w-64 bg-black text-white p-5">
      <h2 className="text-xl font-bold mb-6">User Panel</h2>

      <ul className="space-y-3">
        <li>Dashboard</li>
        <li>Profile</li>
      </ul>
    </div>
  );
};

export default SidebarUser;