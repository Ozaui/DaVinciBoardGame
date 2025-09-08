import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/AppHook";
import { deleteUserThunk, fetchUsers } from "../features/users/usersThunk";
import Loading from "../components/Loading";
import CreateUser from "../components/User/CreateUser";
import UpdateUser from "../components/User/UpdateUser";
import CreatePost from "../components/Post/CreatePost";
import styles from "../css/Users/UserPage.module.css";
import { Link } from "react-router-dom";

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [creatingPostFor, setCreatingPostFor] = useState<number | null>(null);
  const [createUser, setCreateUser] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <h1>{error}</h1>;

  return (
    <div className={styles.usersContainer}>
      <h2 className={styles.usersHeader}>Users</h2>
      {/* Create User Button */}
      <div className={styles.mainButtons}>
        <div className={styles.createUserWrapper}>
          <button
            className={styles.createUserButton}
            onClick={() => setCreateUser(true)}
          >
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">Kullanıcı Oluştur</span>
          </button>
          {createUser && (
            <div className={styles.createUserPopup}>
              <CreateUser onClose={() => setCreateUser(false)} />
            </div>
          )}
        </div>
        <div className={styles.navigateButtons}>
          <Link to={"/posts"} className={styles.noStyleLink}>
            <button className={styles.navigateButton}>
              <span className="circle1"></span>
              <span className="circle2"></span>
              <span className="circle3"></span>
              <span className="circle4"></span>
              <span className="circle5"></span>
              <span className="text"> Posts</span>
            </button>
          </Link>
          <Link to={"/"} className={styles.noStyleLink}>
            <button className={styles.navigateButton}>
              <span className="circle1"></span>
              <span className="circle2"></span>
              <span className="circle3"></span>
              <span className="circle4"></span>
              <span className="circle5"></span>
              <span className="text">Ana Sayfa</span>
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.usersWrapper}>
        {users.map((user) => {
          const isEditing = editingUserId === user.id;
          const isCreatingPost = creatingPostFor === user.id;

          return (
            <div key={user.id} className={styles.userCard}>
              <h3 className={styles.userName}>{user.name}</h3>
              <p className={styles.userUsername}>Username: {user.username}</p>
              <p className={styles.userEmail}>Email: {user.email}</p>

              <div className={styles.userActions}>
                <button
                  className={styles.editButton}
                  onClick={() => setEditingUserId(isEditing ? null : user.id)}
                >
                  <span className="circle1"></span>
                  <span className="circle2"></span>
                  <span className="circle3"></span>
                  <span className="circle4"></span>
                  <span className="circle5"></span>
                  <span className="text">Düzenle</span>
                </button>

                <button
                  className={styles.deleteButton}
                  onClick={() => dispatch(deleteUserThunk(user.id))}
                >
                  <span className="circle1"></span>
                  <span className="circle2"></span>
                  <span className="circle3"></span>
                  <span className="circle4"></span>
                  <span className="circle5"></span>
                  <span className="text">Sil</span>
                </button>

                <button
                  className={styles.createPostButton}
                  onClick={() =>
                    setCreatingPostFor(isCreatingPost ? null : user.id)
                  }
                >
                  <span className="circle1"></span>
                  <span className="circle2"></span>
                  <span className="circle3"></span>
                  <span className="circle4"></span>
                  <span className="circle5"></span>
                  <span className="text">Yeni Post</span>
                </button>
              </div>

              {/* Update User Form */}
              {isEditing && (
                <div
                  className={`${styles.updateUserWrapper} ${
                    isEditing ? styles.active : ""
                  }`}
                >
                  <UpdateUser
                    user={user}
                    onClose={() => setEditingUserId(null)}
                  />
                </div>
              )}

              {/* Create Post Form */}
              {isCreatingPost && (
                <div
                  className={`${styles.createPostWrapper} ${
                    isCreatingPost ? styles.active : ""
                  }`}
                >
                  <CreatePost userId={user.id} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
