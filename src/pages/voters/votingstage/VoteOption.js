import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import MobileAuth from "../../../components/auth/MobileAuth";
import avatar from "../../../assets/img/avatars/avatar.jpg";
import ValidationCode from "../../../components/auth/ValidationCode";

const VoteOption = (props) => {
  const { candidate, category, handleChange } = props;
  return (
    <div className="box">
      <input
        type="radio"
        onChange={handleChange}
        value={candidate.id}
        name={category.id}
        id=""
      />
      <div className="boxContent">
        <img
          src={avatar}
          alt="Chris Wood"
          className="img-fluid rounded"
          width="100%"
          height="152"
        />
        <h2>{candidate.name}</h2>
        <p>{candidate.company}</p>
      </div>
    </div>
  );
};

export default VoteOption;
