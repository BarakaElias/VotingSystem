import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import FlatSimpleTable from "../../../ui/tables/FlatSimpleTable";

const ResultCard = (props) => {
  const rows = [
    {
      id: 1,
      name: "Ivan Philly",
      votes: "32%",
    },
    {
      id: 1,
      name: "Ivan Philly",
      votes: "12%",
    },
    {
      id: 1,
      name: "Ivan Philly",
      votes: "5%",
    },
  ];
  const columns = [
    {
      Header: "",
      accessor: "name",
    },
    {
      Header: "",
      accessor: "votes",
    },
  ];
  return (
    <Card>
      <Card.Header>
        <h1>Lifetime Achievement Award</h1>
        <hr></hr>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={5}>
            <h2>Mr. Baraka Urio</h2>
            <h3>Aim Firms Ltd</h3>
          </Col>
          <Col>
            <h1 className="display-1 text-end">51%</h1>
          </Col>
        </Row>
        <Row>
          <FlatSimpleTable values={rows} cols={columns} />
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ResultCard;
