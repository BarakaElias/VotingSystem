import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import FlatSimpleTable from "../../../ui/tables/FlatSimpleTable";
const ResultCard = (props) => {
  const { k, result, cat_title } = props;
  var rows = [];
  if (result.length > 1) {
    rows = result.slice(1);
  } else {
    rows = result;
  }

  if (rows.length === 0) {
    return (
      <Card>
        <Card.Header>
          <h1>{cat_title}</h1>
        </Card.Header>
        <Card.Body>
          <h2 className="text-center">No data yet!</h2>
        </Card.Body>
      </Card>
    );
  }
  const columns = [
    {
      Header: "",
      accessor: "name",
    },
    {
      Header: "",
      accessor: "votes",
      Cell: ({ value }) => {
        return <span>{`${value}%`}</span>;
      },
    },
  ];
  console.log(`${cat_title} result card`, result);
  return (
    <Card>
      <Card.Header>
        <h1>{cat_title}</h1>
        <hr></hr>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={5}>
            <h2>{result[0].name}</h2>
            <h3>{result[0].company_name}</h3>
          </Col>
          <Col>
            <h1 className="display-1 text-end">{`${result[0].votes}%`}</h1>
          </Col>
        </Row>
        <Row>
          <FlatSimpleTable values={rows} cols={columns} k={k} />
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ResultCard;
