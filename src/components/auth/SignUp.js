import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";

import useAuth from "../../hooks/useAuth";
import country_dial_codes from "../../utils/country_dial_codes";

function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        country_code: "",
        confirmPassword: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string().max(255).required("First name is required"),
        last_name: Yup.string().max(255).required("Last name is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        phone_number: Yup.string().required("Phone number is required").max(13),
        country_code: Yup.string().required("Country code required").max(5),
        password: Yup.string()
          .min(12, "Must be at least 12 characters")
          .max(255)
          .required("Required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        //slicing the phone nnumber
        if (values.phone_number.length >= 10) {
          values.phone_number = values.phone_number.slice(1);
        }
        values.phone_number = values.country_code + values.phone_number;
        values.phone_number.slice(1);
        try {
          signUp(
            values.email,
            values.password,
            values.first_name,
            values.last_name,
            values.phone_number
          );
          navigate("/auth/sign-in");
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
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              placeholder="First name"
              value={values.first_name}
              isInvalid={Boolean(touched.first_name && errors.first_name)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.first_name && (
              <Form.Control.Feedback type="invalid">
                {errors.first_name}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Last name"
              value={values.last_name}
              isInvalid={Boolean(touched.last_name && errors.last_name)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.last_name && (
              <Form.Control.Feedback type="invalid">
                {errors.last_name}
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
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Select
                  name="country_code"
                  value={values.country_code}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  {country_dial_codes.map((option) => (
                    <option key={option.code} value={option.dial_code}>
                      {option.name} {option.dial_code}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone_number"
                  placeholder="Eg. 0624xxxxxx"
                  isInvalid={Boolean(
                    touched.phone_number && errors.phone_number
                  )}
                  onBlur={handleBlur}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

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
          <div className="text-center mt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              Sign up
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
