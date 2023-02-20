import React from "react";

//Layouts
import DashboardLayout from "./layouts/Dashboard";
import LandingLayout from "./layouts/Landing";
import DocLayout from "./layouts/Doc";
import AuthLayout from "./layouts/Auth";

//Auth Pages
import Page401 from "./pages/auth/Page401";

//Guards
import AuthGuard from "./components/guards/AuthGuard";
import AdminGuard from "./components/guards/AdminGuard";
import GuestGuard from "./components/guards/GuestGuard";

//Admin Pages
import SignIn from "./pages/auth/SignIn";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Candidates from "./pages/admin/candidates/Candidates";
import Candidate from "./pages/admin/candidates/Candidate";
import Votes from "./pages/admin/votes/Votes";
import Voters from "./pages/admin/voters/Voters";
import AwardCategories from "./pages/admin/categories/AwardCategories";
import Results from "./pages/admin/results/Results";
import Nominations from "./pages/admin/nominations/Nominations";
import Nomination from "./pages/admin/nominations/Nomination";
import AwardCycles from "./pages/admin/awardCycle/AwardCycles";
import CreateUser from "./pages/admin/users/CreateUser";
import Users from "./pages/admin/users/Users";
import IndividualNominations from "./pages/admin/nominations/individual/IndividualNominations";
import IndividualNomination from "./pages/admin/nominations/individual/IndividualNomination";
import OrganizationNominations from "./pages/admin/nominations/organization/OrganizationNominations";
import OrganizationNomination from "./pages/admin/nominations/organization/OrganizationNomination";
import Questions from "./pages/admin/nominations/questions/Questions";
import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";

const routes = [
  {
    path: "/sign-in",
    element: (
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    ),
  },
  {
    path: "/admin",
    element: (
      <DashboardLayout>
        <AdminGuard />
      </DashboardLayout>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "candidates",
        element: <Candidates />,
      },
      {
        path: "candidates/:id",
        element: <Candidate />,
      },
      {
        path: "votes",
        element: <Votes />,
      },
      {
        path: "voters",
        element: <Voters />,
      },
      {
        path: "categories",
        element: <AwardCategories />,
      },
      {
        path: "results",
        element: <Results />,
      },
      {
        path: "nominations",
        // element: <Nominations />,
        children: [
          {
            path: "questions",
            element: <Questions />,
          },
          {
            path: "individual-nominations",
            element: <IndividualNominations />,
          },
          {
            path: "individual-nominations/:id",
            element: (
              // <AdminGuard>
              <IndividualNomination />
              // </AdminGuard>
            ),
          },
          {
            path: "organization-nominations",
            element: <OrganizationNominations />,
          },
          {
            path: "organization-nominations/:id",
            element: (
              // <AdminGuard>
              <OrganizationNomination />
              // </AdminGuard>
            ),
          },
        ],
      },
      {
        path: "nominations/:id",
        element: <Nomination />,
      },
      {
        path: "award-cycles",
        element: <AwardCycles />,
      },
      {
        path: "users",
        children: [
          {
            path: "all-users",
            element: <Users />,
          },
          {
            path: "create",
            element: <CreateUser />,
          },
        ],
      },
      {
        path: "401",
        element: <Page401 />,
      },
    ],
  },
];

export default routes;
