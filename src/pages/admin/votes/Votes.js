import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import FullTable from "../../../ui/tables/FullTable";
import {
  EmptyColumnFilter,
  ColumnFilter,
} from "../../../ui/tables/TableFilters";

const Votes = () => {
  const rows = useSelector((state) => state.votes.votes);
  const columns = [
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Candidate",
      accessor: "candidate",
    },
    {
      Header: "Voter",
      accessor: "voter",
    },
  ];
  return (
    <React.Fragment>
      <Helmet title="Candidates" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Votes</h1>
        <Card>
          <Card.Body>
            <FullTable values={rows} cols={columns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Votes;
