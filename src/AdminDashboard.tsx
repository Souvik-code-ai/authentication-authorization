import React, { useEffect, useState } from "react";

import SidebarAdmin from "./SidebarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import ManageUsers from "./ManageUsers";
import Signup from "./Signup";

const AdminDashboard = ({ currentUser }) => {

  const [activePage, setActivePage] = useState("dashboard");

  // ✅ USERS STATE FOR ANALYTICS
  const [users, setUsers] = useState([]);

  const API = "https://69b17104adac80b427c530f7.mockapi.io/users";

  // ✅ FETCH USERS
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(API);
    const data = await res.json();

    setUsers(data);
  };

  // ✅ TOTAL ADMINS
  const totalAdmins = users.filter(
    (user) => user.role === "admin"
  ).length;

  // ✅ TOTAL USERS
  const totalUsers = users.filter(
    (user) => user.role === "user"
  ).length;

  return (
    <div className="flex min-h-screen bg-gray-200">

      {/* SIDEBAR */}
      <SidebarAdmin
        setActivePage={setActivePage}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <HeaderAdmin
          currentUser={currentUser}
          setActivePage={setActivePage}
        />

        {/* ✅ DASHBOARD */}
        {activePage === "dashboard" && (

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-3xl font-bold mb-6">
              Admin Dashboard
            </h2>

            <div className="space-y-4 text-lg">

              <p>
                <strong>Name:</strong> {currentUser.name}
              </p>

              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>

              <p>
                <strong>Role:</strong> {currentUser.role}
              </p>

              <p>
                <strong>User ID:</strong> {currentUser.id}
              </p>

            </div>

          </div>
        )}

        {/* ✅ MANAGE USERS */}
        {activePage === "manageUsers" && (
          <ManageUsers />
        )}

        {/* ✅ ADD USER */}
        {activePage === "addUser" && (
          <Signup />
        )}

        {/* ✅ ANALYTICS */}
        {activePage === "analytics" && (

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-3xl font-bold mb-6">
              Analytics Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* TOTAL ADMINS */}
              <div className="bg-blue-500 text-white p-6 rounded-xl">

                <h3 className="text-xl mb-2">
                  Total Admins
                </h3>

                <p className="text-4xl font-bold">
                  {totalAdmins}
                </p>

              </div>

              {/* TOTAL USERS */}
              <div className="bg-green-500 text-white p-6 rounded-xl">

                <h3 className="text-xl mb-2">
                  Total Users
                </h3>

                <p className="text-4xl font-bold">
                  {totalUsers}
                </p>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;