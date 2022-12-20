import React, { useEffect, useState } from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import ResultCard from "./ResultCard";
import { useGetResultsQuery } from "../../../redux/slices/results";
import { Oval } from "react-loader-spinner";
// import io from "socket.io-client";

// const socket = io.connect("http://127.0.0.1:3001");
// console.log("Result card", socket);

const Results = () => {
  const [data, setData] = useState(null);
  // const { data } = useGetResultsQuery();
  // console.log("Resutls Page: loaded from server", data);
  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WS_URL);
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
  if (data === null) {
    return (
      <div
        style={{
          margin: "auto auto",
          display: "block",
          width: "180px",
          height: "90px",
        }}
      >
        <Oval
          className="text-center"
          height={40}
          width={40}
          color="#1c1d21"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#bfc0c5"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }
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
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Results;
