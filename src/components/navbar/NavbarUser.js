import React from "react";
import { Dropdown } from "react-bootstrap";
import { Settings, Lock, Key } from "react-feather";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useAppSelector from "../../hooks/useAppSelector";
import avatar1 from "../../assets/img/avatars/avatar.jpg";
import { logUserOut } from "../../redux/slices/user";
import useAuth from "../../hooks/useAuth";

const NavbarUser = () => {
  var user = useAppSelector((state) => state.authSlice.user);
  console.log("Navbar user: ", user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    dispatch(logUserOut());
    await signOut();
    navigate("/sign-in");
  };
  // const user = useSelector((state: RootStateOrAny) => //state.user.value);
  return (
    <Dropdown className="nav-item" align="end">
      <span className="d-inline-block d-sm-none">
        <Dropdown.Toggle as="a" className="nav-link">
          <Settings size={18} className="align-middle" />
        </Dropdown.Toggle>
      </span>
      <span className="d-none d-sm-inline-block">
        <Dropdown.Toggle as="a" className="nav-link">
          <img src={avatar1} className="avatar img-fluid rounded-circle me-1" />
          <span className="text-dark">{user ? user.name : "No user"}</span>
        </Dropdown.Toggle>
      </span>
      <Dropdown.Menu drop="end">
        <Dropdown.Item>
          <Lock size={18} className="align-middle me-2" />
          <Link to="/users/my_profile">Change Password</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Key size={18} className="align-middle me-2" />
          Two factor
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Last Login</Dropdown.Item>
        <Dropdown.Item>Help</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarUser;
