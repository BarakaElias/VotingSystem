import React from "react";
import { Helmet } from "react-helmet-async";

import { Slash } from "react-feather";

const Page401 = () => (
  <React.Fragment>
    <Helmet title="401 Error" />
    <div className="text-center">
      <Slash width={128} height={128} />
      <h1 className="display-1 fw-bold">401</h1>
      <p className="h1">Not Authorized.</p>
      <p className="h2 fw-normal mt-3 mb-4">
        You don't have the authorization to access this page
      </p>
    </div>
  </React.Fragment>
);

export default Page401;
