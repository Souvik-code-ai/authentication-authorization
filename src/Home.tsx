import React, { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const API = "https://69b17104adac80b427c530f7.mockapi.io/users";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(storedUser);
    fetchUsers(storedUser);
  }, []);

  const fetchUsers = async (loggedUser) => {
    const res = await fetch(API);
    const data = await res.json();

    if (loggedUser.role === "admin") {
      setUsers(data);
    } else {
      setUsers(data.filter((u) => u.id === loggedUser.id));
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleEditClick = (user) => {
    setEditId(user.id);
    setEditData({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };


  const handleUpdate = async (id) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    });

    const updatedUser = await res.json();

    setUsers(users.map((u) => (u.id === id ? updatedUser : u)));
    setEditId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6 flex justify-center">
      
      <div className="w-full max-w-4xl">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
            {currentUser?.role === "admin"
              ? "Admin Dashboard"
              : "User Dashboard"}
          </h1>

          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Logout
          </button>
        </div>

        {/* USER CARDS */}
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow rounded-xl p-4 flex flex-col gap-3"
            >
              {editId === user.id ? (
                <>
                  {/* ✏️ EDIT FORM */}
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    className="border p-2 rounded w-full"
                    placeholder="Name"
                  />

                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                    className="border p-2 rounded w-full"
                    placeholder="Email"
                  />

                  <input
                    type="password"
                    name="password"
                    value={editData.password}
                    onChange={handleEditChange}
                    className="border p-2 rounded w-full"
                    placeholder="Password"
                  />

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleUpdate(user.id)}
                      className="bg-green-500 text-white px-3 py-2 rounded w-full"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-400 text-white px-3 py-2 rounded w-full"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* 📄 DISPLAY */}
                  <div className="space-y-1 text-sm sm:text-base">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-blue-500 text-white px-3 py-2 rounded w-full"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded w-full"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;