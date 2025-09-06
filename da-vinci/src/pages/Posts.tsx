import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/AppHook";
import { fetchPosts } from "../features/posts/postsThunk";
import { fetchUsers } from "../features/users/usersThunk";
import Loading from "../components/Loading";

const Posts: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    posts,
    loading: postsLoading,
    error: postsError,
  } = useAppSelector((state) => state.posts);
  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  if (postsLoading || usersLoading) return <Loading />;
  if (postsError || usersError)
    return (
      <div>
        {postsError && <h1>Post error: {postsError}</h1>}
        {usersError && <h1>User error: {usersError}</h1>}
      </div>
    );
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => {
          const user = users.find((u) => u.id === post.userId);
          return (
            <li key={post.id}>
              <h2>PostID : {post.id}</h2>
              <h2>Title: {post.title}</h2>
              <h4>User: {user ? user.name : "Bilinmeyen kullanıcı"}</h4>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
