import React from "react";
import SidebarAdmin from "./SidebarAdmin";
import HeaderAdmin from "./HeaderAdmin";

const AdminDashboard = ({ currentUser }) => {
  return (
    <div className="flex min-h-screen bg-gray-200">

      <SidebarAdmin />

      <div className="flex-1 p-6">
        <HeaderAdmin currentUser={currentUser} />

        <h2 className="text-lg font-semibold mb-4">
          Welcome Admin: {currentUser.name}
        </h2>

        {/* Admin-specific content */}
      </div>
    </div>
  );
};

export default AdminDashboard;