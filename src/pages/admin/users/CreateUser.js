import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import FullTable from "../../../ui/tables/FullTable";
import {
  EmptyColumnFilter,
  ColumnFilter,
} from "../../../ui/tables/TableFilters";
import { useSelector } from "react-redux";
import { Trash, Eye } from "react-feather";
import { useNavigate } from "react-router-dom";
import SignUp from "../../../components/auth/SignUp";

//rtk query

const CreateUser = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/admin/candidates/${id}`);
  };

  return (
    <React.Fragment>
      <Helmet title="Candidates" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">User creation</h1>
        <Card>
          <Card.Header>
            <h3>Create User</h3>
          </Card.Header>
          <Card.Body>
            <SignUp />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default CreateUser;
