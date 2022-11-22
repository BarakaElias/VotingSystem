import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";

// import useAuth from "../../hooks/useAuth";

function ValidationCode() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        code: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        code: Yup.string().max(6).required("Code is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          console.log("Mobile Auth", "Validating");
          navigate("/vote");
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
            <Form.Label>Code</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="code"
              placeholder=""
              value={values.code}
              isInvalid={Boolean(touched.code && errors.code)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.code && (
              <Form.Control.Feedback type="invalid">
                {errors.code}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <div></div>

          <div className="text-center mt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              Validate
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ValidationCode;
