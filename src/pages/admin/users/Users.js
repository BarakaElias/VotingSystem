import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import FullTable from "../../../ui/tables/FullTable";
import {
  EmptyColumnFilter,
  ColumnFilter,
} from "../../../ui/tables/TableFilters";
import { useSelector } from "react-redux";
import { Trash, Eye, Edit } from "react-feather";
import { useNavigate } from "react-router-dom";
import SignUp from "../../../components/auth/SignUp";

//rtk query
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../../../redux/slices/user";

const Users = () => {
  const [deleteUser, result] = useDeleteUserMutation();
  const navigate = useNavigate();
  var rows = [];

  const { data, error, isLoading } = useGetAllUsersQuery();
  if (!isLoading) {
    if (error === 401) {
      navigate("/admin/401");
    } else if (error === 404) {
      rows = [];
    } else {
      rows = data;
      console.log("Users table", data);
    }
  }

  const cols = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "email",
      accessor: "email",
    },
    {
      Header: "role",
      accessor: "role",
    },
    {
      Header: "",
      accessor: "id",
      Cell: ({ value }) => {
        return (
          <Trash
            onClick={(event) => deleteUser(value)}
            className="m-1"
            size="24"
            color="#293042"
          />
        );
      },
    },
  ];

  const handleClick = (id) => {
    navigate(`/admin/candidates/${id}`);
  };

  return (
    <React.Fragment>
      <Helmet title="All Users" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">All users</h1>
        <Card>
          <Card.Body>
            <FullTable values={rows} cols={cols} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Users;
