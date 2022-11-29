import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import { Slash } from "react-feather";

import useAuth from "../../hooks/useAuth";

function UnAuthorized() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-end">
      <div>
        <Slash width={128} height={128} />
      </div>
    </div>
  );
}

export default UnAuthorized;
