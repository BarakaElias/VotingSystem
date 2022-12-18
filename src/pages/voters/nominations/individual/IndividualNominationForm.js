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
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useGetAllCategoriesQuery } from "../../../../redux/slices/awardCategories";
import { useAddIndividualNominationMutation } from "../../../../redux/slices/nominations";
import IndividualQuestions from "./IndividualQuestions";
import IndividualNominationCategories from "./IndividualNominationCategories";
const IndividualNominationForm = () => {
  const [addIndividualNomination] = useAddIndividualNominationMutation();
  const [categories, setCategories] = useState([]);
  const { data = [], error, isLoading } = useGetAllCategoriesQuery();
  if (!isLoading) {
    console.log("INF categories", data);
  }
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Container className="mt-3">
        <Card>
          <Card.Header>
            <h1 className="text-center">Afya Awards</h1>
            <h2 className="text-center">Individual Nomination Form</h2>
          </Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                nominee_first_name: "",
                nominee_last_name: "",
                nominee_company: "",
                nominee_title: "",
                nomination_type: "individual",
                nominee_company_address: "",
                nominee_phone_number: "",
                nominee_email: "",
                category: 0,
                answer_one: "",
                answer_two: "",
                answer_three: "",
                nominator_first_name: "",
                nominator_last_name: "",
                nominator_phone_number: "",
                answers: {},
              }}
              validationSchema={Yup.object().shape({
                nominee_first_name: Yup.string().required(
                  "First name is required"
                ),
                nominee_last_name: Yup.string().required(
                  "Last name is required"
                ),
                nominee_company: Yup.string().required(
                  "Nominee's company/organization is required"
                ),
                nominee_title: Yup.string(),
                nominee_company_address: Yup.string().required(
                  "An address is required"
                ),
                category: Yup.number().required("Please select a category"),
                nominee_phone_number: Yup.string().required(
                  "Phone number is required"
                ),
                nominee_email: Yup.string()
                  .email("Must be a valid email")
                  .required("Email is required"),
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
                console.log("Individual Nomination Form: ", values);
                try {
                  const response = await addIndividualNomination(values);
                  console.log("individual nom post", response);
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
                    <h3>Nominee's name</h3>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Select
                        size="lg"
                        className="w-25"
                        name="nominee_title"
                        isInvalid={Boolean(
                          touched.nominee_title && errors.nominee_title
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <option value="">--Select a title --</option>
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Dr Phd">Dr (Phd)</option>
                        <option value="Dr">Doctor</option>
                      </Form.Select>
                      {!!touched.nominee_title && (
                        <Form.Control.Feedback type="invalid">
                          {errors.nominee_title}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                          size="lg"
                          type="text"
                          name="nominee_first_name"
                          value={values.nominee_first_name}
                          isInvalid={Boolean(
                            touched.nominee_first_name &&
                              errors.nominee_first_name
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {!!touched.nominee_first_name && (
                          <Form.Control.Feedback type="invalid">
                            {errors.nominee_first_name}
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
                          name="nominee_last_name"
                          value={values.nominee_last_name}
                          isInvalid={Boolean(
                            touched.nominee_last_name &&
                              errors.nominee_last_name
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {!!touched.nominee_last_name && (
                          <Form.Control.Feedback type="invalid">
                            {errors.nominee_last_name}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <h3>Nominee's Contacts</h3>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Nominee's Phone number</Form.Label>
                        <Form.Control
                          size="lg"
                          type="text"
                          name="nominee_phone_number"
                          placeholder="0624xxx"
                          value={values.nominee_phone_number}
                          isInvalid={Boolean(
                            touched.nominator_phone_number &&
                              errors.nominee_phone_number
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {!!touched.nominee_phone_number && (
                          <Form.Control.Feedback type="invalid">
                            {errors.nominee_phone_number}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Nominee's Email</Form.Label>
                        <Form.Control
                          size="lg"
                          type="email"
                          name="nominee_email"
                          placeholder="Enter your email"
                          value={values.nominee_email}
                          isInvalid={Boolean(
                            touched.nominee_email && errors.nominee_email
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {!!touched.nominee_email && (
                          <Form.Control.Feedback type="invalid">
                            {errors.nominee_email}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Nominee's Company/Organization/Hospital
                        </Form.Label>
                        <Form.Control
                          size="lg"
                          type="text"
                          name="nominee_company"
                          value={values.nominee_company}
                          isInvalid={Boolean(
                            touched.nominee_company && errors.nominee_company
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {!!touched.nominee_company && (
                          <Form.Control.Feedback type="invalid">
                            {errors.nominee_company}
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
                          name="nominee_company_address"
                          placeholder="Eg. Mwenge, Dar es Salaam, Tanzania"
                          value={values.nominee_company_address}
                          isInvalid={Boolean(
                            touched.nominee_company_address &&
                              errors.nominee_company_address
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {!!touched.nominee_company_address && (
                          <Form.Control.Feedback type="invalid">
                            {errors.nominee_company_address}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* <Form.Group className="mb-3">
                    <Form.Label>
                      Category you would like to nominate in
                    </Form.Label>
                    <Form.Select
                      size="lg"
                      name="category"
                      isInvalid={Boolean(touched.category && errors.category)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <option value="">--Select a category--</option>
                      {data.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </Form.Select>
                    {!!touched.category && (
                      <Form.Control.Feedback type="invalid">
                        {errors.category}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group> */}
                  <IndividualNominationCategories
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                  />
                  <IndividualQuestions
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
export default IndividualNominationForm;
