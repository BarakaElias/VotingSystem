import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useGetCandidatesNumQuery } from "../../../redux/slices/candidates";
import { Users } from "react-feather";
const CandidatesCard = () => {
  const { data, isLoading } = useGetCandidatesNumQuery();
  var total = 0;
  if (!isLoading) {
    console.log("Loaded candidate total from db", data);
    total = data;
  }
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={10}>
            <h1 className="display-3">{total}</h1>
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
  );
};
export default CandidatesCard;
