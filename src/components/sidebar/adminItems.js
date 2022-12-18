import {
  Info,
  Award,
  Briefcase,
  Archive,
  UserCheck,
  Columns,
  Users,
  Clipboard,
  BarChart2,
} from "react-feather";

const adminSection = [
  {
    href: "/admin/dashboard",
    icon: Info,
    title: "Dashboard",
  },
  {
    href: "/admin/award-cycles",
    icon: Award,
    title: "Award Cycle",
  },
];

const manageSection = [
  {
    href: "/admin/voters",
    icon: Users,
    title: "Voters",
  },
  {
    href: "/admin/votes",
    icon: Archive,
    title: "Votes",
  },
  {
    href: "/admin/categories",
    icon: Columns,
    title: "Award Categories",
  },
  {
    href: "/admin/nominations",
    icon: Clipboard,
    title: "Nominations",
    children: [
      {
        href: "/admin/nominations/questions",
        title: "Questions",
      },
      {
        href: "/admin/nominations/individual-nominations",
        title: "Individual Nominations",
      },
      {
        href: "/admin/nominations/organization-nominations",
        title: "Organization Nominations",
      },
    ],
  },
  {
    href: "/admin/candidates",
    icon: UserCheck,
    title: "Candidates",
  },
  {
    href: "/admin/results",
    icon: BarChart2,
    title: "Results",
  },
];

const settingsSection = [
  // {
  //   href: "/admin/ballot-positions",
  //   icon: Archive,
  //   title: "Ballot Positions",
  // },
  {
    href: "/admin/users",
    icon: Users,
    title: "Users",
    children: [
      {
        href: "/admin/users/all-users",
        title: "All Users",
      },
      {
        href: "/admin/users/create",
        title: "Create User",
      },
    ],
  },
];

const navItems = [
  {
    title: "Administration",
    pages: adminSection,
  },
  {
    title: "Manage",
    pages: manageSection,
  },
  {
    title: "Settings",
    pages: settingsSection,
  },
];

export default navItems;
