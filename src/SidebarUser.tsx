import React from "react";

// ✅ PROPS TYPE
interface SidebarUserProps {
  setActivePage: React.Dispatch<
    React.SetStateAction<string>
  >;
}

const SidebarUser = ({
  setActivePage,
}: SidebarUserProps) => {

  return (
    <div className="w-64 bg-black text-white p-5 min-h-screen">

      <h2 className="text-2xl font-bold mb-8">
        User Panel
      </h2>

      {/* MENU */}
      <ul className="space-y-4">

        <li
          onClick={() =>
            setActivePage("dashboard")
          }
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
        >
          Dashboard
        </li>

        <li
          onClick={() =>
            setActivePage("profile")
          }
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
        >
          Profile
        </li>

      </ul>

    </div>
  );
};

export default SidebarUser;