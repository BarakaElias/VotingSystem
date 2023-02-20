import React from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import {
  Sliders,
  Smartphone,
  Mail,
  Users,
  Code,
  DownloadCloud,
} from "react-feather";
import { useNavigate } from "react-router-dom";
import avatar from "./../assets/img/vsdashboard.webp";

const Features = () => (
  <section className="py-6">
    <Container>
      <Row>
        <Col md="10" className="mx-auto text-center">
          <div className="mb-5">
            <h2 className="h1">Features you'll love</h2>
            <p className="text-muted text-lg">
              A responsive dashboard built for your award ceremonies.
            </p>
          </div>

          <Row className="text-start">
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <Sliders />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">2 Platforms</h4>
                  <p className="fs-lg">
                    This management system offers a platform for your voters to
                    cast their votes, and an administrative dashbaord to oversee
                    the award process
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <Smartphone />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Fully Responsive</h4>
                  <p className="fs-lg">
                    With mobile, tablet & desktop support it doesn't matter what
                    device you're using. The system is responsive in all
                    browsers.
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <Mail />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Support</h4>
                  <p className="fs-lg">
                    Our team would love to here from you. We welcome any new
                    ideas.
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <Users />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Secure</h4>
                  <p className="fs-lg">
                    The voting management system securely stores voting, voters,
                    and administrative user information.
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <Code />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Robust</h4>
                  <p className="fs-lg">
                    We strictly follow the development guidelines to make your
                    voting process smooth and go according to plan
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <i data-feather="download-cloud"></i>
                  <DownloadCloud />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Regular Updates</h4>
                  <p className="fs-lg">
                    From time to time you'll receive an updates containing new
                    security and more advanced features
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/sign-in");
  };
  const handleVoterClick = () => {
    navigate("/starting");
  };
  console.log("This is home");
  return (
    <React.Fragment>
      <section className="landing-intro landing-bg pt-5 pt-lg-6 pb-5 pb-lg-7">
        <Container className="landing-intro-content">
          <Row className="align-items-center">
            <Col lg="5" className="mx-auto">
              <Badge bg="" className="badge-soft-primary p-1">
                v1.0.0
              </Badge>

              <h1 className="my-4">Afya Awards Voting Mangement System</h1>

              <p className="text-lg">
                A professional voting management system that comes with all
                features required to run a succesful voting process
              </p>

              {/* <div className="my-4">
                <div className="d-inline-block me-3">
                  <h2 className="text-dark">500+</h2>
                  <span className="text-muted">UI Components</span>
                </div>
                <div className="d-inline-block me-3">
                  <h2 className="text-dark">1500+</h2>
                  <span className="text-muted">SVG Icons</span>
                </div>
                <div className="d-inline-block">
                  <h2 className="text-dark">45+</h2>
                  <span className="text-muted">Pages</span>
                </div>
              </div> */}
              <div className="my-4">
                <Button
                  className="me-4"
                  variant="primary"
                  size="lg"
                  onClick={handleClick}
                >
                  Login to Dashboard
                </Button>
                <Button
                  className="me-4"
                  variant="outline-primary"
                  size="lg"
                  onClick={handleVoterClick}
                >
                  Sign in as Voter
                </Button>
              </div>
            </Col>
            <Col lg="7" className="d-none d-lg-flex mx-auto text-center">
              <div className="landing-intro-screenshot pb-3">
                <img
                  src={avatar}
                  alt="Dark/Light Bootstrap React Admin Template"
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Features />
    </React.Fragment>
  );
};
export default HomePage;
