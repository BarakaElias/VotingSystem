import React from "react";
import { Card, Row, Container, Col, Badge } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Layers, Users } from "react-feather";
import CategoriesCard from "./CategoriesCard";
import { useGetNumberOfCategoriesQuery } from "../../../redux/slices/awardCategories";
import CandidatesCard from "./CandidatesCard";
import VotersCard from "./VotersCard";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Helmet title="Dashboard" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Dashboard</h1>
        <Row>
          <Col>
            <CategoriesCard />
          </Col>
          <Col>
            <CandidatesCard />
          </Col>
          <Col>
            <VotersCard />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
