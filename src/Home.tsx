import { useEffect, useState } from "react";

import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";


interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const Home = () => {


  const [currentUser, setCurrentUser] =
    useState<User | null>(null);


  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);

      setCurrentUser(parsedUser);
    }

  }, []);

  if (!currentUser) {
    return (
      <h2 className="text-center mt-10 text-2xl">
        Loading...
      </h2>
    );
  }

  return (
    <>
      {currentUser.role === "admin" ? (

        <AdminDashboard
          currentUser={currentUser}
        />

      ) : (

        <UserDashboard
          currentUser={currentUser}
        />

      )}
    </>
  );
};

export default Home;