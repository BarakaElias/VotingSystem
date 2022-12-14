import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import NotyfContext from "./../../contexts/NotyfContext";
import useAuth from "../../hooks/useAuth";
import country_dial_codes from "../../utils/country_dial_codes";

//rtk query
import { useAddUserMutation } from "../../redux/slices/user";

function SignUp() {
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const notyf = useContext(NotyfContext);

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "coord",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("User's name is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Must be at least 8 characters")
          .max(255)
          .required("Password is required"),
        confirmPassword: Yup.string()
          .min(8, "Must be at least 8 characters")
          .max(255)
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Must confirm your password"),
        role: Yup.string().required("A usesr role type is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // signUp(values.name, values.password, values.email);
          console.log("Signup componenet", "Adding user");
          const new_user = await addUser({
            name: values.name,
            password: values.password,
            email: values.email,
            role: values.role,
          });
          console.log("New user", new_user);
          console.log("New user data", new_user.data);
          if (new_user.data.id) {
            notyf.success(`Successfully created user ${new_user.data.name}`);
          }

          // navigate("/auth/sign-in");
        } catch (error) {
          const message = error.message || "Something went wrong";
          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <Form onSubmit={handleSubmit}>
          {errors.submit && (
            <Alert className="my-3" variant="danger">
              {errors.submit}
            </Alert>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="John Doe"
              value={values.name}
              isInvalid={Boolean(touched.name && errors.name)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.name && (
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email address"
              value={values.email}
              isInvalid={Boolean(touched.email && errors.email)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              isInvalid={Boolean(touched.password && errors.password)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Password"
              value={values.confirmPassword}
              isInvalid={Boolean(
                touched.confirmPassword && errors.confirmPassword
              )}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.confirmPassword && (
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Select role</Form.Label>
            <Form.Select onChange={handleChange} name="role">
              <option value="coord">Coordinator</option>
              <option value="admin">Administrator</option>
            </Form.Select>
          </Form.Group>
          <div className="text-center mt-3">
            <Button type="submit" variant="primary" size="lg">
              Create User
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
