import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import country_dial_codes from "../../utils/country_dial_codes";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { setVoter } from "../../redux/slices/voters";

import useAuth from "../../hooks/useAuth";

function MobileAuth() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        username: "Baraka Urio",
        phone_number: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required("Name is required"),
        phone_number: Yup.string()
          .max(10, "Too long! Enter phonenumber as 062... and not +255")
          .min(10, "Phonenumber is too short")
          .required("Phone number is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const phone = `255${values.phone_number.slice(1)}`;

          setVoter({ name: values.username, phone_number: phone });
          console.log("Mobile Auth sending msg to: ", phone);
          const params = {
            api_id: "API236492285",
            api_password: "ForDemoClient123",
            brand: "Afya",
            sender_id: "Sema",
            phonenumber: phone,
          };

          const parameters = {
            api_id: "",
            api_password: "",
            brand: "Afya",
            sender_id: "Sema",
            phonenumber: phone,
          };

          const url = `https://api.sema.co.tz/api/Verify`;

          const response = axios.post(url, null, parameters);
          console.log("Mobile Auth", response);
          if (response.status === 200) {
            navigate("/validate_code", {
              state: {
                name: values.username,
                phone_number: phone,
                pinId: response.data.verfication_id,
              },
            });
          }
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
            <Form.Group className="mb-3">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                placeholder="Eg. 0624xxxxxx"
                value={values.phone_number}
                isInvalid={Boolean(touched.phone_number && errors.phone_number)}
                onBlur={handleBlur}
                onChange={handleChange}
              ></Form.Control>
              {!!touched.phone_number && (
                <Form.Control.Feedback type="invalid">
                  {errors.phone_number}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            {/* </Col> */}
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
