import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import country_dial_codes from "../../utils/country_dial_codes";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";

import useAuth from "../../hooks/useAuth";

function MobileAuth() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        name: "Baraka Urio",
        phone_number: "0624327900",
        country_code: "255",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required("Name is required"),
        phone_number: Yup.string().max(10).required("Phone number is required"),
        country_code: Yup.string().max(4).required("Country code is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          console.log("Mobile Auth", "Validating");
          navigate("/validate_code");
        } catch (error) {
          console.log("errs", error);
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
            <Form.Label>Name</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="username"
              placeholder="Baraka Elias"
              value={values.username}
              isInvalid={Boolean(touched.username && errors.username)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.username && (
              <Form.Control.Feedback type="invalid">
                {errors.username}
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

          <div></div>

          <div className="text-center mt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              Continue
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default MobileAuth;
