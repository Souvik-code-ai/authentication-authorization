import { useEffect, useState } from "react";

import SidebarAdmin from "./SidebarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import ManageUsers from "./ManageUsers";
import Signup from "./Signup";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}


interface AdminDashboardProps {
  currentUser: User;
}

const AdminDashboard = ({
  currentUser,
}: AdminDashboardProps) => {


  const [activePage, setActivePage] =
    useState<string>("dashboard");


  const [users, setUsers] = useState<User[]>([]);

  const API =
    "https://69b17104adac80b427c530f7.mockapi.io/users";
      const fetchUsers = async (): Promise<void> => {
    try {
      const res = await fetch(API);

      const data: User[] = await res.json();

      setUsers(data);

    } catch (error) {
      console.log("Error fetching users", error);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);




  const totalAdmins = users.filter(
    (user) => user.role === "admin"
  ).length;


  const totalUsers = users.filter(
    (user) => user.role === "user"
  ).length;

  return (
    <div className="flex min-h-screen bg-gray-200">


      <SidebarAdmin
        setActivePage={setActivePage}
      />

      <div className="flex-1 p-6">


        <HeaderAdmin
          currentUser={currentUser}
          setActivePage={setActivePage}
        />


        {activePage === "dashboard" && (

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-3xl font-bold mb-6">
              Admin Dashboard
            </h2>

            <div className="space-y-4 text-lg">

              <p>
                <strong>Name:</strong>{" "}
                {currentUser.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {currentUser.email}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {currentUser.role}
              </p>

              <p>
                <strong>User ID:</strong>{" "}
                {currentUser.id}
              </p>

            </div>

          </div>
        )}

      
        {activePage === "manageUsers" && (
          <ManageUsers />
        )}

 
        {activePage === "addUser" && (
          <Signup />
        )}

    
        {activePage === "analytics" && (

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-3xl font-bold mb-6">
              Analytics Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


              <div className="bg-blue-500 text-white p-6 rounded-xl">

                <h3 className="text-xl mb-2">
                  Total Admins
                </h3>

                <p className="text-4xl font-bold">
                  {totalAdmins}
                </p>

              </div>

 
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