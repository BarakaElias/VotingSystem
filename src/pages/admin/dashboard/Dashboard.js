import React from "react";
import { Card, Row, Container, Col, Badge } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Layers, Users } from "react-feather";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Helmet title="Dashboard" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Dashboard</h1>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={10}>
                    <h1 className="display-3">13</h1>
                    <h1>No. of Categories</h1>
                  </Col>
                  <Col>
                    <div bg="" className="stat">
                      <Layers
                        className="align-middle text-success"
                        width={64}
                        height={64}
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={10}>
                    <h1 className="display-3">30</h1>
                    <h1>No. of Candidates</h1>
                  </Col>
                  <Col>
                    <div bg="" className="stat">
                      <Users
                        className="align-middle text-success"
                        width={64}
                        height={64}
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={10}>
                    <h1 className="display-3">259</h1>
                    <h1>No. of Voters</h1>
                  </Col>
                  <Col>
                    <div bg="" className="stat">
                      <Users
                        className="align-middle text-success"
                        width={64}
                        height={64}
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
