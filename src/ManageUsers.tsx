import React, { useEffect, useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const [editId, setEditId] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const API = "https://69b17104adac80b427c530f7.mockapi.io/users";

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ GET USERS
  const fetchUsers = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setUsers(data);
  };

  // ✅ DELETE USER
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    setUsers(users.filter((user) => user.id !== id));
  };

  // ✅ EDIT BUTTON CLICK
  const handleEditClick = (user) => {
    setEditId(user.id);

    setEditData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ UPDATE USER (PUT API)
  const handleUpdate = async (id) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(editData),
    });

    const updatedUser = await res.json();

    setUsers(
      users.map((user) =>
        user.id === id ? updatedUser : user
      )
    );

    setEditId(null);
  };

  return (
    <div>

      <h2 className="text-3xl font-bold mb-6">
        Manage Users
      </h2>

      <div className="space-y-4">

        {users.map((user) => (

          <div
            key={user.id}
            className="bg-white p-5 rounded-xl shadow"
          >

            {editId === user.id ? (

              <>
                {/* ✅ EDIT FORM */}

                <div className="space-y-3">

                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="border p-2 rounded w-full"
                  />

                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 rounded w-full"
                  />

                  <select
                    name="role"
                    value={editData.role}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>

                </div>

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>

                </div>
              </>

            ) : (

              <>
                {/* ✅ USER INFO */}

                <div className="space-y-2">

                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>

                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>

                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>

                </div>

                {/* ✅ ACTION BUTTONS */}

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
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
  );
};

export default ManageUsers;