import React from "react";
import SidebarUser from "./SidebarUser";
import HeaderUser from "./HeaderUser";

const UserDashboard = ({ currentUser }) => {
  return (
    <div className="flex min-h-screen bg-gray-200">

      <SidebarUser />

      <div className="flex-1 p-6">
        <HeaderUser currentUser={currentUser} />

        <h2 className="text-lg font-semibold mb-4">
          Welcome User: {currentUser.name}
        </h2>

        {/* User-specific content */}
      </div>
    </div>
  );
};

export default UserDashboard;