import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch } from "../../hooks/AppHook";
import type { User } from "../../types/UserType";
import { updateUserThunk } from "../../features/users/usersThunk";
import { userValidationSchema } from "../../schemas/userSchema";

type UpdateUserProps = {
  user: User;
  onClose: () => void;
};
const UpdateUser: React.FC<UpdateUserProps> = ({ user, onClose }) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Formik
        validationSchema={userValidationSchema}
        initialValues={{
          name: user.name,
          username: user.username,
          email: user.email,
        }}
        onSubmit={(values) => {
          dispatch(updateUserThunk({ ...user, ...values }));
        }}
      >
        <Form>
          <div>
            <Field name="name" placeholder="Name" />
            <ErrorMessage name="name" />
          </div>
          <div>
            <Field name="username" placeholder="Username" />
            <ErrorMessage name="username" />
          </div>
          <div>
            <Field name="email" placeholder="Email" />
            <ErrorMessage name="email" />
          </div>
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdateUser;
