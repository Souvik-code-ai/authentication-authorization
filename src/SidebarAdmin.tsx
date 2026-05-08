import React, { useEffect, useState } from "react";

const SidebarAdmin = ({ setActivePage }) => {

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

  // ✅ COUNT ADMINS
  const totalAdmins = users.filter(
    (user) => user.role === "admin"
  ).length;

  // ✅ COUNT USERS
  const totalUsers = users.filter(
    (user) => user.role === "user"
  ).length;

  return (
    <div className="w-64 bg-black text-white p-5 min-h-screen">

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-8">
        Admin Panel
      </h2>

      {/* MENU */}
      <ul className="space-y-4 mb-10">

        <li
          onClick={() => setActivePage("dashboard")}
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
        >
          Dashboard
        </li>

        <li
          onClick={() => setActivePage("manageUsers")}
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
        >
          Manage Users
        </li>

        <li
          onClick={() => setActivePage("analytics")}
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
        >
          Analytics
        </li>

        <li
          onClick={() => setActivePage("settings")}
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
        >
          Settings
        </li>

      </ul>

      {/* ✅ ANALYTICS CARD */}
      {/* <div className="bg-gray-800 p-4 rounded-xl space-y-4"> */}

        {/* <h3 className="text-xl font-semibold">
          Analytics
        </h3> */}

        {/* TOTAL ADMINS */}
        {/* <div className="bg-blue-500 p-3 rounded-lg">
          <p className="text-sm">
            Total Admins
          </p>

          <h2 className="text-2xl font-bold">
            {totalAdmins}
          </h2>
        </div>

        
        <div className="bg-green-500 p-3 rounded-lg">
          <p className="text-sm">
            Total Users
          </p>

          <h2 className="text-2xl font-bold">
            {totalUsers}
          </h2>
        </div> */}

 
    </div>
  );
};

export default SidebarAdmin;