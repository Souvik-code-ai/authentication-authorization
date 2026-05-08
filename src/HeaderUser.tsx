


interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}


interface HeaderUserProps {
  currentUser: User;
}

const HeaderUser = ({
  currentUser,
}: HeaderUserProps) => {


  const handleLogout = (): void => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between mb-6">

      <h1 className="text-2xl font-bold">
        User Dashboard
      </h1>

      <div className="flex items-center gap-4">

        <p className="font-medium">
          Welcome, {currentUser.name}
        </p>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-3 py-2 rounded"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default HeaderUser;