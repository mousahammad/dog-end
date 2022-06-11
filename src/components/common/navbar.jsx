import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, NavLink } from "react-bootstrap";
import userService from "../../services/userService/userService";
import { useCookies } from "react-cookie";
import config from "../../config.json";
import { useState } from "react";

const NavbarComp = () => {
  const [cookies, setCookie] = useCookies(["data"]);
  const [loading, setLoading] = useState(true);

  const updateStatusOffline = async (e) => {
    try {
      await userService.updateOffline();
    } catch ({ response }) {}
  };

  useEffect(() => {
    const getData = async () => {
      if (userService.getJwt()) {
        let user = await userService.getInfoUser();
        setCookie("data", user.data);
        if (!cookies.data) {
          return <p>טוען תוכן...</p>;
        } else {
          await userService.updateOnline();
        }
      }
    };

    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  if (loading) {
    return "<h1> טוען את התוכן המבוקש ...</h1>";
  }

  window.addEventListener("unload", updateStatusOffline);

  const { data } = cookies;

  return (
    <>
      <Navbar className="navbarBackGroundColor" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Navbar.Brand href="/home">Dogit</Navbar.Brand>
              <NavDropdown
                title={
                  data ? (
                    <>
                      <img
                        src={
                          data.image
                            ? `${config.pictureUrl}${data._id}.jpg`
                            : config.defaultImage
                        }
                        className="imageProfile"
                      />
                      <span> שלום {data.firstName}</span>
                    </>
                  ) : (
                    <i className="bi bi-gear"></i>
                  )
                }
                id="basic-nav-dropdown"
              >
                {!data ? (
                  <>
                    <NavDropdown.Item href="/signup" title="הרשמה">
                      הרשמה <i className="bi bi-door-open"></i>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/login" title="כניסה">
                      התחברות <i className="bi bi-box-arrow-in-right"></i>
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item href="/profile">
                      הפרופיל שלי <i className="bi bi-gear"> </i>{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/logout" title="יציאה">
                      יציאה <i className="bi bi-box-arrow-in-right"></i>
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>

              <Nav.Link href="/" title="דף הבית">
                דף הבית
              </Nav.Link>
              {data && (
                <>
                  <NavDropdown title="שירותים שלנו" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/dogtrainer">
                      מאלפים
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/dogwalker">
                      דוגווקר
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/Article">
                      מאמרים
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/favoriteWalker" title="דוג ווקר מועדפים">
                    כרטיסי דוגווקר מועדפים
                  </Nav.Link>
                  <Nav.Link href="/favoriteTrainer" title="טרינר מועדפים">
                    כרטיסי מאלפים מועדפים
                  </Nav.Link>

                  <Nav.Link href="/allUsersOnline" title="משתמשי אונליין">
                    משתמשים אונליין
                  </Nav.Link>

                  {data.admin && (
                    <Nav.Link href="/allUsers" title="כל המשתמשים">
                      כל המשתמשים
                    </Nav.Link>
                  )}
                </>
              )}
              <Nav.Link href="/contactus">צור קשר</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
