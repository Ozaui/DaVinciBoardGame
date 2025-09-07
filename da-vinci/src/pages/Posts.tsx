import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/AppHook";
import { deletePostThunk, fetchPosts } from "../features/posts/postsThunk";
import { fetchUsers } from "../features/users/usersThunk";
import Loading from "../components/Loading";
import type { Post } from "../types/PostType";
import UpdatePost from "../components/Post/UpdatePost";
import styles from "../css/Post/PostPage.module.css";

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
    <div className={styles.postsContainer}>
      <h2 className={styles.postsHeader}>Posts</h2>
      <div className={styles.postsWrapper}>
        {allPosts.map((post) => {
          const user = users.find((u) => u.id === post.userId);
          const isEditing = editingPostId === post.id;

          return (
            <div key={post.id} className={styles.postCard}>
              <h2 className={styles.postId}>
                <span className={styles.postIdLabel}>Post ID:</span> {post.id}
              </h2>
              <h2 className={styles.postTitle}>
                <span className={styles.postTitleLabel}>Title:</span>{" "}
                {post.title}
              </h2>
              <h4 className={styles.postUser}>
                <span className={styles.postUserLabel}>User:</span>{" "}
                {user ? user.name : "Bilinmeyen kullanıcı"}
              </h4>

              <div
                className={`${styles.updateWrapper} ${isEditing ? styles.active : ""}`}
              >
                {isEditing && (
                  <UpdatePost
                    post={post}
                    onClose={() => setEditingPostId(null)}
                  />
                )}
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => dispatch(deletePostThunk(post.id))}
                >
                  Postu Sil
                </button>

                {editingPostId !== post.id && (
                  <button
                    className={styles.editBtn}
                    onClick={() => setEditingPostId(post.id)}
                  >
                    Postu Düzenle
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
