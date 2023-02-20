import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Card, Modal, CloseButton } from "react-bootstrap";

import { Briefcase, Camera, Home, MapPin, MessageSquare } from "react-feather";
import UploadProfilePic from "./UploadProfilePic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import avatar4 from "../../../assets/img/avatars/avatar-4.jpg";

const CandidateProfile = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { candidate } = props;
  console.log("Candidate profile: ", candidate);
  var category = "";
  if (candidate.category) {
    const cat = { ...candidate.category };
    category = cat.title;
  }
  console.log("Candidate profile category: ", candidate.category);
  const profilePic = candidate.photo_url !== "" ? candidate.photo_url : avatar4;
  let form = modalOpen ? (
    <Modal show={true} size="xl" centered>
      <Modal.Header>
        <h2>Profile picture upload for candidate</h2>
        <CloseButton
          aria-label="Hide"
          onClick={() => {
            setModalOpen(false);
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <UploadProfilePic candidateId={candidate.id} />
      </Modal.Body>
    </Modal>
  ) : null;
  return (
    <React.Fragment>
      {form}
      <Card>
        <Card.Header>
          <Card.Title tag="h5" className="mb-0">
            Profile Details
          </Card.Title>
        </Card.Header>
        <Card.Body className="text-center">
          <div className="candidate-profile d-flex flex-column flex-wrap justify-content-around mb-5">
            <img
              src={profilePic}
              alt="Stacie Hall"
              className="img-fluid mx-auto img-thumbnail mb-2"
              width="200"
              height="200"
              style={{ objectFit: "cover" }}
            />
            <br></br>
            <Button
              onClick={() => {
                setModalOpen(true);
              }}
              className="text-center"
              variant="link"
            >
              Upload profile picture
            </Button>
          </div>

          <Card.Title tag="h5" className="mb-0">
            {candidate.name}
          </Card.Title>
          <div className="text-muted mb-2">{category}</div>

          {/* <div>
            <Button size="sm" variant="primary" className="me-1">
              Follow
            </Button>
            <Button size="sm" variant="primary">
              <MessageSquare width={16} height={16} /> Message
            </Button>
          </div> */}
        </Card.Body>

        <hr className="my-0" />

        <hr className="my-0" />
        <Card.Body>
          <Card.Title tag="h5">About</Card.Title>
          <ul className="list-unstyled mb-0">
            <li className="mb-1">
              <Briefcase width={14} height={14} className="me-1" /> Works at{" "}
              <Link to="/dashboard/default">{candidate.company_name}</Link>
            </li>
            <li className="mb-1">
              <Home width={14} height={14} className="me-1" /> Company Address{" "}
              <Link to="/dashboard/default">{candidate.company_address}</Link>
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
              <Link to="/dashboard/default">{candidate.phone_number}</Link>
            </li>
            <li className="mb-1">
              <FontAwesomeIcon icon={faTwitter} fixedWidth className="me-1" />
              <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
            </li>
          </ul>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default CandidateProfile;
