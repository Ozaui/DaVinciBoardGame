import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks/AppHook";
import { createUserThunk } from "../../features/users/usersThunk";

const CreateUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  return (
    <div>
      <h2>Add User</h2>

      <Formik
        initialValues={{ name: "", username: "", email: "" }}
        onSubmit={(values, { resetForm }) => {
          const newUser = {
            id: users.length + 1,
            name: values.name,
            username: values.username,
            email: values.email,
          };
          dispatch(createUserThunk(newUser));
          resetForm();
        }}
      >
        <Form>
          <div>
            <Field name="name" placeholder="İsminizi giriniz" />
            <ErrorMessage name="name" />
          </div>
          <div>
            <Field name="username" placeholder="Kullanıcı adınızı giriniz" />
            <ErrorMessage name="username" />
          </div>
          <div>
            <Field name="email" placeholder="Email adresinizi giriniz" />
            <ErrorMessage name="email" />
          </div>
          <button type="submit">Kullanıcı Ekle</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateUser;
