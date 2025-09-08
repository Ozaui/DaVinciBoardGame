import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch } from "../../hooks/AppHook";
import type { Post } from "../../types/PostType";
import { postValidationSchme } from "../../schemas/postSchema";
import { updatePostThunk } from "../../features/posts/postsThunk";
import styles from "../../css/Post/PostUpdate.module.css";

type UpdatePostProps = {
  post: Post;
  onClose: () => void;
};

const UpdatePost: React.FC<UpdatePostProps> = ({ post, onClose }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.updatePostWrapper}>
      <h2 className={styles.updateTitle}>Update Post</h2>
      <Formik
        initialValues={{ title: post.title }}
        validationSchema={postValidationSchme}
        onSubmit={(values) => {
          const updatePost: Post = { ...post, title: values.title };
          dispatch(updatePostThunk(updatePost));
          onClose();
        }}
      >
        <Form className={styles.updateForm}>
          <Field name="title" className={styles.inputField} />
          <ErrorMessage name="title">
            {(msg) => <div className={styles.errorMsg}>{msg}</div>}
          </ErrorMessage>

          <div className={styles.updateActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              <span className="circle1"></span>
              <span className="circle2"></span>
              <span className="circle3"></span>
              <span className="circle4"></span>
              <span className="circle5"></span>
              <span className="text">İptal</span>
            </button>
            <button type="submit" className={styles.updateButton}>
              <span className="circle1"></span>
              <span className="circle2"></span>
              <span className="circle3"></span>
              <span className="circle4"></span>
              <span className="circle5"></span>
              <span className="text">Postu Düzenle</span>
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdatePost;
