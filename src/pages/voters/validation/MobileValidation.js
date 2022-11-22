import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import MobileAuth from "../../../components/auth/MobileAuth";
import avatar from "../../../assets/img/avatars/avatar.jpg";
import ValidationCode from "../../../components/auth/ValidationCode";

const MobileValidation = () => {
  return (
    <section className="landing-intro landing-bg pt-5 pt-lg-6 pb-5 pb-lg-7">
      <Container className="landing-intro-content">
        <div className="text-center mt-4">
          <h2>Afya Awards</h2>
          <p className="lead">
            Enter the code that has been sent to your mobile phone
          </p>
        </div>

        <Card>
          <Card.Body>
            <div className="m-sm-4">
              <div className="text-center">
                <img
                  src={avatar}
                  alt="Chris Wood"
                  className="img-fluid rounded-circle"
                  width="132"
                  height="132"
                />
              </div>
              <ValidationCode />
            </div>
            {/* <Link to="/auth/sign-up">Create a free account</Link> */}
          </Card.Body>
        </Card>
        <Row className="align-items-center"></Row>
      </Container>
    </section>
  );
};

export default MobileValidation;
