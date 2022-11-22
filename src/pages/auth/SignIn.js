import React from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "react-bootstrap";

import SignIn from "../../components/auth/SignIn";
import avatar from "../../assets/img/avatars/avatar.jpg";
import { Link } from "react-router-dom";

const SignInPage = () => {
  console.log("Signin page displaying");
  return (
    <React.Fragment>
      <Helmet title="Sign In" />
      <div className="text-center mt-4">
        <h2>Afya Awards Voting System</h2>
        <p className="lead">Sign in to your account to continue</p>
      </div>

      <Card>
        <Card.Body>
          <div className="m-sm-4">
            <div className="text-center">
              <img
                src={avatar}
                alt="Chris Wood"
                className="img-fluid rounded-circle"
                width="132"
                height="132"
              />
            </div>
            <SignIn />
          </div>
          <Link to="/auth/sign-up">Create a free account</Link>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default SignInPage;
