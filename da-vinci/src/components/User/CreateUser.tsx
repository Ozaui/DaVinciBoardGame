import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks/AppHook";
import { createUserThunk } from "../../features/users/usersThunk";
import { userValidationSchema } from "../../schemas/userSchema";
import styles from "../../css/Users/CreateUser.module.css";

type CreateUserProps = {
  onClose: () => void;
};
const CreateUser: React.FC<CreateUserProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  return (
    <div className={styles.createUserCard}>
      <h2 className={styles.createUserHeader}>Add User</h2>

      <Formik
        initialValues={{ name: "", username: "", email: "" }}
        validationSchema={userValidationSchema}
        onSubmit={(values, { resetForm }) => {
          const newUser = {
            id: users.length + 1,
            name: values.name,
            username: values.username,
            email: values.email,
          };
          dispatch(createUserThunk(newUser));
          resetForm();
          onClose();
        }}
      >
        <Form className={styles.createUserForm}>
          <div className={styles.formGroup}>
            <Field
              name="name"
              placeholder="İsminizi giriniz"
              className={styles.formInput}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.formGroup}>
            <Field
              name="username"
              placeholder="Kullanıcı adınızı giriniz"
              className={styles.formInput}
            />
            <ErrorMessage
              name="username"
              component="div"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.formGroup}>
            <Field
              name="email"
              placeholder="Email adresinizi giriniz"
              className={styles.formInput}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className={styles.userActions}>
            <button type="submit" className={styles.submitButton}>
              <span className={styles.circle1}></span>
              <span className={styles.circle2}></span>
              <span className={styles.circle3}></span>
              <span className={styles.circle4}></span>
              <span className={styles.circle5}></span>
              <span className={styles.text}>Kullanıcı Ekle</span>
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              <span className={styles.circle1}></span>
              <span className={styles.circle2}></span>
              <span className={styles.circle3}></span>
              <span className={styles.circle4}></span>
              <span className={styles.circle5}></span>
              <span className={styles.text}>İptal</span>
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateUser;
