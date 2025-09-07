import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks/AppHook";
import { postValidationSchme } from "../../schemas/postSchema";
import { createPostThunk } from "../../features/posts/postsThunk";
import { addPost } from "../../features/posts/postsSlice";

type CreatePostProps = {
  userId: number;
};

const CreatePost: React.FC<CreatePostProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.posts);
  return (
    <div>
      <h2>Add Post</h2>
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
        <Form>
          <Field name="title" placeholder="Post Başlığınıgiriniz" />
          <ErrorMessage name="title" />
          <button type="submit"> Post Ekle</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
