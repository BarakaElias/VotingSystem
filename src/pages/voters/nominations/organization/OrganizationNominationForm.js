import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Alert,
  Button,
  Container,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAddOrganizationNominationMutation } from "../../../../redux/slices/nominations";
import { useGetAllCategoriesQuery } from "../../../../redux/slices/awardCategories";
import OrganizationQuestions from "./OrganizationQuestions";
import OrganizationNominationCategories from "./OrganizationNominationCategories";
const OrganizationNominationForm = () => {
  const [addOrganizationNomination] = useAddOrganizationNominationMutation();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { data = [], error, isLoading } = useGetAllCategoriesQuery();
  if (!isLoading) {
    console.log("INF categories", data);
  }
  return (
    <React.Fragment>
      <Container className="mt-3">
        <Card>
          <Card.Header>
            <h1 className="text-center">Afya Awards</h1>
            <h2 className="text-center">Organization Nomination Form</h2>
          </Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                name_of_company: "",
                top_exec_title: "",
                top_exec_first_name: "",
                top_exec_last_name: "",
                top_exec_phone_number: "",
                top_exec_email: "",
                company_address: "",
                category: 0,
                answer_one: "",
                answer_two: "",
                nomination_type: "organization",
                nominator_first_name: "",
                nominator_last_name: "",
                nominator_phone_number: "",
                answers: {},
              }}
              validationSchema={Yup.object().shape({
                name_of_company: Yup.string().required("Name is required"),
                top_exec_title: Yup.string(),
                top_exec_first_name: Yup.string().required(
                  "First name is required"
                ),
                top_exec_last_name: Yup.string().required(
                  "Last name is required"
                ),
                company_address: Yup.string().required("Address is required"),
                top_exec_email: Yup.string().email("Must be a valid email"),
                top_exec_phone_number: Yup.string(),
                company_address: Yup.string().required(
                  "An address is required"
                ),
                category: Yup.number().required("Please select a category"),
                answer_one: Yup.string(),
                answer_two: Yup.string(),
                nominator_first_name: Yup.string().required(
                  "Your first name is required"
                ),
                nominator_last_name: Yup.string().required(
                  "Your last name is required"
                ),
                nominator_phone_number: Yup.string().required(
                  "Your phone number is required"
                ),
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                console.log("Organization Nomination Form: ", values);
                try {
                  const response = await addOrganizationNomination(values);
                  console.log("Orgnanization Nom post", response);
                  if (response.data.id) {
                    navigate("/thank-you-nomination");
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
                  <Row>
                    <h3>Company details</h3>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Name of Company/Organization/Hospital
                        </Form.Label>
                        <Form.Control
                          size="lg"
                          type="text"
                          name="name_of_company"
                          value={values.name_of_company}
                          isInvalid={Boolean(
                            touched.name_of_company && errors.name_of_company
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {!!touched.name_of_company && (
                          <Form.Control.Feedback type="invalid">
                            {errors.name_of_company}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Company address</Form.Label>
                        <Form.Control
                          size="lg"
                          type="text"
                          name="company_address"
                          placeholder="Eg. Mwenge, Dar es Salaam, Tanzania"
                          value={values.company_address}
                          isInvalid={Boolean(
                            touched.company_address && errors.company_address
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {!!touched.company_address && (
                          <Form.Control.Feedback type="invalid">
                            {errors.company_address}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <h3>Top Executive details</h3>

                    <Form.Group className="mb-3">
                      <Form.Label>Top Executive's Title</Form.Label>
                      <Form.Control
                        size="lg"
                        className="w-25"
                        name="top_exec_title"
                        isInvalid={Boolean(
                          touched.top_exec_title && errors.top_exec_title
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />

                      {!!touched.top_exec_title && (
                        <Form.Control.Feedback type="invalid">
                          {errors.top_exec_title}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                          size="lg"
                          type="text"
                          name="top_exec_first_name"
                          value={values.top_exec_first_name}
                          isInvalid={Boolean(
                            touched.top_exec_first_name &&
                              errors.top_exec_first_name
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {!!touched.top_exec_first_name && (
                          <Form.Control.Feedback type="invalid">
                            {errors.top_exec_first_name}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                          size="lg"
                          type="text"
                          name="top_exec_last_name"
                          value={values.top_exec_last_name}
                          isInvalid={Boolean(
                            touched.top_exec_last_name &&
                              errors.top_exec_last_name
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {!!touched.top_exec_last_name && (
                          <Form.Control.Feedback type="invalid">
                            {errors.top_exec_last_name}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                          size="lg"
                          type="text"
                          name="top_exec_phone_number"
                          placeholder="0624xxx"
                          value={values.top_exec_phone_number}
                          isInvalid={Boolean(
                            touched.top_exec_phone_number &&
                              errors.top_exec_phone_number
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {!!touched.top_exec_phone_number && (
                          <Form.Control.Feedback type="invalid">
                            {errors.top_exec_phone_number}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          size="lg"
                          type="email"
                          name="top_exec_email"
                          placeholder="Enter your email"
                          value={values.top_exec_email}
                          isInvalid={Boolean(
                            touched.top_exec_email && errors.top_exec_email
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {!!touched.top_exec_email && (
                          <Form.Control.Feedback type="invalid">
                            {errors.top_exec_email}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <OrganizationNominationCategories
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                  />

                  <OrganizationQuestions
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                  />
                  <Row>
                    <h3>Nominator's Information</h3>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                          size="lg"
                          type="text"
                          name="nominator_first_name"
                          value={values.nominator_first_name}
                          isInvalid={Boolean(
                            touched.nominator_first_name &&
                              errors.nominator_first_name
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {!!touched.nominator_first_name && (
                          <Form.Control.Feedback type="invalid">
                            {errors.nominator_first_name}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                          size="lg"
                          type="text"
                          name="nominator_last_name"
                          value={values.nominator_last_name}
                          isInvalid={Boolean(
                            touched.nominator_last_name &&
                              errors.nominator_last_name
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {!!touched.nominator_last_name && (
                          <Form.Control.Feedback type="invalid">
                            {errors.nominator_last_name}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Nominator's Phone number</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="nominator_phone_number"
                      value={values.nominator_phone_number}
                      isInvalid={Boolean(
                        touched.nominator_phone_number &&
                          errors.nominator_phone_number
                      )}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {!!touched.nominator_phone_number && (
                      <Form.Control.Feedback type="invalid">
                        {errors.nominator_phone_number}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <div className="text-center mt-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      Submit Nomination
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};
export default OrganizationNominationForm;
