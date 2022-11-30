import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Button, Form } from "react-bootstrap";
import { useCreateAwardCycleMutation } from "../../../redux/slices/awardCycles";
import ColorRingLoader from "../../../ui/loaders/ColorRingLoader";
// import useAuth from "../../hooks/useAuth";

const AwardCycleForm = (props) => {
  var loader = null;
  const { closeModal } = props;
  const [createAwardCycle, { isLoading, isUpdating }] =
    useCreateAwardCycleMutation();
  function createAward(vals) {
    // const response = useCreateAwardCycleQuery(values);
  }
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().max(255).required("Title is required"),
        description: Yup.string().max(255).required("Description is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const { title, description } = values;
          createAwardCycle(values);
          if (isLoading) {
            loader = <ColorRingLoader />;
          } else {
            loader = null;
          }
          closeModal();

          console.log(values);
        } catch (error) {
          console.log("errs", error);

          const message = error.message || "Something went wrong";

          setStatus({ success: false });
          setErrors({ submit: message });
          if (error.message === "useR is undefined") {
            setErrors({ submit: "Title or Description is missing" });
          } else if (error === "Network Error") {
            setErrors({
              submit: "Netwokr Error! Please check your internet connection.",
            });
          }
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
          {loader}
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
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="title"
              placeholder=""
              value={values.title}
              isInvalid={Boolean(touched.title && errors.title)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.title && (
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="description"
              as="textarea"
              placeholder=""
              value={values.description}
              isInvalid={Boolean(touched.description && errors.description)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.description && (
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <div className="d-flex flex-row text-center mt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              Create Award Cycle
            </Button>
            <Button onClick={closeModal} variant="danger" size="lg">
              Close
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AwardCycleForm;
