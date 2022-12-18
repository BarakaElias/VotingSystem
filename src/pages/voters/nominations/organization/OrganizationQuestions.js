import React, { useState } from "react";
import { Form } from "react-bootstrap";

import { useGetOrganizationQuestionsQuery } from "../../../../redux/slices/nominations";
const OrganizationQuestions = ({
  handleChange,
  touched,
  errors,
  handleBlur,
}) => {
  const { data, error, isLoading } = useGetOrganizationQuestionsQuery();
  if (error) {
    return <h1>Error fetching questions</h1>;
  }
  if (!isLoading) {
    // console.log("Organization questions", touched);
    return (
      <React.Fragment>
        {data.map((question) => (
          <Form.Group key={question.id} className="mb-3">
            <Form.Label>{question.title}</Form.Label>
            <Form.Control
              size="lg"
              rows={5}
              as="textarea"
              name={`answers[${question.title}]`}
              isInvalid={Boolean(touched.answers && errors.answers)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.answers && (
              <Form.Control.Feedback type="invalid">
                {errors.answers}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        ))}
      </React.Fragment>
    );
  }

  return <h1>Fetching questions</h1>;
};
export default OrganizationQuestions;
