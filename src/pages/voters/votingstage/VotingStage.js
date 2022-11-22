import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import MobileAuth from "../../../components/auth/MobileAuth";
import avatar from "../../../assets/img/avatars/avatar.jpg";
import VoteOption from "./VoteOption";
import { useSelector } from "react-redux";

const VotingStage = () => {
  const candidates = useSelector((state) => state.candidates.candidates);
  console.log(candidates);
  return (
    // <section className="landing-intro landing-bg pt-5 pt-lg-6 pb-5 pb-lg-7">
    <React.Fragment>
      <Container className="landing-intro-content">
        <div className="text-center mt-4">
          <h2>Afya Awards</h2>
          <p className="lead">Cast your votes. Select at least one category</p>
        </div>

        <Row className="align-items-center"></Row>
      </Container>

      <section className="light-bg award-category-section pt-5 pb-5">
        <Container>
          <h1>Afya Lifetime Achievement Award</h1>
          <Row>
            <VoteOption />
            <VoteOption />
            <VoteOption />
            <VoteOption />
            <VoteOption />
            <VoteOption />
          </Row>
        </Container>
      </section>

      <section className="light-bg award-category-section pt-5 pb-5">
        <Container>
          <h1>Award of Excellence in Specialized Care </h1>
          <Row>
            <VoteOption />
            <VoteOption />
            <VoteOption />
          </Row>
        </Container>
      </section>

      <section className="light-bg award-category-section pt-5 pb-5">
        <Container>
          <h1>Award of Excellence in Primary Healthcare </h1>
          <Row>
            <VoteOption />
            <VoteOption />
            <VoteOption />
          </Row>
        </Container>
      </section>

      <section className="light-bg award-category-section pt-5 pb-5">
        <Container>
          <h1>Award of Excellence in Health Financing </h1>
          <Row>
            <VoteOption />
            <VoteOption />
            <VoteOption />
            <VoteOption />
            <VoteOption />
          </Row>
        </Container>
      </section>
    </React.Fragment>
    // </section>
  );
};

export default VotingStage;
