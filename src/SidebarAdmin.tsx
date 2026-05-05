import React from "react";

const SidebarAdmin = () => {
  return (
    <div className="w-64 bg-black text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <ul className="space-y-3">
        <li>Dashboard</li>
        <li>Manage Users</li>
        <li>Analytics</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;