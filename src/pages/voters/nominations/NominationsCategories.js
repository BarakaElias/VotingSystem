import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { useGetAllCategoriesQuery } from "../../../redux/slices/awardCategories";
const NominationsCategories = () => {
  const { data = [], error, isLoading } = useGetAllCategoriesQuery();
  if (!isLoading) {
    console.log("INF categories", data);
    return (
      <React.Fragment>
        <Container className="mt-3">
          <h1 className="text-center">
            Select a category you want to nominate in
          </h1>
          <div className="d-flex flex-row justify-space-around flex-wrap">
            {data.map((category) => {
              return (
                <Card className="mt-2 ms-5 me-5" style={{ width: "18rem" }}>
                  <Card.Header>
                    <h2 className="text-center">{category.title}</h2>
                  </Card.Header>
                  <Card.Body>
                    <p className="text-justify">{category.description}</p>
                  </Card.Body>
                  <Link
                    className="stretched-link"
                    to={`/individual-nomination-form?cat_id=${category.id}`}
                  />
                </Card>
              );
            })}
          </div>
        </Container>
      </React.Fragment>
    );
  } else if (error) {
    return <h1 className="text-danger">Could not fetch categories</h1>;
  }
  return (
    <React.Fragment>
      <Container fluid className="mt-3">
        <Spinner
          style={{ width: "30px", display: "block", margin: "auto" }}
          animation="border"
          variant="primary"
        />
        <h3 className="text-center">Fetching categories</h3>
      </Container>
    </React.Fragment>
  );
};
export default NominationsCategories;
