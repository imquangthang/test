import React, { useContext, useEffect, useState } from "react";
import "./NavHeader.scss";
import {
  Link,
  NavLink,
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../logo.png";
import { getUserAccount, logoutUser } from "../../services/userService";
import { toast } from "react-toastify";

const NavHeader = (props) => {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = async () => {
    let data = await logoutUser(); // clear cookies
    localStorage.removeItem("jwt"); // clear local storage
    logoutContext(); // clear user in context
    if (data && +data.EC === 0) {
      toast.success("Logout succeeds...");
      history.push("/login");
    } else {
      toast.error(data.EM);
    }
  };

  const [userValid, setUserValid] = useState("");
  const checkUser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let group = response.DT.groupWithRoles.name;
      setUserValid(group);
    } else {
      setUserValid("");
    }
  };

  useEffect(() => {
    checkUser();
  }, [userValid]);

  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <>
        <div className="navbar-light bg-light">
          <div className="nav-header container">
            <Navbar expand="lg" className="bg-body-tertiary" bg="header">
              <Navbar.Brand href="/">
                <h3 className="brand">
                  <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top mx-3"
                    alt="Logo"
                  />
                  <span className="brand-name">JOBTOP</span>
                </h3>
              </Navbar.Brand>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <NavLink to="/" exact className="nav-link">
                      Home
                    </NavLink>
                    <div className="dropdown">
                      <a
                        className={
                          location.pathname === "/job"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Việc Làm
                      </a>
                      <div className="dropdown-content">
                        <NavLink to="/job" className="nav-link">
                          Tìm việc làm
                        </NavLink>
                      </div>
                    </div>
                    <div className="dropdown">
                      <a
                        className={
                          location.pathname === "/cv-template"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Hồ sơ và CV
                      </a>
                      <div className="dropdown-content">
                        <NavLink to="/cv-template" className="nav-link">
                          CV Template
                        </NavLink>
                      </div>
                    </div>
                    {userValid === "Dev" ? (
                      <>
                        <div className="dropdown">
                          <a
                            className={
                              location.pathname === "/accounts" ||
                              location.pathname === "/roles" ||
                              location.pathname === "/group-role"
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            Edit
                          </a>
                          <div className="dropdown-content">
                            <NavLink to="/accounts" className="nav-link">
                              Account
                            </NavLink>
                            <NavLink to="/roles" className="nav-link">
                              Roles
                            </NavLink>
                            <NavLink to="/group-role" className="nav-link">
                              Group-Role
                            </NavLink>
                            <NavLink to="/edit-jobs" className="nav-link">
                              Edit Jobs
                            </NavLink>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {userValid === "Customer" ? (
                      <>
                        <div className="dropdown">
                          <a
                            className={
                              location.pathname === "/company-jobs" ||
                              location.pathname === "/check-status-jobs"
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            Company
                          </a>
                          <div className="dropdown-content">
                            <NavLink to="/company-jobs" className="nav-link">
                              Company jobs
                            </NavLink>
                            <NavLink
                              to="/check-status-jobs"
                              className="nav-link"
                            >
                              Check status jobs
                            </NavLink>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </Nav>
                  <Nav>
                    {user && user.isAuthenticated === true ? (
                      <>
                        <Nav.Item className="nav-link welcome">
                          WELCOME {user.account.username} !
                        </Nav.Item>

                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                          <NavDropdown.Item>Change Password</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item>
                            <span onClick={() => handleLogout()}>Log out</span>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </>
                    ) : (
                      <Link className="nav-link" to="/login">
                        <button
                          className="btn btn-outline-info me-2 mb-1"
                          type="button"
                        >
                          Đăng Nhập
                        </button>
                      </Link>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default NavHeader;
