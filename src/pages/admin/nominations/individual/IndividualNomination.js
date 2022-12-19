import React, { useContext } from "react";
import { Card, Row, Container, Col, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import FullTable from "../../../../ui/tables/FullTable";
// import {
//   EmptyColumnFilter,
//   ColumnFilter,
// } from "../../../ui/tables/TableFilters";
import { Check, Eye, Trash } from "react-feather";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetIndividualNominationsQuery } from "../../../../redux/slices/nominations";
import { useAddCandidateMutation } from "../../../../redux/slices/candidates";
import NotyfContext from "../../../../contexts/NotyfContext";
import useAuth from "../../../../hooks/useAuth";

const IndividualNominations = () => {
  const { user } = useAuth();

  const notyf = useContext(NotyfContext);
  const [addCandidate] = useAddCandidateMutation();
  const { id } = useParams();
  console.log("Id is ", id);
  console.log("Id type is ", typeof id);
  const navigate = useNavigate();
  const { individual } = useGetIndividualNominationsQuery(undefined, {
    selectFromResult: ({ data }) => {
      if (data) {
        return {
          individual: data.find((nomination) => nomination.id === parseInt(id)),
        };
      } else {
        console.log("Data is undefined");
        return navigate("/admin/nomnations/individual-nominations");
      }
    },
  });
  const candidate = {
    title: individual.nominee_title,
    name: individual.nominee_name,
    company_name: individual.nominee_company,
    phone_number: individual.nominee_phone_number,
    email: individual.nominee_email,
    user: user.email,
    category_id: individual.Category.id,
  };
  const handleAddCandidate = async (cand) => {
    try {
      const response = await addCandidate(cand);
      console.log("Added candidate: ", response);
      if (response.error) {
        console.log("the error if");
        notyf.error(response.error.message);
      } else if (response) {
        notyf.success(`Added ${individual.nominee_name} as a candidate`);
      }
    } catch (err) {
      notyf.error(`Error adding ${individual.nominee_name} as a candidate`);
    }
  };
  console.log("Individual component", individual);
  return (
    <React.Fragment>
      <Helmet title="Individual Nominations" />
      <Container fluid className="p-0">
        {/* <h1 className="mb-3">Individual Nominations</h1> */}
        <Card>
          <Card.Header>
            <div className="d-flex flex-row justify-content-between">
              <div>
                <h1>{`Name: ${individual.nominee_title} ${individual.nominee_name}`}</h1>
                <h3>{`Category: ${individual.Category.title}`}</h3>
              </div>
              <div>
                <Button
                  variant="success"
                  size="lg"
                  onClick={(event) => handleAddCandidate(candidate)}
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
                <h2 className="mb-3">Contact details</h2>
                <p>{`Phone number: ${individual.nominee_phone_number}`}</p>
                <p>{`Email: ${individual.nominee_email}`}</p>
                <h3 className="mt-5">Nominator</h3>
                <p className="mt-3">{`Nominated by: ${individual.nominator_name}`}</p>
                <p>{`Phone number: ${individual.nominator_phone_number}`}</p>
                <p>{`Nominated on: ${individual.createdAt}`}</p>
              </Col>
              <Col>
                <h2 className="mb-3">Survey</h2>
                <ol className="list-group list-group-flush">
                  {individual.Answers.map((answer) => (
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

export default IndividualNominations;
