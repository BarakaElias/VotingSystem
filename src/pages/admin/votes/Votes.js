import React, { useEffect } from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import FullTable from "../../../ui/tables/FullTable";
import { useDispatch } from "react-redux";
import { setVotes } from "../../../redux/slices/votes";

import {
  EmptyColumnFilter,
  ColumnFilter,
} from "../../../ui/tables/TableFilters";

//rtk query
import { useGetAllVotesQuery } from "../../../redux/slices/votes";
import { useNavigate } from "react-router-dom";

const Votes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllVotesQuery();
  if (!isLoading) {
    if (error === 401) {
      navigate("/admin/401");
    }
    const rows = data;
  }

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
