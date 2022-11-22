import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NominationDetails from "./NominationDetails";
import NominationProfile from "./NominationProfile";

const Nomination = (props) => {
  const { id } = useParams();

  const nomination = useSelector((state) =>
    state.nominations.nominations.find(
      (nomination) => nomination.id === parseInt(id)
    )
  );
  console.log("Candidate componenet: " + nomination.nominee);

  return (
    <React.Fragment>
      <Helmet title="Candidates" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Nomination</h1>
        <Row>
          {/* <Col md={3}>
            <NominationProfile nomination={nomination} />
          </Col> */}
          <Col>
            <NominationDetails nomination={nomination} />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Nomination;
