import React from "react";
import { Formik, yupToFormErrors } from "formik";
import { Spinner, Form, Alert, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useAddCandidateProfilePicMutation } from "../../../redux/slices/candidates";
import axios from "axios";

const UploadProfilePic = ({ candidateId }) => {
  const [addCandidateProfilePic] = useAddCandidateProfilePicMutation();
  console.log("Uploading for: ", candidateId);
  return (
    <Formik
      initialValues={{
        profile_pic: {},
        candidate_id: candidateId,
      }}
      validationSchema={Yup.object().shape({
        candidate_id: Yup.string().required("No active candidate"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setSubmitting(true);
          console.log(values);
          const response = await addCandidateProfilePic(values);

          if (response.status === 200) {
            //set as success
            setStatus({ success: true });
          }
          console.log("Upload pic response: ", response);
        } catch (error) {
          console.log("errs", error);

          const message = error.message || "Something went wrong";

          setStatus({ success: false });
          setErrors({
            submit: "Something went wrong. Please try again later",
          });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        touched,
        values,
      }) => {
        if (isSubmitting) {
          return (
            <React.Fragment>
              <h3 className="text-center">Uploading profile picture</h3>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </React.Fragment>
          );
        }
        return (
          <Form onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert className="my-3" variant="danger">
                <div className="alert-message">{errors.submit}</div>
              </Alert>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Select an image</Form.Label>
              <Form.Control
                name="profile_pic"
                onChange={(event) => {
                  setFieldValue("profile_pic", event.currentTarget.files[0]);
                }}
                type="file"
              />
            </Form.Group>
            <div className="d-flex flex-row justify-content-center">
              <Button type="submit" variant="primary">
                Upload
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default UploadProfilePic;
