import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import Hamburger from "hamburger-react";
import { BsPersonCircle } from "react-icons/bs";
import "./DashNav.css";
import Home from "../Home";
import contractContext from "../../utils/contractContext";

function DashNav(props) {
  const { currentAccount, accountBalance, connectWalletHandler } =
    useContext(contractContext);
  connectWalletHandler();
  // console.log(accountBalance)
  // initialise blockchain address as a string
  const blockAddress = currentAccount;
  // console.log(props.userAccount.address)
  if (localStorage.getItem("mobile_no")) {
    return (
      <Navbar collapseOnSelect expand="lg" bg="black" fixed="top">
        <Nav
          className="align-items-center w-100"
          style={{ position: "relative" }}
        >
          <Button
            id="sidebarCollapse"
            className="sidebarbutton"
            onClick={props.showSidebar}
          >
            <GiHamburgerMenu style={{ fontSize: "25px" }} />
          </Button>
          <Link to="/" className="text-decoration-none ms-5 mt-1 ">
            <Navbar.Brand
              href="#home"
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: "22px",
                justifyContent: "center",
              }}
            >
              DRS
            </Navbar.Brand>
          </Link>
          <div
            className="align-items-center"
            style={{ position: "absolute", right: "10px", display: "flex" }}
          >
            <BsPersonCircle style={{ color: "white", fontSize: "28px" }} />
            {/* Add here blockchain address as string */}
            <p className="blockAddress">{blockAddress}</p>
          </div>
        </Nav>
      </Navbar>
    );
  } else {
    return <Home />;
  }
}
export default DashNav;
