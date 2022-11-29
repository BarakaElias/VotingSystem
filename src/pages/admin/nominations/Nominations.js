import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import FullTable from "../../../ui/tables/FullTable";
import {
  EmptyColumnFilter,
  ColumnFilter,
} from "../../../ui/tables/TableFilters";
import { Eye, Trash } from "react-feather";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllNominationsQuery } from "../../../redux/slices/nominations";

const Nominations = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllNominationsQuery();
  if (error === 401) {
    navigate("/admin/401");
  }
  const handleClick = (id) => {
    navigate(`/admin/nominations/${id}`);
  };
  const rows = useSelector((state) => state.nominations.nominations);

  const columns = [
    {
      Header: "Nominator",
      accessor: "nominator",
      Cell: ({ row, value }) => {
        const values = row.original;
        return (
          <div>
            <h2>{`${values.nominator_title} ${value}`}</h2>
            <p>{`Phone: ${values.nominator_phonenumber}`}</p>
            <p>{`Email: ${values.nominator_email}`}</p>
          </div>
        );
      },
    },
    {
      Header: "Nominee",
      accessor: "nominee",
      Cell: ({ row, value }) => {
        const values = row.original;
        return (
          <div>
            <h2>{`${values.nominee_title} ${value}`}</h2>
            <p>{`Phone: ${values.nominee_phonenumber}`}</p>
            <p>{`Email: ${values.nominee_email}`}</p>
          </div>
        );
      },
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Status",
      accessor: "status",
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
              size="24"
              color="#293042"
            />
            <Trash className="m-3" size="24" color="#d34d49" />
          </div>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      <Helmet title="Candidates" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Nominations</h1>
        <Card>
          <Card.Body>
            <FullTable values={rows} cols={columns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Nominations;
