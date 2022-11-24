import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import MobileAuth from "../../../components/auth/MobileAuth";
import avatar from "../../../assets/img/avatars/avatar.jpg";
import { CheckCircle } from "react-feather";

const ThankYou = () => {
  return (
    // <section className="landing-intro landing-bg pt-5 pt-lg-6 pb-5 pb-lg-7">
    <Container className="landing-intro-content pt-5">
      <div className="text-center mt-4">
        <h2 className="display-1">Afya Awards</h2>
        <br></br>
        <CheckCircle width={128} height={128} color="#8BC34A" />
        <p className="display-3">Thank You! for your Vote</p>
      </div>
    </Container>
    // </section>
  );
};

export default ThankYou;
