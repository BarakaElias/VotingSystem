import React from "react";

import { Button, Card, Row, Col } from "react-bootstrap";
import { Check, X, Award } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import PieChart from "../../../ui/charts/Pie";
// import nominations from "../../../redux/slices/nominations";

// import avatar1 from "../../assets/img/avatars/avatar.jpg";
// import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
// import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
// import avatar5 from "../../assets/img/avatars/avatar-5.jpg";

// import unsplash1 from "../../assets/img/photos/unsplash-1.jpg";
// import unsplash2 from "../../assets/img/photos/unsplash-2.jpg";

const NominationDetails = (props) => {
  const { nomination } = props;

  return (
    <Card>
      <Card.Header>
        <Card.Title tag="h5" className="mb-0"></Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={5}>
            <h1>Nominee Details</h1>
            <h2>{`Title: ${nomination.nominee_title}`}</h2>
            <h2>{`Name: ${nomination.nominee}`}</h2>
            <h2>{`Category: ${nomination.category}`}</h2>
            <h2>{`Email: ${nomination.nominee_email}`}</h2>
            <h2>{`Phone number: ${nomination.nominee_phonenumber}`}</h2>
            <h2>{`Company: ${nomination.nominator_company}`}</h2>
          </Col>
          <Col md={4}>
            <h5>Nominator Details</h5>
            <h3>{`Title: ${nomination.nominator_title}`}</h3>
            <h3>{`Name: ${nomination.nominator}`}</h3>
            <h3>{`Email: ${nomination.nominator_email}`}</h3>
            <h3>{`Phone number: ${nomination.nominator_phonenumber}`}</h3>
            <h3>{`Company: ${nomination.nominator_company}`}</h3>
            <h3>{`Company Address: ${nomination.nominator_company_address}`}</h3>
          </Col>
          <Col md={3} className="text-center">
            <Button className="m-1 p-3" size="lg" variant="outline-danger">
              <X width={24} height={24} />
              Disqualify
            </Button>
            <Button className="m-1 p-3" size="lg" variant="success">
              <Check width={24} height={24} /> Qualify
            </Button>
          </Col>
        </Row>
        <hr></hr>
        <div className="m-5">
          <h2>Questions</h2>

          {nomination.questions.map((question) => (
            <Row key={question.id}>
              <h3 className="p-2">{question.question}</h3>
              <p>{question.answer}</p>
              <hr></hr>
            </Row>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default NominationDetails;
