import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
// import useAuth from "../../hooks/useAuth";

function ValidationCode(props) {
  const { voter } = props;
  console.log("From code form", voter);
  const navigate = useNavigate();

  const sendVoterToBack = async (voter) => {
    try {
      const response = axios.post("http://127.0.0.1:3001/voters", {
        params: voter,
      });
      console.log("Sending voter to db", response);
    } catch (err) {
      console.log("Sending voter to db", err);
    }
  };

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

          const response = await axios.post(
            "https://apiotp.beem.africa/v1/verify",
            {
              pinId: voter.pinId,
              pin: values.code,
            },
            {
              auth: {
                username: "b1d2218977b5d109",
                password:
                  "OTFmMWViOGQ4MDQ2YmRhN2U3YzVlZDlmZmU0NjE3MTEwYWMxZWY5MjI1YWEzYmY5NTQ3ZGFlZjRmNDllMzE0Yg==",
              },
            }
          );
          console.log("Validation code: ", response);
          if (response.status === 200) {
            const res = await sendVoterToBack(voter);
            console.log("Sending voter to back", res);

            if (res.status === 200) {
              // navigate("/vote");
            } else {
              setErrors({
                submit: "Error recording to database.Please try again",
              });
              setStatus({ success: false });
              setSubmitting(false);
            }
          } else {
            setErrors({ submit: "Something went wrong" });
            setStatus({ success: false });
            setSubmitting(false);
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
