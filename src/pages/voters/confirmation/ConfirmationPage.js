import React from "react";
import {
  Row,
  Container,
  Form,
  Alert,
  Button,
  Accordion,
  Card,
} from "react-bootstrap";
import avatar from "../../../assets/img/avatars/avatar.jpg";
import FlatSimpleTable from "../../../ui/tables/FlatSimpleTable";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const ConfirmationPage = () => {
  const token = useSelector((state) => state.voters.token);
  const voterId = useSelector((state) => state.voters.userId);
  console.log("Confirmation page: voter id is", voterId);
  const navigate = useNavigate();
  const location = useLocation();
  const candidates = useSelector((state) => state.candidates.candidates);
  const categories = useSelector(
    (state) => state.awardCategories.awardCategories
  );
  const vote = location.state;

  console.log("Confirmation", vote);
  //getting the current date
  const now = new Date();
  const date = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`;

  const values = [];
  const votes = [];

  //prepare votes
  Object.entries(vote).map(([key, value]) => {
    const vot = {};
    vot["category"] = key;
    vot["candidate"] = value;
    votes.push(vot);
  });

  // prepareVotes();
  console.log("The prepared votes", votes);

  //prepares row values for the summary table
  // Object.entries(vote).map(([key, value]) => {
  //   const catId = Number(key);
  //   const the_cat = categories.find((category) => category.id === catId);
  //   const the_cand = candidates.find((cand) => cand.id === Number(value));
  //   values.push({
  //     category: the_cat.title,
  //     candidate: the_cand.name,
  //   });
  // });

  const postVote = async () => {
    console.log("posting vote", vote);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3001/votes",
        {
          params: { voterId: voterId, votes: votes },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Submitting votes confiration", response);
    } catch (err) {
      console.log("Submitting votes confirmation", err);
    }
    navigate("/thank-you");
  };

  const num_categories = `Categories: ${values.length}`;

  const cols = [
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Candidate",
      accessor: "candidate",
    },
  ];

  return (
    // <section className="landing-intro landing-bg pt-5 pt-lg-6 pb-5 pb-lg-7">
    <React.Fragment>
      <Container fluid="md" className="landing-intro-content">
        <div className="text-center mt-4">
          <h2>Afya Awards</h2>
          <p className="lead">Confirm your Vote</p>
        </div>
        <Card>
          <Card.Header>
            <div className="text-center">
              <h3>Summary</h3>
              <h5>{date}</h5>
              <h5>{num_categories}</h5>
            </div>
          </Card.Header>
          <Card.Body>
            <FlatSimpleTable values={votes} cols={cols} />
          </Card.Body>
          <Card.Footer>
            <div className="text-center">
              <Button onClick={postVote} size="lg" variant="success">
                Confirm
              </Button>
            </div>
          </Card.Footer>
        </Card>
        <Row className="align-items-center"></Row>
      </Container>
    </React.Fragment>
    // </section>
  );
};

export default ConfirmationPage;
