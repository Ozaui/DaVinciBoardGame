import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/AppHook";
import { fetchUsers } from "../features/users/usersThunk";
import Loading from "../components/Loading";

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.username}</p>
            <p>mail: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
