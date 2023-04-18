import React, { useState } from "react";
import { Formik, yupToFormErrors } from "formik";
import { Spinner, Form, Alert, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useAddCandidateProfilePicMutation } from "../../../redux/slices/candidates";
import axios from "axios";
import Dropzone from "react-dropzone";

const UploadProfilePic = ({ candidateId }) => {
  const [addCandidateProfilePic] = useAddCandidateProfilePicMutation();
  console.log("Uploading for: ", candidateId);
  const [fileDropped, setFileDropped] = useState(false);

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
          console.log("Form values: ", values);
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

        const handleFileSelected = (files) => {
          if (files[0].type === "image/jpeg") {
            setFieldValue("profile_pic", files[0]);
            setFileDropped(true);
          } else {
            alert("Only jpef files");
          }
        };

        console.log("Profile pic: ", values.profile_pic);

        return (
          <Form onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert className="my-3" variant="danger">
                <div className="alert-message">{errors.submit}</div>
              </Alert>
            )}
            <Dropzone onDrop={handleFileSelected} accept="image/jpeg">
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="bg-light p-4 ">
                  <input {...getInputProps()} />
                  {fileDropped ? (
                    <p>{values.profile_pic.path}</p>
                  ) : (
                    <p className="text-center">
                      Drag and drop a photo here, or click to select a file
                    </p>
                  )}
                </div>
              )}
            </Dropzone>
            <div className="d-flex flex-row justify-content-center">
              <Button type="submit" className="mt-4" variant="primary">
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
