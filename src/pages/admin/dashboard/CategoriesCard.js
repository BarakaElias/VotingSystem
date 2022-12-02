import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Layers } from "react-feather";
import { useGetNumberOfCategoriesQuery } from "../../../redux/slices/awardCategories";
const CategoriesCard = () => {
  const { data, isLoading } = useGetNumberOfCategoriesQuery();
  var total = 0;
  if (!isLoading) {
    console.log("Loaded total from db", data);
    total = data;
  }
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={10}>
            <h1 className="display-3">{total}</h1>
            <h1>No. of Categories</h1>
          </Col>
          <Col>
            <div bg="" className="stat">
              <Layers
                className="align-middle text-success"
                width={64}
                height={64}
              />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default CategoriesCard;
