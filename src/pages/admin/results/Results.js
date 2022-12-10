import React, { useEffect, useState } from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import ResultCard from "./ResultCard";
import { useGetResultsQuery } from "../../../redux/slices/results";
// import io from "socket.io-client";

// const socket = io.connect("http://127.0.0.1:3001");
// console.log("Result card", socket);

const Results = () => {
  const [data, setData] = useState([]);
  // const { data } = useGetResultsQuery();
  // console.log("Resutls Page: loaded from server", data);
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:3001");
    ws.addEventListener("message", (event) => {
      console.log("From server: ", JSON.parse(event.data));
      setData(JSON.parse(event.data));
    });
    return () => {
      console.log("Closing ws connection");
      ws.close();
    };
  });

  console.log("Results", data);

  return (
    <React.Fragment>
      <Helmet title="Results" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Results</h1>
        <Row>
          {/* new code */}
          {data.map((category) => {
            return (
              <Col key={category.title} md={4}>
                <ResultCard
                  k={category.title}
                  cat_title={category.title}
                  result={category.candidates}
                />
              </Col>
            );
          })}
          {/* old code */}
          {/* <Col md={4}>
            <ResultCard k="a" />
          </Col>
          <Col md={4}>
            <ResultCard k="b" />
          </Col>
          <Col md={4}>
            <ResultCard k="c" />
          </Col>
          <Col md={4}>
            <ResultCard k="d" />
          </Col>
          <Col md={4}>
            <ResultCard k="g" />
          </Col> */}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Results;
