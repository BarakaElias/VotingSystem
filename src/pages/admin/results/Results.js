import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import ResultCard from "./ResultCard";

const Results = () => {
  return (
    <React.Fragment>
      <Helmet title="Candidates" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Results</h1>
        <Row>
          <Col md={4}>
            <ResultCard />
          </Col>
          <Col md={4}>
            <ResultCard />
          </Col>
          <Col md={4}>
            <ResultCard />
          </Col>
          <Col md={4}>
            <ResultCard />
          </Col>
          <Col md={4}>
            <ResultCard />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Results;
