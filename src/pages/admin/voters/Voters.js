import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import FullTable from "../../../ui/tables/FullTable";
import {
  EmptyColumnFilter,
  ColumnFilter,
} from "../../../ui/tables/TableFilters";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllVotersQuery } from "../../../redux/slices/voters";

const Voters = () => {
  const navigate = useNavigate();
  var rows = [];
  const { data = [], error, isLoading } = useGetAllVotersQuery();
  if (error === 401) {
    navigate("/admin/401");
  }
  if (!isLoading) {
    rows = data;
    console.log("Voters from api", data);
  }
  // const rows = useSelector((state) => state.voters.voters);

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Phone number",
      accessor: "phone_number",
    },
  ];
  return (
    <React.Fragment>
      <Helmet title="Candidates" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Voters</h1>
        <Card>
          <Card.Body>
            <FullTable values={rows} cols={columns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Voters;
