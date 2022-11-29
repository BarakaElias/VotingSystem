import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Button, Form } from "react-bootstrap";
//rtk query
import { useAddCategoryQuery } from "../../../redux/slices/awardCategories";

// import useAuth from "../../hooks/useAuth";

const AwardCategoryForm = (props) => {
  // function addCategory() {
  //   const { data, error, isLoading } = useAddCategoryQuery();
  // }
  const { closeModal } = props;
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
            <Form.Label>Award title</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="award_title"
              placeholder=""
              value={values.award_title}
              isInvalid={Boolean(touched.award_title && errors.award_title)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.award_title && (
              <Form.Control.Feedback type="invalid">
                {errors.award_title}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Award description</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="award_description"
              as="textarea"
              placeholder=""
              value={values.award_description}
              isInvalid={Boolean(
                touched.award_description && errors.award_description
              )}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.award_description && (
              <Form.Control.Feedback type="invalid">
                {errors.award_description}
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
              Add Category
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

export default AwardCategoryForm;
