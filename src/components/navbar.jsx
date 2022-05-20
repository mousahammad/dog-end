import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import userService from "../services/userService/userService";
import { useCookies } from "react-cookie";
import config from "../config.json";

const NavbarComp = () => {
  const [cookies, setCookie] = useCookies(["data"]);

  useEffect(() => {
    const getData = async () => {
      if (userService.getJwt()) {
        let user = await userService.getInfoUser();
        setCookie("data", user.data);
        if (!cookies.data) {
          return <p>Loading ...</p>;
        }
      }
    };
    getData();
  }, []);

  const { data } = cookies;

  return (
    <>
      <Navbar className="navbarBackGroundColor" expand="md">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand href="/home">Dogit</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" title="דף הבית">
                דף הבית
              </Nav.Link>
              <Nav.Link href="/favoriteWalker" title="דוג ווקר מועדפים">
                כרטיסי דוג ווקר מועדפים
              </Nav.Link>

              <Nav.Link href="/chat" title="צ'אט">
                צ'אט
              </Nav.Link>
              <NavDropdown title="שירותים שלנו" id="basic-nav-dropdown">
                <NavDropdown.Item href="/dogtrainer">מאלפים</NavDropdown.Item>
                <NavDropdown.Item href="/dogwalker">דוגווקר</NavDropdown.Item>
                <NavDropdown.Item href="/myPark">הגינה שלי</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/contactus">צור קשר</Nav.Link>

              <NavDropdown
                title={
                  data ? (
                    <>
                      <span>{data.firstName} שלום </span>
                      <img
                        src={
                          data.image
                            ? `${config.pictureUrl}${data._id}.jpg`
                            : config.defaultImage
                        }
                        className="imageProfile"
                      />
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
                    <NavDropdown.Item href="/myPark">
                      הגינה שלי
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
