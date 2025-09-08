import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks/AppHook";
import { postValidationSchme } from "../../schemas/postSchema";
import { createPostThunk } from "../../features/posts/postsThunk";
import { addPost } from "../../features/posts/postsSlice";
import styles from "../../css/Post/CreatePost.module.css";

type CreatePostProps = {
  userId: number;
};

const CreatePost: React.FC<CreatePostProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const { posts, status } = useAppSelector((state) => state.posts);
  return (
    <div className={styles.createPostCard}>
      <h2 className={styles.createPostHeader}>Add Post</h2>
      <Formik
        initialValues={{ title: "" }}
        validationSchema={postValidationSchme}
        onSubmit={(values, { resetForm }) => {
          const newPost = {
            id: Math.max(...posts.map((p) => p.id)) + 1,
            userId,
            title: values.title,
          };
          dispatch(createPostThunk(newPost));
          dispatch(addPost(newPost));
          resetForm();
        }}
      >
        <Form className={styles.createPostForm}>
          <Field
            name="title"
            placeholder="Post Başlığını giriniz"
            className={styles.postInput}
          />
          {status && <p>İşlem Başarılı</p>}
          <ErrorMessage
            name="title"
            component="div"
            className={styles.errorMessage}
          />
          <button type="submit" className={styles.submitButton}>
            <span className={styles.circle1}></span>
            <span className={styles.circle2}></span>
            <span className={styles.circle3}></span>
            <span className={styles.circle4}></span>
            <span className={styles.circle5}></span>
            <span className={styles.text}>Post Ekle</span>
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
