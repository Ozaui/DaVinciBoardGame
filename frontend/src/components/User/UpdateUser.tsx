import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch } from "../../hooks/AppHook";
import type { User } from "../../types/UserType";
import { updateUserThunk } from "../../features/users/usersThunk";
import { userValidationSchema } from "../../schemas/userSchema";
import styles from "../../css/Users/UpdateUser.module.css";

type UpdateUserProps = {
  user: User;
  onClose: () => void;
};
const UpdateUser: React.FC<UpdateUserProps> = ({ user, onClose }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.updateUserCard}>
      <Formik
        validationSchema={userValidationSchema}
        initialValues={{
          name: user.name,
          username: user.username,
          email: user.email,
        }}
        onSubmit={(values) => {
          dispatch(updateUserThunk({ ...user, ...values }));
          onClose();
        }}
      >
        <Form className={styles.updateUserForm}>
          <div className={styles.formGroup}>
            <Field
              name="name"
              placeholder="Name"
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
              placeholder="Username"
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
              placeholder="Email"
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
              <span className={styles.text}>Düzenle</span>
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

export default UpdateUser;
