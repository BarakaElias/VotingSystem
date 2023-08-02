import React from "react";
import { Row, Col, Form, Alert, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useAddOrganizationNominationMutation } from "../../../../redux/slices/nominations";
import OrganizationQuestions from "./OrganizationQuestions";
import AwardPlaque from "../../../../assets/img/afya-award-plaque.png";

const OrganizationNominationForm = () => {
  const [addOrganizationNomination] = useAddOrganizationNominationMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { cat_id } = location.state;
  console.log("Category id: ", cat_id);
  let cr = [];
  if (cat_id.criteria !== null) {
    cr = JSON.parse(cat_id.criteria);
  }
  return (
    <React.Fragment>
      <Row className="form-layout">
        <Col sm={12} md={5} className="form-hero">
          <h1 className="text-center m-6">Organization Nomination Form</h1>
          {/* <img
            src={AwardPlaque}
            alt="Afya Award Plaque"
            className="img-fluid"
          /> */}
          <h3 className="text-center">{cat_id.title}</h3>
          <p className="p-5 text-monospace fs-3">{cat_id.description}</p>
          <h4>Nomination Criteria</h4>
          <ol>
            {cr.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ol>
        </Col>
        <Col sm={12} md={7} className="form-content p-3">
          <Formik
            initialValues={{
              name_of_company: "",
              top_exec_title: "",
              top_exec_first_name: "",
              top_exec_last_name: "",
              top_exec_phone_number: "",
              top_exec_email: "",
              company_address: "",
              category: cat_id.id,
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
              company_address: Yup.string().required("An address is required"),
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
              const fd = new FormData();
              fd.append("name_of_company", values.name_of_company);
              fd.append("top_exec_title", values.top_exec_title);
              fd.append("top_exec_first_name", values.top_exec_first_name);
              fd.append("top_exec_last_name", values.top_exec_last_name);
              fd.append("company_address", values.company_address);
              fd.append("category", values.category);
              fd.append("answers", JSON.stringify(values.answers));
              fd.append("nominator_first_name", values.nominator_first_name);
              fd.append("nominator_last_name", values.nominator_last_name);
              fd.append(
                "nominator_phone_number",
                values.nominator_phone_number
              );
              console.log("Organization Nomination Form: ", fd);
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
                  <Col sm={12}>
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
                  <Col sm={12}>
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
                  <Col sm={12}>
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
                  <Col sm={12}>
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

                {/* <OrganizationNominationCategories
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                  /> */}

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
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default OrganizationNominationForm;
