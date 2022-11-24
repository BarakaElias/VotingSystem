import React from "react";
import { Card, Badge, ListGroup, ProgressBar } from "react-bootstrap";
import { Award } from "react-feather";
import avatar1 from "../../../assets/img/avatars/avatar.jpg";
import avatar2 from "../../../assets/img/avatars/avatar-2.jpg";
import avatar3 from "../../../assets/img/avatars/avatar-3.jpg";

const AwardCycle = ({ title, judges, state, description, image }) => {
  let color = "";
  return (
    <Card className="m-3" style={{ width: "20%", cursor: "pointer" }}>
      {image ? <Card.Img src={image} alt="Card image cap" /> : ""}
      <Card.Header className="px-4 pt-4">
        <div className="text-center">
          <img
            src={avatar3}
            width="128"
            height="128"
            className="rounded-circle me-2"
            alt="Avatar"
          />
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
