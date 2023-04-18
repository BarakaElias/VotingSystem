import React, { useState } from "react";
import {
  Card,
  Alert,
  Row,
  Modal,
  CloseButton,
  Button,
  Container,
  Col,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useGetAllCategoriesQuery } from "../../../redux/slices/awardCategories";
import { faUser, faSchool, faS } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const navigate = useNavigate();
  const { data = [], isLoading, error } = useGetAllCategoriesQuery();
  const [currentState, setCurrentState] = useState({
    modalOpen: false,
    cat_id: null,
  });
  const OptionModal = () => {
    console.log("Modal state", currentState);
    return (
      <Modal show={true} size="xl" centered>
        <Modal.Header>
          {/* <h1>Choose an option</h1> */}
          <h2 className="text-center">
            Do you want to nominate an Individual or an Organization?
          </h2>
          <CloseButton
            aria-label="Hide"
            onClick={() => {
              const updatedState = { ...currentState };
              updatedState.modalOpen = false;
              setCurrentState(updatedState);
            }}
          />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Button
                className="w-100 p-6 m-1"
                onClick={() => {
                  navigate("/individual-nomination-form", {
                    state: { cat_id: currentState.cat_id },
                  });
                }}
              >
                <FontAwesomeIcon
                  className="m-1"
                  size="xl"
                  color="#fff"
                  icon={faUser}
                />
                <br></br>
                <span className="display-6">Individual</span>
              </Button>
            </Col>
            <Col>
              <Button
                className="w-100 p-6 m-1"
                onClick={() => {
                  navigate("/organization-nomination-form", {
                    state: { cat_id: currentState.cat_id },
                  });
                }}
              >
                <FontAwesomeIcon
                  className="m-1"
                  size="xl"
                  color="#fff"
                  icon={faSchool}
                />
                <br></br>

                <span className="display-6">Organization</span>
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  };
  let form = currentState.modalOpen ? <OptionModal /> : null;
  if (!isLoading) {
    const handleSelection = (selected_category) => {
      console.log("Selected id: ", selected_category.id);
      switch (selected_category.cat_type) {
        case "both":
          const updatedState = { ...currentState };
          updatedState.modalOpen = true;
          updatedState.cat_id = selected_category;
          setCurrentState(updatedState);
          break;
        case "organization":
          navigate("/organization-nomination-form", {
            state: { cat_id: selected_category },
          });
          break;
        case "individual":
          navigate("/individual-nomination-form", {
            state: { cat_id: selected_category },
          });
          break;
        default:
          break;
      }
    };

    const CategoryType = ({ cat_type }) => {
      console.log("cat: ", cat_type);
      switch (cat_type) {
        case "individual":
          return (
            <div className="d-flex justify-content-around">
              <FontAwesomeIcon className="m-1" color="#fff" icon={faUser} />
            </div>
          );
        case "organization":
          return (
            <div className="d-flex justify-content-around">
              <FontAwesomeIcon className="m-1" color="#fff" icon={faSchool} />
            </div>
          );
        case "both":
          return (
            <React.Fragment>
              <div className="d-flex flex-row justify-content-around align-items-center">
                <FontAwesomeIcon className="m-1" color="#fff" icon={faSchool} />
                <FontAwesomeIcon className="m-1" color="#fff" icon={faUser} />
              </div>
            </React.Fragment>
          );
        default:
          return <p className="text-danger">Unidentified category</p>;
      }
    };
    return (
      <React.Fragment>
        {form}
        <section className="landing-intro pt-5 pt-lg-6">
          <h1 className="text-center">Afya Awards</h1>
          <h2 className="text-center">
            Select a category you want to nominate
          </h2>
        </section>
        <Container>
          <section className="landing-intro pt-5">
            <div className="d-flex flex-wrap flex-row justify-content-around">
              {data.map((category) => {
                return (
                  <OverlayTrigger
                    key={category.id}
                    trigger="focus"
                    placement="auto"
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip id="333">dsfafdsafdsf</Tooltip>}
                  >
                    <Card
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSelection(category)}
                      className="voting-categories m-2"
                    >
                      <Row className="gx-0 h-100">
                        <Col md={3} className=" p-1 bg-categories">
                          <CategoryType cat_type={category.cat_type} />
                        </Col>
                        <Col md={9} className="p-1">
                          <Card.Header>
                            <p className="text-break text-center font-weight-bold">
                              {category.title}
                            </p>
                          </Card.Header>
                        </Col>
                      </Row>
                    </Card>
                  </OverlayTrigger>
                );
              })}
            </div>
          </section>
        </Container>
      </React.Fragment>
    );
  }
  if (error) {
    <React.Fragment>
      <section className="landing-intro pt-5 pt-lg-6">
        <h1>Afya Awards</h1>
        <h2>Select a category you want to nominate</h2>
      </section>
      <Alert className="my-3" variant="danger">
        <div className="alert-message">
          There was an error fetching categories
        </div>
      </Alert>
    </React.Fragment>;
  }
  return (
    <React.Fragment>
      <Spinner
        style={{ display: "block", margin: "auto" }}
        className="mt-6"
        as="span"
        animation="grow"
        role="status"
        aria-hidden="true"
      />
      <p className="text-center">Loading...</p>
    </React.Fragment>
  );
};

export default Categories;
