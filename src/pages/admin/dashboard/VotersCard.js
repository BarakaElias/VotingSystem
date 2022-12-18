import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Users } from "react-feather";
import { useGetNumVotersQuery } from "../../../redux/slices/voters";
const VotersCard = () => {
  const { data, isLoading, error } = useGetNumVotersQuery();
  const [voteCount, setVoteCount] = useState(null);
  var votes_num = null;
  useEffect(() => {
    const get_vote_count = async () => {
      const vote_count = await axios.get(
        "http://127.0.0.1:3001/votes/vote-count"
      );
      console.log("Vote count: ", vote_count);
      votes_num = vote_count["data"];
      await setVoteCount(votes_num);
      console.log("votes num", voteCount);
    };
    get_vote_count();
  }, []);
  var total = 0;
  if (!isLoading) {
    total = data;
  }
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={10}>
            <h1 className="display-3">{total}</h1>
            <h1>No. of Voters</h1>
          </Col>
          <Col>
            <div className="d-flex flex-column justify-space-between">
              <div bg="" className="stat">
                <Users
                  className="align-middle text-success"
                  width={64}
                  height={64}
                />
              </div>
              <div>{`${voteCount} votes`}</div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default VotersCard;
