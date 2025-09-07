import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch } from "../../hooks/AppHook";
import type { Post } from "../../types/PostType";
import { postValidationSchme } from "../../schemas/postSchema";
import { updatePostThunk } from "../../features/posts/postsThunk";

type UpdatePostProps = {
  post: Post;
  onClose: () => void;
};

const UpdatePost: React.FC<UpdatePostProps> = ({ post, onClose }) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <h2>Update Post</h2>
      <Formik
        initialValues={{ title: post.title }}
        validationSchema={postValidationSchme}
        onSubmit={(values) => {
          const updatePost: Post = { ...post, title: values.title };
          dispatch(updatePostThunk(updatePost));
          onClose();
        }}
      >
        <Form>
          <Field name="title" />
          <ErrorMessage name="title" />
          <button type="submit">Güncelle</button>
          <button type="button" onClick={onClose}>
            İptal
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdatePost;
