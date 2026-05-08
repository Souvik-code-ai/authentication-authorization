import {
  useState,
  type ChangeEvent,
} from "react";

import SidebarUser from "./SidebarUser";
import HeaderUser from "./HeaderUser";


interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}


interface UserDashboardProps {
  currentUser: User;
}


interface UserData {
  name: string;
  email: string;
  role: string;
}

const UserDashboard = ({
  currentUser,
}: UserDashboardProps) => {


  const [activePage, setActivePage] =
    useState<string>("dashboard");


  const [editMode, setEditMode] =
    useState<boolean>(false);

 
  const [userData, setUserData] =
    useState<UserData>({
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
    });

  const API =
    "https://69b17104adac80b427c530f7.mockapi.io/users";


  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {

    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };


  const handleUpdate =
    async (): Promise<void> => {

      try {

        const res = await fetch(
          `${API}/${currentUser.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              ...currentUser,
              ...userData,
            }),
          }
        );

        const updatedUser: User =
          await res.json();

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setEditMode(false);

        alert(
          "Profile Updated Successfully"
        );

      } catch (error) {

        console.log(
          "Update Error",
          error
        );
      }
    };

  const handleDelete =
    async (): Promise<void> => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete your account?"
        );

      if (!confirmDelete) return;

      try {

        await fetch(
          `${API}/${currentUser.id}`,
          {
            method: "DELETE",
          }
        );

        localStorage.removeItem("user");

        window.location.href = "/";

      } catch (error) {

        console.log(
          "Delete Error",
          error
        );
      }
    };

  return (
    <div className="flex min-h-screen bg-gray-200">


      <SidebarUser
        setActivePage={setActivePage}
      />

     
      <div className="flex-1 p-6">

   
        <HeaderUser
          currentUser={currentUser}
        />

        {activePage === "dashboard" && (

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-3xl font-bold mb-6">
              User Dashboard
            </h2>

            <div className="space-y-4 text-lg">

              <p>
                Welcome back,
                <strong>
                  {" "}
                  {currentUser.name}
                </strong>
              </p>

              <p>
                Your role is:
                <strong>
                  {" "}
                  {currentUser.role}
                </strong>
              </p>

              <p>
                Your registered email:
                <strong>
                  {" "}
                  {currentUser.email}
                </strong>
              </p>

            </div>

          </div>
        )}


        {activePage === "profile" && (

          <div className="bg-white p-6 rounded-xl shadow max-w-2xl">

            <h2 className="text-3xl font-bold mb-6">
              User Profile
            </h2>

            {editMode ? (

              <>


                <div className="space-y-4">

                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    className="border p-3 rounded w-full"
                  />

                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="border p-3 rounded w-full"
                  />

                  <input
                    type="text"
                    name="role"
                    value={userData.role}
                    disabled
                    className="border p-3 rounded w-full bg-gray-100"
                  />

                </div>

         
                <div className="flex gap-4 mt-6">

                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-5 py-2 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() =>
                      setEditMode(false)
                    }
                    className="bg-gray-500 text-white px-5 py-2 rounded"
                  >
                    Cancel
                  </button>

                </div>
              </>

            ) : (

              <>
     

                <div className="space-y-4 text-lg">

                  <p>
                    <strong>Name:</strong>{" "}
                    {userData.name}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {userData.email}
                  </p>

                  <p>
                    <strong>Role:</strong>{" "}
                    {userData.role}
                  </p>

                  <p>
                    <strong>User ID:</strong>{" "}
                    {currentUser.id}
                  </p>

                </div>


                <div className="flex gap-4 mt-6">

                  <button
                    onClick={() =>
                      setEditMode(true)
                    }
                    className="bg-blue-500 text-white px-5 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-5 py-2 rounded"
                  >
                    Delete Account
                  </button>

                </div>
              </>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default UserDashboard;