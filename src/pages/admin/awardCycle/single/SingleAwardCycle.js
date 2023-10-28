import React from "react";
import { Trash, Clock, Edit } from "react-feather";
import avatar from "../../../../assets/img/avatars/avatar.jpg";
import {
  Card,
  Row,
  Container,
  Col,
  Alert,
  ButtonGroup,
  Image,
  Form,
  Dropdown,
  DropdownButton,
  Button,
  Modal,
} from "react-bootstrap";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import FlatSimpleTable from "../../../../ui/tables/FlatSimpleTable";
import FullTable from "../../../../ui/tables/FullTable";
import { Formik } from "formik";
import { useState } from "react";

const EditAwardCycle = ({ setVisible }) => {
  return (
    <Modal show={true} centered size="lg">
      <Modal.Header>Edit Award</Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("A title is required"),
            description: Yup.string().required("A description is required"),
          })}
          onSubmit={async (values, { setErrors, setSubmtting, setStatus }) => {
            try {
            } catch (err) {}
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
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  size="lg"
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
                  name="description"
                  as="textarea"
                  size="lg"
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
              <div className="d-flex flex-row justify-content-between">
                <Button
                  onClick={() => setVisible(false)}
                  variant="outline-secondary"
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

const AwardCycleJudges = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Judges</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="d-flex flex-row">
          <div className="w-25 m-3">
            <Image thumbnail src={avatar} rounded />
            <h3 className="text-center">Mr. John Doe</h3>
          </div>
          <div className="w-25 m-3">
            <Image thumbnail src={avatar} rounded />
            <h3 className="text-center">Mr. John Doe</h3>
          </div>
          <div className="w-25 m-3">
            <Image thumbnail src={avatar} rounded />
            <h3 className="text-center">Mr. John Doe</h3>
          </div>
          <div className="w-25 m-3">
            <Image thumbnail src={avatar} rounded />
            <h3 className="text-center">Mr. John Doe</h3>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const SingleAwardCycle = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Awad cycle id: ", id);
  return (
    <React.Fragment>
      <Helmet title="Single Award" />
      <Container fluid className="p-0">
        {visible ? <EditAwardCycle setVisible={setVisible} /> : null}
        <div className="d-flex flex-row justify-content-between mb-3">
          <h1>Health Innovation Awards 2023</h1>
          <ButtonGroup>
            <Button onClick={() => setVisible(true)} variant="outline-primary">
              Edit Award Cycle
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => navigate("/admin/categories?award_cycle=2023")}
            >
              Edit Categories
            </Button>
            <Button variant="outline-primary">Edit Judges</Button>
            <DropdownButton as={ButtonGroup} title="Award Stage">
              <Dropdown.Item>Nominations</Dropdown.Item>
              <Dropdown.Item>Transition</Dropdown.Item>
              <Dropdown.Item>Voting</Dropdown.Item>
              <Dropdown.Item>Completed</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item color="danger">
                <Trash size={16} color="#d34d45" /> Delete
              </Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </div>
      </Container>
      <Row>
        <Col md={7} sm={12}>
          <Card>
            <Card.Header>
              <div className="d-flex flex-row justify-content-between">
                <Card.Title>Description</Card.Title>
                <p>Created: 1st Jan 2022</p>
              </div>
            </Card.Header>
            <Card.Body>
              <div class="container mb-5">
                <div class="row">
                  <div class="col">
                    <div
                      class="timeline-steps aos-init aos-animate"
                      data-aos="fade-up"
                    >
                      <div class="timeline-step">
                        <div
                          class="timeline-content"
                          data-toggle="popover"
                          data-trigger="hover"
                          data-placement="top"
                          title=""
                          data-content="And here's some amazing content. It's very engaging. Right?"
                          data-original-title="2003"
                        >
                          <div class="inner-circle"></div>
                          <p class="h6 mt-3 mb-1">5th Jan 2023</p>
                          <p class="h6 text-muted mb-0 mb-lg-0">
                            Award created
                          </p>
                        </div>
                      </div>
                      <div class="timeline-step">
                        <div
                          class="timeline-content"
                          data-toggle="popover"
                          data-trigger="hover"
                          data-placement="top"
                          title=""
                          data-content="And here's some amazing content. It's very engaging. Right?"
                          data-original-title="2004"
                        >
                          <div class="inner-circle"></div>
                          <p class="h6 mt-3 mb-1">21st Febrary 2023</p>
                          <p class="h6 text-muted mb-0 mb-lg-0">Nominations</p>
                        </div>
                      </div>
                      <div class="timeline-step">
                        <div
                          class="timeline-content"
                          data-toggle="popover"
                          data-trigger="hover"
                          data-placement="top"
                          title=""
                          data-content="And here's some amazing content. It's very engaging. Right?"
                          data-original-title="2005"
                        >
                          <div class="inner-circle"></div>
                          <p class="h6 mt-3 mb-1">31st March 2023</p>
                          <p class="h6 text-muted mb-0 mb-lg-0">Voting</p>
                        </div>
                      </div>
                      <div class="timeline-step">
                        <div
                          class="timeline-content"
                          data-toggle="popover"
                          data-trigger="hover"
                          data-placement="top"
                          title=""
                          data-content="And here's some amazing content. It's very engaging. Right?"
                          data-original-title="2010"
                        >
                          <div class="inner-circle"></div>
                          <p class="h6 mt-3 mb-1">6th June 2023</p>
                          <p class="h6 text-muted mb-0 mb-lg-0">
                            Award Ceremony
                          </p>
                        </div>
                      </div>
                      <div class="timeline-step mb-0">
                        <div
                          class="timeline-content"
                          data-toggle="popover"
                          data-trigger="hover"
                          data-placement="top"
                          title=""
                          data-content="And here's some amazing content. It's very engaging. Right?"
                          data-original-title="2020"
                        >
                          <div class="inner-circle"></div>
                          <p class="h6 mt-3 mb-1">12th June 2023</p>
                          <p class="h6 text-muted mb-0 mb-lg-0">End</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <strong className="mb-3">Description</strong>
              <br></br>
              <br></br>

              <Card.Text>
                The "Health Innovation Awards 2023" is the current award cycle
                for recognizing and celebrating exceptional achievements in the
                field of healthcare and medical innovation. This annual award
                cycle is dedicated to honoring individuals and organizations
                that have made significant contributions to advancing
                healthcare, improving patient outcomes, and pushing the
                boundaries of medical science.
              </Card.Text>
            </Card.Body>
          </Card>
          <AwardCycleJudges />
        </Col>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>Categories</Card.Title>
            </Card.Header>
            <Card.Body>
              <FlatSimpleTable
                values={[
                  { name: "Afya Lifetime Achivement Award" },
                  { name: "Primary Helathcare Award" },
                  { name: "Afya Lifetime Achivement Award" },
                  { name: "Primary Helathcare Award" },
                  { name: "Afya Lifetime Achivement Award" },
                  { name: "Primary Helathcare Award" },
                  { name: "Afya Lifetime Achivement Award" },
                  { name: "Primary Helathcare Award" },
                  { name: "Afya Lifetime Achivement Award" },
                  { name: "Primary Helathcare Award" },
                  { name: "Afya Lifetime Achivement Award" },
                  { name: "Primary Helathcare Award" },
                ]}
                cols={[{ Header: "Name", accessor: "name" }]}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Card>
          <Card.Header>Nominations</Card.Header>
          <Card.Body>
            <FullTable
              values={[
                {
                  first_name: "Baraka",
                  last_name: "Urio",
                  category: "Primary Healthcare Award",
                },
              ]}
              cols={[
                {
                  Header: "Name",
                  accessor: "first_name",
                  Cell: ({ value }) => <p>{value}</p>,
                },
                {
                  Header: "Category",
                  accessor: "category",
                },
              ]}
            />
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Card>
          <Card.Header>Candidates</Card.Header>
          <Card.Body>
            <FullTable
              values={[
                {
                  first_name: "Baraka",
                  last_name: "Urio",
                  category: "Primary Healthcare Award",
                },
              ]}
              cols={[
                {
                  Header: "Name",
                  accessor: "first_name",
                  Cell: ({ value }) => <p>{value}</p>,
                },
                {
                  Header: "Category",
                  accessor: "category",
                },
              ]}
            />
          </Card.Body>
        </Card>
      </Row>
    </React.Fragment>
  );
};
export default SingleAwardCycle;
