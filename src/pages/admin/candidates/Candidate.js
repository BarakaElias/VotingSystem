import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import CandidateDetails from "./CandidateDetails";
import CandidateProfile from "./CandidateProfile";
import { useSelector } from "react-redux";
import { useGetAllCandidatesQuery } from "../../../redux/slices/candidates";
import { useParams } from "react-router-dom";

const Candidate = (props) => {
  const { id } = useParams();
  const { candidate } = useGetAllCandidatesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      candidate: data.find((cand) => cand.id === id),
    }),
  });

  console.log("Single candidate", candidate);

  // const candidate = useSelector((state) =>
  //   state.candidates.candidates.find(
  //     (candidate) => candidate.id === parseInt(id)
  //   )
  // );
  console.log("Candidate componenet: " + candidate.name);

  return (
    <React.Fragment>
      <Helmet title="Candidates" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Candidate</h1>
        <Row>
          <Col md={3}>
            <CandidateProfile candidate={{ ...candidate }} />
          </Col>
          <Col md={9}>
            <CandidateDetails candidate={{ ...candidate }} />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Candidate;
