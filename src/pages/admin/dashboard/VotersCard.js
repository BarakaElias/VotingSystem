import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Users } from "react-feather";
import { useGetNumVotersQuery } from "../../../redux/slices/voters";
const VotersCard = () => {
  const { data, isLoading, error } = useGetNumVotersQuery();
  var total = 0;
  if (!isLoading) {
    total = data;
  }
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={10}>
            <h1 className="display-3">{total}</h1>
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
  );
};
export default VotersCard;
