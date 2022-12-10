import React from "react";
import {
  Row,
  Container,
  Form,
  Alert,
  Button,
  Accordion,
} from "react-bootstrap";
import MobileAuth from "../../../components/auth/MobileAuth";
import avatar from "../../../assets/img/avatars/avatar.jpg";
import VoteOption from "./VoteOption";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useGetAllVoteCandidatesQuery } from "../../../redux/slices/voteCandidates";

const VotingStage = () => {
  const { data = [], isLoading } = useGetAllVoteCandidatesQuery();
  if (!isLoading) {
    console.log("Data voting stage", data);
  }
  const navigate = useNavigate();
  const voteCandidates = useSelector(
    (state) => state.voteCandidates.voteCandidates
  );

  return (
    // <section className="landing-intro landing-bg pt-5 pt-lg-6 pb-5 pb-lg-7">
    <React.Fragment>
      <Container>
        <div className="text-center mt-4">
          <h2>Afya Awards</h2>
          <p className="lead">Cast your votes. Select at least one category</p>
        </div>

        <Row className="align-items-center"></Row>
      </Container>

      <Formik
        initialValues={{}}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log("Submitting votes", values);

            navigate("/confirm", { state: { ...values } });
          } catch (e) {
            console.log("Voting Stage", e);
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
            {data.map((category) => (
              <Container fluid="lg" key={category.id + "container"}>
                <Accordion>
                  <Accordion.Item eventKey={category.id}>
                    <Accordion.Header>
                      <h1>{category.title}</h1>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-wrap">
                        {category.candidates.map((candidate) => (
                          <VoteOption
                            key={candidate.id + "voteOption"}
                            candidate={candidate}
                            handleChange={handleChange}
                            category={category}
                          />
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Container>
            ))}
            <div className="text-center mt-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
              >
                Cast Vote
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
    // </section>
  );
};

export default VotingStage;
