import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import MobileAuth from "../../../components/auth/MobileAuth";
import avatar from "../../../assets/img/avatars/avatar.jpg";
import ValidationCode from "../../../components/auth/ValidationCode";

const VoteOption = () => {
  return (
    <div className="box">
      <input type="radio" name="abc" id="" />
      <div class="boxContent">
        <img
          src={avatar}
          alt="Chris Wood"
          className="img-fluid rounded-circle"
          width="152"
          height="152"
        />
        <h3>Name</h3>
        <p>Subtitle</p>
      </div>
    </div>
  );
};

export default VoteOption;
