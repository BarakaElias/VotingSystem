import React, { useContext } from "react";
import { Formik } from "formik";
import { Row, Col, Form, Button, Alert, CloseButton } from "react-bootstrap";
import * as Yup from "yup";
import { useAddNominationQuestionMutation } from "../../../../redux/slices/nominations";
import NotyfContext from "../../../../contexts/NotyfContext";
const QuestionForm = ({ closeModal }) => {
  const notyf = useContext(NotyfContext);
  const [addNominationQuestion] = useAddNominationQuestionMutation();
  const handleAddQuestion = async (question) => {
    const res = await addNominationQuestion(question);
    return res;
  };
  return (
    <Formik
      initialValues={{
        title: "",
        qn_type: "both",
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("Question is required"),
        qn_type: Yup.string().required("Specify question criteria"),
      })}
      onSubmit={async (values, setErrors, setStatus, setSubmitting) => {
        console.log("Submitting question: ", values);
        try {
          const response = await handleAddQuestion({ ...values });
          if (response.data) {
            console.log("New Question", response);
            notyf.success(`Successfully added question`);
            closeModal();
          }
        } catch (err) {
          console.log("Individual Nomination Form Error", err);
          setStatus({ success: false });
          setErrors({ submit: "Something went wrong" });
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
              <div className="alert-message">{errors.submit}</div>
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Question for which category</Form.Label>
            <Form.Select
              size="lg"
              className="w-25"
              name="qn_type"
              isInvalid={Boolean(touched.qn_type && errors.qn_type)}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option value="both">Both</option>
              <option value="individual">For Individual</option>
              <option value="organization">For Organization</option>
            </Form.Select>
            {!!touched.qn_type && (
              <Form.Control.Feedback type="invalid">
                {errors.qn_type}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Question</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="title"
              value={values.title}
              placeholder="What makes this person great?"
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
          <div className="d-flex flex-row justify-content-end text-center mt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              Add Question
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default QuestionForm;
