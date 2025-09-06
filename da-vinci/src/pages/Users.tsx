import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/AppHook";
import { fetchUsers } from "../features/users/usersThunk";
import Loading from "../components/Loading";
import CreateUser from "../components/User/CreateUser";
import UpdateUser from "../components/User/UpdateUser";

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      <CreateUser />
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: "20px" }}>
            <h3>{user.name}</h3>
            <p>{user.username}</p>
            <p>mail: {user.email}</p>
            <button
              onClick={() =>
                setEditingUserId(editingUserId === user.id ? null : user.id)
              }
            >
              Edit
            </button>

            {/* Sadece bu kullanıcının ID'si editingUserId ile eşleşirse form göster */}
            {editingUserId === user.id && (
              <UpdateUser user={user} onClose={() => setEditingUserId(null)} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
