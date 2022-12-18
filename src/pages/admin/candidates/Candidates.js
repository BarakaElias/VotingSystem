import React, { useContext } from "react";
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
import NotyfContext from "../../../contexts/NotyfContext";

//rtk query
import {
  useGetAllCandidatesQuery,
  useDeleteCandidateMutation,
} from "../../../redux/slices/candidates";

const Candidates = () => {
  const notyf = useContext(NotyfContext);
  const [deleteCandidate] = useDeleteCandidateMutation();
  const navigate = useNavigate();
  var rows = [];
  const { data, error, isLoading } = useGetAllCandidatesQuery();
  if (error === 401) {
    navigate("/admin/401");
  }
  if (!isLoading) {
    rows = data;
  }
  console.log("Candidates", data);
  const handleClick = async (id) => {
    const deletedCandidate = await deleteCandidate(id);
    if (deletedCandidate) {
      notyf.success(`Deleted candidate: ${deletedCandidate.name}`);
    } else {
      notyf.error("Could not delete");
    }
    console.log("Candidate del: ", deletedCandidate);
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
      Header: "Action",
      accessor: "id",
      Cell: ({ value }) => {
        console.log("Candidate action: ", value);
        return (
          <div className="d-flex flex-row justify-content-between">
            {/* <Eye
              onClick={(event) => handleClick(row.original.id)}
              className="m-3"
              size="24"
              color="#293042"
            /> */}
            <Trash
              style={{ style: { cursor: "pointer" } }}
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
