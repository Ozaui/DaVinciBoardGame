import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/AppHook";
import { deleteUserThunk, fetchUsers } from "../features/users/usersThunk";
import Loading from "../components/Loading";
import CreateUser from "../components/User/CreateUser";
import UpdateUser from "../components/User/UpdateUser";
import CreatePost from "../components/Post/CreatePost";
import { Link } from "react-router-dom";

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [creatingPostFor, setCreatingPostFor] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      <Link to="/posts">Go to Posts</Link>
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
            <button onClick={() => dispatch(deleteUserThunk(user.id))}>
              Delete User
            </button>
            <button
              onClick={() =>
                setCreatingPostFor(creatingPostFor === user.id ? null : user.id)
              }
            >
              Create Post
            </button>

            {/* Update User Form */}
            {editingUserId === user.id && (
              <UpdateUser user={user} onClose={() => setEditingUserId(null)} />
            )}

            {/* Create Post Form */}
            {creatingPostFor === user.id && <CreatePost userId={user.id} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
