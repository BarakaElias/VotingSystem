import React, { useContext } from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import FullTable from "../../../ui/tables/FullTable";
import { Trash, Eye } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import NotyfContext from "../../../contexts/NotyfContext";
import { useSearchParams } from "react-router-dom";
//rtk query
import {
  useGetAllCandidatesQuery,
  useDeleteCandidateMutation,
} from "../../../redux/slices/candidates";

const Candidates = () => {
  const [searchParams] = useSearchParams();
  const award_cycle = searchParams.get("award_cycle") ?? null;
  const notyf = useContext(NotyfContext);
  const [deleteCandidate] = useDeleteCandidateMutation();
  const navigate = useNavigate();
  var rows = [];
  const { data = [], error, isLoading } = useGetAllCandidatesQuery();
  if (error === 401) {
    navigate("/admin/401");
  }
  if (!isLoading) {
    rows = data;
  }
  const handleClick = async (id) => {
    const deletedCandidate = await deleteCandidate(id);
    if (deletedCandidate) {
      notyf.success(`Deleted candidate: ${deletedCandidate.name}`);
    } else {
      notyf.error("Could not delete");
    }
  };

  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Name",
      accessor: "name",
      // Filter: ColumnFilter,
    },
    {
      Header: "Award nominated",
      accessor: "category",
      Cell: ({ value }) => {
        if (value) {
          return <p>{value.title}</p>;
        }
        return <p className="text-danger">Unidentified category</p>;
      },
      // Filter: ColumnFilter,
    },
    {
      Header: "Company/Organisation",
      accessor: "company_name",
      // Filter: ColumnFilter,
    },
    // {
    //   Header: "Company Address",
    //   accessor: "company_address",
    //   // Filter: ColumnFilter,
    // },
    {
      Header: "Phone number",
      accessor: "phone_number",
      // Filter: ColumnFilter,
    },
    {
      Header: "Email",
      accessor: "email",
      // Filter: ColumnFilter,
    },
    {
      Header: "Added by",
      accessor: "user",
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ value }) => {
        return (
          <div className="d-flex flex-row justify-content-between">
            <Link to={`${value}`}>
              <Eye className="m-3" size="24" color="#293042" />
            </Link>

            <Trash
              style={{ cursor: "pointer" }}
              onClick={(event) => handleClick(value)}
              className="m-3"
              size="24"
              color="#d34d49"
            />
          </div>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      <Helmet title="Candidates" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Candidates</h1>
        <Card>
          <Card.Header>
            <h3>Table showing candidates</h3>
          </Card.Header>
          <Card.Body>
            <FullTable values={rows} cols={columns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Candidates;
