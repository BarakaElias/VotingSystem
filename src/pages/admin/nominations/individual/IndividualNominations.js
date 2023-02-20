import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import FullTable from "../../../../ui/tables/FullTable";
// import {
//   EmptyColumnFilter,
//   ColumnFilter,
// } from "../../../ui/tables/TableFilters";
import { Eye, Trash } from "react-feather";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetIndividualNominationsQuery } from "../../../../redux/slices/nominations";

const IndividualNominations = () => {
  const navigate = useNavigate();
  const { data = [], error, isLoading } = useGetIndividualNominationsQuery();
  var rows = [];
  if (error === 401) {
    navigate("/admin/401");
  }
  if (!isLoading) {
    rows = data;
    console.log("Individual Nominations: ", data);
  }
  const handleClick = (id) => {
    console.log("Clicked on: ", id);
    navigate(`/admin/nominations/individual-nominations/${id}`);
  };

  const columns = [
    {
      Header: "Nominator",
      accessor: "nominator_name",
      Cell: ({ row, value }) => {
        const values = row.original;
        return (
          <div>
            <h2>{`${value}`}</h2>
            <p>{`Phone: ${values.nominator_phone_number}`}</p>
          </div>
        );
      },
    },
    {
      Header: "Nominee",
      accessor: "nominee_name",
      Cell: ({ row, value }) => {
        const values = row.original;
        return (
          <div>
            <h2>{value}</h2>
            <p>{`Phone: ${values.nominee_phone_number}`}</p>
            <p>{`Email: ${values.nominee_email}`}</p>
          </div>
        );
      },
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ value }) => {
        console.log("org category: ", value);
        if (value !== null) {
          return <h3>{value.title}</h3>;
        }
        return <h3>undefined</h3>;
      },
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Created",
      accessor: "created_at",
    },
    {
      Header: "",
      accessor: "actions",

      Cell: ({ row }) => {
        return (
          <div className="d-flex flex-row justify-content-between">
            <Eye
              onClick={(event) => handleClick(row.original.id)}
              className="m-3"
              style={{ cursor: "pointer" }}
              size="24"
              color="#293042"
            />
            <Trash
              className="m-3"
              size="24"
              style={{ cursor: "pointer" }}
              color="#d34d49"
            />
          </div>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      <Helmet title="Individual Nominations" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Individual Nominations</h1>
        <Card>
          <Card.Body>
            <FullTable values={rows} cols={columns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default IndividualNominations;
