import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUserToken, setUserId, setVoter } from "../../redux/slices/voters";
import axios from "axios";
import Countdown from "react-countdown";
// import useAuth from "../../hooks/useAuth";

function ValidationCode(props) {
  const dispatch = useDispatch();
  const { voter } = props;
  console.log("From code form", voter);
  const navigate = useNavigate();

  const Completionist = () => {
    return <h1 className="text-danger text-center">Code expired!</h1>;
  };
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <h1 className="text-center">
          {minutes}:{seconds}
        </h1>
      );
    }
  };

  const sendVoterToBack = async (voter) => {
    console.log("Sending voter to db");
    try {
      const response = await axios.post("http://127.0.0.1:3001/voters", {
        params: voter,
      });
      return response;

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
          //Verify the pin that was sent
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
          // const res = await sendVoterToBack(voter);

          console.log("Validation code: ", response);
          if (response.status === 200) {
            // const res = await sendVoterToBack(voter);
            console.log("Sending voter to back", res);
            const res = await sendVoterToBack(voter);

            if (res.status === 200) {
              console.log("After recording to database", res);
              dispatch(setUserToken(res.data.token));
              dispatch(setUserId(res.data.voter.id));
              dispatch(setVoter(res.data.voter));
              window.localStorage.setItem("userAccessToken", res.data.token);
              window.localStorage.setItem("userId", res.data.voter.id);
              navigate("/vote");
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

          <Countdown
            zeroPadTime={2}
            renderer={renderer}
            date={Date.now() + 100000}
          />

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
              Verify
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ValidationCode;
