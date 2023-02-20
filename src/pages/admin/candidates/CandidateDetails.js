import React, { useEffect, useState } from "react";

import { Button, Card, Row, Col } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import PieChart from "../../../ui/charts/Pie";
import axios from "axios";

// import avatar1 from "../../assets/img/avatars/avatar.jpg";
// import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
// import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
// import avatar5 from "../../assets/img/avatars/avatar-5.jpg";

// import unsplash1 from "../../assets/img/photos/unsplash-1.jpg";
// import unsplash2 from "../../assets/img/photos/unsplash-2.jpg";

const CandidateDetails = (props) => {
  const { candidate } = props;
  console.log("Candidate detail: ", candidate);
  const [pieData, setPieData] = useState({
    label: [],
    data: [],
  });

  useEffect(() => {
    async function getPieData() {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}candidates/votes`,
          null,
          {
            params: {
              candidate: candidate.name,
              category: candidate.category_id,
            },
          }
        );
        console.log("Fetched pie data: ", response);
        if (response.status === 200) {
          setPieData(response.data);
        }
      } catch (e) {
        console.log("Pie data error: ", e);
      }
    }
    getPieData();
  });

  return (
    <Card>
      <Card.Header>
        <Card.Title tag="h5" className="mb-0">
          Activities
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={4}>
            <FontAwesomeIcon icon={faHeart} size={64} />
            <h2 className="text-center">{candidate.category.title}</h2>
          </Col>
          <Col></Col>
          <Col md={4} className="text-center">
            <PieChart theData={pieData} />
          </Col>
        </Row>
        {/* <div className="m-5">
          <Row>
            <h3 className="p-2">
              What makes this individual stand out when compared to his or her
              peers in the health care sector?
            </h3>
            <p>
              The thing that makes this individual stand out is becuase lorem
              ipsum dolar sit at met. Unsplash from the assets images that
              contains photos from unsplash. This is meant to fill up the space
              of the ..
            </p>
            <hr></hr>
          </Row>
          <Row>
            <h3 className="p-2">
              How would you objectively quantify the achievements of the
              nominee?
            </h3>
            <p>
              The thing that makes this individual stand out is becuase lorem
              ipsum dolar sit at met. Unsplash from the assets images that
              contains photos from unsplash. This is meant to fill up the space
              of the ..
            </p>
            <hr></hr>
          </Row>
          <Row>
            <h3 className="p-2">
              What are some of the nominee's notable achievements over the last
              year or so?
            </h3>
            <p>
              The thing that makes this individual stand out is becuase lorem
              ipsum dolar sit at met. Unsplash from the assets images that
              contains photos from unsplash. This is meant to fill up the space
              of the ..
            </p>
            <hr></hr>
          </Row>
        </div> */}
      </Card.Body>
    </Card>
  );
};

export default CandidateDetails;
