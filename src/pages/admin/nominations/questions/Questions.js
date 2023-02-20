import React, { useContext, useState } from "react";
import {
  Card,
  Row,
  Container,
  Col,
  Modal,
  Button,
  CloseButton,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import FullTable from "../../../../ui/tables/FullTable";
// import {
//   EmptyColumnFilter,
//   ColumnFilter,
// } from "../../../ui/tables/TableFilters";
import { Eye, Trash } from "react-feather";
import { useSelector } from "react-redux";
import QuestionForm from "./QuestionForm";
import { useNavigate } from "react-router-dom";
import NotyfContext from "../../../../contexts/NotyfContext";
import {
  useGetAllNominationQuestionsQuery,
  useDeleteNominationQuestionMutation,
} from "../../../../redux/slices/nominations";
const Questions = () => {
  const notyf = useContext(NotyfContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [deleteNominationQuestion] = useDeleteNominationQuestionMutation();
  const { data, error, isLoading } = useGetAllNominationQuestionsQuery();
  const closeModal = () => {
    setIsOpen(false);
  };
  if (error === 401) {
    navigate("/admin/401");
  } else if (error) {
    return <h1 className="text-danger">Could not fetch questions</h1>;
  }
  let form = isOpen ? (
    <Modal show={true} size="xl" centered>
      <Modal.Header>
        <h1>Add a Nomination Question</h1>
        <CloseButton onClick={closeModal} />
      </Modal.Header>
      <Modal.Body>
        <QuestionForm closeModal={closeModal} />
      </Modal.Body>
    </Modal>
  ) : null;
  if (!isLoading) {
    console.log("All questions Nominations: ", data);
    const handleClick = async (id) => {
      const res = await deleteNominationQuestion(id);
      console.log(res);
      if (res) {
        notyf.success("Deleted question");
      }
    };
    const columns = [
      {
        Header: "Question",
        accessor: "title",
      },
      {
        Header: "Criteria",
        accessor: "qn_type",
      },
      {
        Header: "Created",
        accessor: "created_at",
      },
      {
        Header: "",
        accessor: "id",

        Cell: ({ value }) => {
          return (
            <div className="d-flex flex-row justify-content-between">
              <Trash
                onClick={(event) => handleClick(value)}
                className="m-3"
                style={{ cursor: "pointer" }}
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
        {form}
        <Helmet title="Questions" />
        <Container fluid className="p-0">
          <h1 className="h3 mb-3">Questions</h1>
          <h4>These questions will appear in the nomination form</h4>
          <Card>
            <Card.Header>
              <div className="d-flex flex-row justify-content-end">
                <div>
                  <Button onClick={(event) => setIsOpen(true)}>
                    Add a Question
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <FullTable values={data} cols={columns} />
            </Card.Body>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
};

export default Questions;
