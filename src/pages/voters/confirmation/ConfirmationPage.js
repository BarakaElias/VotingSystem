import React from "react";
import {
  Row,
  Container,
  Form,
  Alert,
  Button,
  Accordion,
  Card,
} from "react-bootstrap";
import avatar from "../../../assets/img/avatars/avatar.jpg";
import FlatSimpleTable from "../../../ui/tables/FlatSimpleTable";

import { useNavigate, useLocation } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const vote = location.state;

  //getting the current date
  const now = new Date();
  const date = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`;

  const values = [];

  const postVote = () => {
    console.log("posting vote", vote);
    navigate("/thank-you");
  };

  Object.entries(vote).map(([key, value]) => {
    values.push({ category: key, candidate: value });
  });

  const num_categories = `Categories: ${values.length}`;

  console.log("Values for table", values);

  const cols = [
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Candidate",
      accessor: "candidate",
    },
  ];

  return (
    // <section className="landing-intro landing-bg pt-5 pt-lg-6 pb-5 pb-lg-7">
    <React.Fragment>
      <Container fluid="md" className="landing-intro-content">
        <div className="text-center mt-4">
          <h2>Afya Awards</h2>
          <p className="lead">Confirm your Vote</p>
        </div>
        <Card>
          <Card.Header>
            <div className="text-center">
              <h3>Summary</h3>
              <h5>{date}</h5>
              <h5>{num_categories}</h5>
            </div>
          </Card.Header>
          <Card.Body>
            <FlatSimpleTable values={values} cols={cols} />
          </Card.Body>
          <Card.Footer>
            <div className="text-center">
              <Button onClick={postVote} size="lg" variant="success">
                Confirm
              </Button>
            </div>
          </Card.Footer>
        </Card>
        <Row className="align-items-center"></Row>
      </Container>
    </React.Fragment>
    // </section>
  );
};

export default ConfirmationPage;
