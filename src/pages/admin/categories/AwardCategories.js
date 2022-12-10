import React, { useEffect, useState } from "react";
import { Card, Row, Container, Button, Col, Modal } from "react-bootstrap";
import { Edit, Trash } from "react-feather";
import { Helmet } from "react-helmet-async";
import FullTable from "../../../ui/tables/FullTable";
import {
  EmptyColumnFilter,
  ColumnFilter,
} from "../../../ui/tables/TableFilters";
import ModalForm from "../../../ui/modals/ModalForm";
import AwardCategoryForm from "./AwardCategoryForm";
import { useSelector } from "react-redux";

//rtk query
import {
  useGetAllCategoriesQuery,
  useLazyGetAllCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../../redux/slices/awardCategories";
import { useNavigate } from "react-router-dom";
let Yup = require("yup");

const AwardCategories = () => {
  const token = useSelector((state) => state.authSlice.token);
  console.log("token", token);
  const [deleteCategory] = useDeleteCategoryMutation();
  const navigate = useNavigate();
  var rows = [];
  const [trigger, { data = [], error, isLoading }] =
    useLazyGetAllCategoriesQuery();
  useEffect(() => {
    setTimeout(() => trigger(), 500);
  }, []);
  if (error === 401) {
    navigate("/admin/401");
  }
  if (!isLoading) {
    rows = data;
  }
  console.log("Categories rtk", data);
  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Description",
      accessor: "description",
      maxWidth: 200,
    },
    {
      Header: "Candidates",
      accessor: "candidates",
    },
    {
      Header: "Date Created",
      accessor: "date_created",
    },
    {
      Header: "",
      accessor: "id",
      Cell: ({ value }) => {
        return (
          <div className="d-flex flex-row justify-content-between">
            {/* <Edit className="m-3" size="24" color="#293042" /> */}
            <Trash
              onClick={(event) => deleteCategory(value)}
              className="m-3"
              size="24"
              color="#d34d49"
            />
          </div>
        );
      },
    },
  ];

  const closeModal = () => {
    setModalState({ isOpen: false });
  };

  //Modal form adding a Category

  const [modalState, setModalState] = useState({ isOpen: false });

  let form = modalState.isOpen ? (
    <Modal show={true} size="xl" centered>
      <Modal.Header>
        <h1>Add an Award Category</h1>
      </Modal.Header>
      <Modal.Body>
        <AwardCategoryForm closeModal={closeModal} />
      </Modal.Body>
    </Modal>
  ) : null;

  const openModal = (category) => {
    setModalState({ isOpen: true });
  };

  return (
    <React.Fragment>
      {form}
      <Helmet title="Candidates" />
      <Container fluid className="p-0">
        <Row>
          <Col md={11}>
            <h1 className="h3 mb-3">Award Categories</h1>
          </Col>
          <Col md={1}>
            <Button onClick={openModal} variant="primary">
              Add Category
            </Button>
          </Col>
        </Row>
        <Card>
          <Card.Body>
            <FullTable values={rows} cols={columns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default AwardCategories;
