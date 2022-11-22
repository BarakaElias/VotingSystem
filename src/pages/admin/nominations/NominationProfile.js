import React from "react";
import { Link } from "react-router-dom";

import { Badge, Button, Card } from "react-bootstrap";

import { Briefcase, Home, MapPin, MessageSquare } from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import avatar4 from "../../../assets/img/avatars/avatar-4.jpg";

const NominationProfile = (props) => {
  const { nomination } = props;

  return (
    <Card>
      <Card.Header>
        <Card.Title tag="h5" className="mb-0">
          Profile Details
        </Card.Title>
      </Card.Header>
      <Card.Body className="text-center">
        <img
          src={avatar4}
          alt="Stacie Hall"
          className="img-fluid rounded-circle mb-2"
          width="128"
          height="128"
        />
        <Card.Title tag="h5" className="mb-0">
          {nomination.nominator}
        </Card.Title>
        <div className="text-muted mb-2">Lead Developer</div>

        <div>
          <Button size="sm" variant="primary" className="me-1">
            Follow
          </Button>
          <Button size="sm" variant="primary">
            <MessageSquare width={16} height={16} /> Message
          </Button>
        </div>
      </Card.Body>

      <hr className="my-0" />

      <hr className="my-0" />
      <Card.Body>
        <Card.Title tag="h5">About</Card.Title>
        <ul className="list-unstyled mb-0">
          <li className="mb-1">
            <Briefcase width={14} height={14} className="me-1" /> Works at{" "}
            <Link to="/dashboard/default">{nomination.nominator_company}</Link>
          </li>
          <li className="mb-1">
            <Home width={14} height={14} className="me-1" /> Company Address{" "}
            <Link to="/dashboard/default"></Link>
          </li>
          <li className="mb-1">
            <MapPin width={14} height={14} className="me-1" /> From{" "}
            <Link to="/dashboard/default">Tanzania</Link>
          </li>
        </ul>
      </Card.Body>
      <hr className="my-0" />
      <Card.Body>
        <Card.Title tag="h5">Contact</Card.Title>

        <ul className="list-unstyled mb-0">
          <li className="mb-1">
            <FontAwesomeIcon icon={faGlobe} fixedWidth className="me-1" />
            <Link to="/dashboard/default">
              {nomination.nominator_phonenumber}
            </Link>
          </li>
          <li className="mb-1">
            <FontAwesomeIcon icon={faTwitter} fixedWidth className="me-1" />
            <Link to="/dashboard/default">{nomination.nominator_email}</Link>
          </li>
          <li className="mb-1">
            <FontAwesomeIcon icon={faFacebook} fixedWidth className="me-1" />
            <Link to="/dashboard/default">Facebook</Link>
          </li>
          <li className="mb-1">
            <FontAwesomeIcon icon={faInstagram} fixedWidth className="me-1" />
            <Link to="/dashboard/default">Instagram</Link>
          </li>
          <li className="mb-1">
            <FontAwesomeIcon icon={faLinkedin} fixedWidth className="me-1" />
            <Link to="/dashboard/default">LinkedIn</Link>
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default NominationProfile;
