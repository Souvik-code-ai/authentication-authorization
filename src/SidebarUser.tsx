import React from "react";

const SidebarUser = ({ setActivePage }) => {
  return (
    <div className="w-64 bg-black text-white p-5">

      <h2 className="text-2xl font-bold mb-8">
        User Panel
      </h2>

      <ul className="space-y-4">

        <li
          onClick={() => setActivePage("dashboard")}
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
        >
          Dashboard
        </li>

        <li
          onClick={() => setActivePage("profile")}
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
        >
          Profile
        </li>

      </ul>
    </div>
  );
};

export default SidebarUser;