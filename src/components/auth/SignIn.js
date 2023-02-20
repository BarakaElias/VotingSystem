import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { setToken } from "../../redux/slices/authSlice";

import useAuth from "./../../hooks/useAuth";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signIn } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "baraka@aimfirms.com",
        password: "LoginPass123",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // const useR = ""; //await signIn(values.email, values.password);

          const user = await signIn(values.email, values.password);

          console.log("Sign in comoponent", user);
          if (user.status === 200) {
          } else if (user.status === 404) {
            setStatus({ success: false });
            setErrors({ submit: "Incorrect Email or Password" });
            setSubmitting(false);
          } else {
            // dispatch(setToken(user.token));
            console.log("SignIn dispatched token", user.token);

            navigate("/admin/dashboard");
          }
        } catch (error) {
          console.log("errs", error);

          const message = error.message || "Something went wrong";

          setStatus({ success: false });
          setErrors({ submit: "Something went wrong. Please try again later" });
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
          {/* <Alert className="my-3" variant="primary">
            <div className="alert-message">
              Use <strong>demo@bootlab.io</strong> and{" "}
              <strong>unsafepassword</strong> to sign in
            </div>
          </Alert> */}
          {errors.submit && (
            <Alert className="my-3" variant="danger">
              <div className="alert-message">{errors.submit}</div>
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              name="email"
              placeholder="Enter your email"
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
              size="lg"
              type="password"
              name="password"
              placeholder="Enter your password"
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
            <small>
              {/* <Link to="/auth/reset-password">Forgot password?</Link> */}
            </small>
          </Form.Group>

          <div>
            {/* <Form.Check
              type="checkbox"
              id="rememberMe"
              label="Remember me next time"
              defaultChecked
            /> */}
          </div>

          <div className="text-center mt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : null}
              Sign in
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignIn;
