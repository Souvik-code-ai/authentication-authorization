import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}


interface HeaderAdminProps {

  currentUser: User;

  setActivePage: React.Dispatch<
    React.SetStateAction<string>
  >;
}

const HeaderAdmin = ({
  currentUser,
  setActivePage,
}: HeaderAdminProps) => {


  const handleLogout = (): void => {

    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow">


      <div className="flex gap-4">

        <button
          onClick={() =>
            setActivePage("dashboard")
          }
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Dashboard
        </button>

        <button
          onClick={() =>
            setActivePage("manageUsers")
          }
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Manage Users
        </button>

      </div>

      <div className="flex items-center gap-4">


        <p className="font-semibold">
          Welcome, {currentUser.name}
        </p>

        <button
          onClick={() =>
            setActivePage("addUser")
          }
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>


        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default HeaderAdmin;