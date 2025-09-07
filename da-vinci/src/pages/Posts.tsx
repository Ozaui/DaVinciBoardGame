import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/AppHook";
import { deletePostThunk, fetchPosts } from "../features/posts/postsThunk";
import { fetchUsers } from "../features/users/usersThunk";
import Loading from "../components/Loading";
import type { Post } from "../types/PostType";
import UpdatePost from "../components/Post/UpdatePost";

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

  const [editingPostId, setEditingPostId] = useState<number | null>();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Locale kaydettiğimiz postları çektim.
  const postsFromLocal: Post[] = JSON.parse(
    localStorage.getItem("localPosts") || "[]"
  );

  //Locale kaydettiğim postları ve apidan gelenleri birleştirdim.
  //Normalde api database kaydetseydi bu tarz karmaşık yapılara ihtiyacımız olmuycaktı.
  const allPosts = [...posts, ...postsFromLocal];

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
        {allPosts.map((post) => {
          const user = users.find((u) => u.id === post.userId);
          return (
            <li key={post.id}>
              <h2>PostID : {post.id}</h2>
              <h2>Title: {post.title}</h2>
              <h4>User: {user ? user.name : "Bilinmeyen kullanıcı"}</h4>
              {editingPostId === post.id && (
                <UpdatePost
                  post={post}
                  onClose={() => setEditingPostId(null)}
                />
              )}
              <button onClick={() => dispatch(deletePostThunk(post.id))}>
                Postu sil
              </button>

              <button onClick={() => setEditingPostId(post.id)}>
                Postu Düzenle
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
