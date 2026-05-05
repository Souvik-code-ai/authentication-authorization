import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(storedUser);
  }, []);

  if (!currentUser) return <h2>Loading...</h2>;

  return (
    <>
      {currentUser.role === "admin" ? (
        <AdminDashboard currentUser={currentUser} />
      ) : (
        <UserDashboard currentUser={currentUser} />
      )}
    </>
  );
};

export default Home;