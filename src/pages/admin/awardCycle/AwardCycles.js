import React, { useState } from "react";
import { Card, Row, Container, Col, Button, Modal } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import FullTable from "../../../ui/tables/FullTable";
import {
  EmptyColumnFilter,
  ColumnFilter,
} from "../../../ui/tables/TableFilters";
import { useSelector } from "react-redux";
import { Trash, Eye } from "react-feather";
import { useNavigate } from "react-router-dom";
import AwardCycle from "./AwardCycle";
import AwardCycleForm from "./AwardCycleForm";

const AwardCycles = () => {
  const awardCycles = useSelector((state) => state.awardCycles.awardCycles);
  const navigate = useNavigate();
  const handleClick = (id) => {
    console.log(id);
    navigate(`/admin/candidates/${id}`);
  };

  const [modalState, setModalState] = useState({ isOpen: false });

  const closeModal = () => {
    setModalState({ isOpen: false });
  };
  let form = modalState.isOpen ? (
    <Modal show={true} size="xl" centered>
      <Modal.Header>
        <h1>Add an Award Category</h1>
      </Modal.Header>
      <Modal.Body>
        <AwardCycleForm closeModal={closeModal} />
      </Modal.Body>
    </Modal>
  ) : null;

  const openModal = () => {
    setModalState({ isOpen: true });
  };

  return (
    <React.Fragment>
      {form}
      <Helmet title="Award Cycles" />
      <Container fluid className="p-0">
        <Row>
          <div className="d-flex flex-row flex-wrap justify-content-between">
            <div>
              <h1 className="h3 mb-3">Award Cycles</h1>
            </div>
            <div>
              <Button
                onClick={(event) => openModal()}
                variant="outline-success"
              >
                Add Award Cycle
              </Button>
            </div>
          </div>
        </Row>
      </Container>
      <div className="d-flex flex-row flex-wrap">
        {awardCycles.map((awardCycle) => (
          <AwardCycle
            key={awardCycle.id}
            title={awardCycle.title}
            created={awardCycle.created}
            description={awardCycle.description}
            judges={awardCycle.judges}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default AwardCycles;
