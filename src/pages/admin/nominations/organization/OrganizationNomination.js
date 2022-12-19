import React, { useContext } from "react";
import { Card, Row, Container, Col, Button } from "react-bootstrap";
import { Check, Mail } from "react-feather";
import { Helmet } from "react-helmet-async";
import FullTable from "../../../../ui/tables/FullTable";
// import {
//   EmptyColumnFilter,
//   ColumnFilter,
// } from "../../../ui/tables/TableFilters";
import { Eye, Trash } from "react-feather";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAddCandidateMutation } from "../../../../redux/slices/candidates";
import { useGetOrganizationNominationsQuery } from "../../../../redux/slices/nominations";
import NotyfContext from "../../../../contexts/NotyfContext";
import useAuth from "../../../../hooks/useAuth";

const OrganizationNominations = () => {
  const { user } = useAuth();
  const notyf = useContext(NotyfContext);
  const [addCandidate] = useAddCandidateMutation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { organization } = useGetOrganizationNominationsQuery(undefined, {
    selectFromResult: ({ data }) => {
      if (data) {
        return {
          organization: data.find(
            (nomination) => nomination.id === parseInt(id)
          ),
        };
      } else {
        return navigate("/admin/nominations/organizations");
      }
    },
  });
  const candidate = {
    title: " ",
    name: organization.company_name,
    company_name: organization.top_exec_name,
    phone_number: organization.top_exec_phone_number,
    email: organization.top_exec_email,
    user: user.email,
    category_id: organization.Category.id,
  };
  const handleAddCandidate = async (cand) => {
    try {
      const response = await addCandidate(cand);
      if (response.error) {
        notyf.error(response.error.message);
      } else if (response) {
        notyf.success(`Added ${organization.company_name} as a candidate`);
      }
    } catch (err) {
      notyf.error(`Error adding ${organization.company_name} as a candidate`);
    }
  };
  return (
    <React.Fragment>
      <Helmet title="Organization Nominations" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Organization Nominations</h1>
        <Card>
          <Card.Header>
            <div className="d-flex flex-row justify-content-between">
              <div>
                <h1>{`Company name:${organization.company_name}`}</h1>
                <p>{`Address: ${organization.company_address}`}</p>
                <h3>{`Category: ${organization.Category.title}`}</h3>
              </div>
              <div>
                <Button
                  onClick={(event) => handleAddCandidate(candidate)}
                  variant="success"
                  size="lg"
                >
                  <Check />
                  Add as a Candidate
                </Button>
              </div>
            </div>

            <hr></hr>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <h2 className="mb-3">Top Executive/Representative details</h2>
                <p>{`Title: ${organization.top_exec_title}`}</p>
                <p>{`Name: ${organization.top_exec_name}`}</p>
                <p>{`Phone number: ${organization.top_exec_phone_number}`}</p>
                <a href={`mailto:${organization.top_exec_email}`}>
                  <Mail height={16} width={16} />
                  {` Email: ${organization.top_exec_email}`}
                </a>
                <h3 className="mt-5">Nominator</h3>
                <p className="mt-3">{`Nominated by: ${organization.nominator_name}`}</p>
                <p>{`Phone number: ${organization.nominator_phone_number}`}</p>
                <p>{`Nominated on: ${organization.createdAt}`}</p>
              </Col>
              <Col>
                <h2 className="mb-3">Survey</h2>
                <ol className="list-group list-group-flush">
                  {organization.Answers.map((answer) => (
                    <li key={answer.id} className="list-group-item">
                      <div>
                        <h4>{answer.title}</h4>
                        <p>{answer.solution}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default OrganizationNominations;
