import React, { useState } from "react";
import { Card, Badge, ListGroup, ProgressBar } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Award } from "react-feather";
import avatar1 from "../../../assets/img/avatars/avatar.jpg";
import avatar2 from "../../../assets/img/avatars/avatar-2.jpg";
import avatar3 from "../../../assets/img/avatars/avatar-3.jpg";
import { useNavigate } from "react-router-dom";

const AwardCycle = ({ id, title, judges, state, description, image }) => {
  let color = "";
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate("222")}
      className="m-3"
      style={{ width: "30%", cursor: "pointer" }}
    >
      {image ? <Card.Img src={image} alt="Card image cap" /> : ""}
      <Card.Header className="px-4 pt-4">
        <div className="d-flex flex-row justify-content-between">
          <h1>{title}</h1>
        </div>
        <Badge className="my-2" bg={color}>
          {state}
        </Badge>
      </Card.Header>
      <Card.Body className="px-4 pt-2">
        <p>{description}</p>
      </Card.Body>
    </Card>
  );
};

export default AwardCycle;
