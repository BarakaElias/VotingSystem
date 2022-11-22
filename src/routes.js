import React from "react";

//Layouts
import DashboardLayout from "./layouts/Dashboard";
import LandingLayout from "./layouts/Landing";
import DocLayout from "./layouts/Doc";
import AuthLayout from "./layouts/Auth";

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
    element: <DashboardLayout />,
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
        element: <Nominations />,
      },
      {
        path: "nominations/:id",
        element: <Nomination />,
      },
    ],
  },
];

export default routes;
