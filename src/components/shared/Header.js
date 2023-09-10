import React, { useState } from "react";
import { Link,NavLink,useLocation } from "react-router-dom"
import Announcement from "./Announcement"
import MobileMenu from '../../assets/images/charm_menu-hamburger.svg';
import { Button, Container, Navbar,  Offcanvas } from 'react-bootstrap';
import Media from '../../assets/index';
import SidebarData from "./SidebarData"
import * as FaIcons from 'react-icons/fa';
import { fetchPostReq } from "../../services/restService";
import { Navigate } from "react-router-dom";
import { baseApiUrl } from "../../config";
import { useNavigate } from "react-router-dom";

function Header() {
    const user_logout = baseApiUrl + "/api/logout"
    const [show, setShow] = useState(false);
    const [loggedOut, setLoggedOut] = useState(false);

    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function userLogout() {
        const data = {
          _session_token: localStorage.getItem("_session_token"),
        };
        try {
          const response = await fetchPostReq(user_logout, data);
          if (response === "logout successful") {
            console.log(response);
      
            // Remove the session token
            localStorage.removeItem("_session_token");
      
            // Log the removed session token
            console.log("Removed session token:", data._session_token);
      
            // Navigate to the home page
            navigate("/", { replace: true });
          } else if (response === "Session token missing") {
            console.log(response);
            navigate("/", { replace: true });
          } else {
            console.error("Logout failed:", response);
          }
        } catch (error) {
          console.error("Error during logout:", error);
        }
      }

    const location=useLocation();
    const isUserloggedOut = location.pathname==="/acenxion" || location.pathname==="/acenxion/";

    return (
        <>
            <Announcement></Announcement>

            <Navbar variant="dark" bg="white" className="border-bottom" expand="lg">
                <Container fluid className="px-5">
                    <Navbar.Brand to="/readerstatus">
                   
                        <Link to={`${process.env.PUBLIC_URL}/`}>
                            <img src={Media.Images.headLogo} height="90" alt="CoolBrand" />
                        </Link>
                 
                    </Navbar.Brand>

                    <Navbar.Collapse id="navbar-dark-example" className="justify-content-end">

                        <div className="navbar-nav ms-auto justify-content-center d-flex align-items-center">
                        
                        {!isUserloggedOut ? (
                            <>
                            <Button type="submit" className="mx-2 menu-btn menu-btn1">
                                <Link to={`${process.env.PUBLIC_URL}/`} className="text-dark semibold-corbel"><FaIcons.FaPowerOff className="mail-icon" />Shut down</Link>
                            </Button>
                            
                            <Button type="submit" className=" menu-btn menu-btn2" onClick={()=>{userLogout()}}>
                                <Link to={`${process.env.PUBLIC_URL}/`} className="text-light semibold-corbel"> 
                                 <FaIcons.FaSignOutAlt className="mail-icon" />Log off
                                 </Link>
                            </Button>
                            </>
                            ) : (<></>)
                        }
                        </div>
                    </Navbar.Collapse>
                    <img src={MobileMenu} alt="mobile-menu" height="35px" width="35px" cursor="pointer" className="menu-img" onClick={handleShow} />
                </Container>
            </Navbar>


            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Body>
                    <nav id="sidebarMenu" className="d-lg-block sidebar bg-green">
                        <div className="position-sticky bg-green">
                            <div className="list-group list-group-flush m-0 py-2">
                                <Link
                                    to={`${process.env.PUBLIC_URL}/`}
                                    className="list-group-item list-group-item-action p-0 ripple bg-transparent text-center mb-5"
                                    aria-current="true"
                                >
                                    <h5 className="text-white py-4 mb-0">CHECK YOUR MACHINE STATUS</h5>
                                </Link>
                                <div className="cstm-fields mx-auto">
                                    {SidebarData.map((item, index) => {
                                        return (
                                            <NavLink to={process.env.PUBLIC_URL + item.path} key={index} className="list-group-item list-group-item-action py-2 ripple mb-5 " onClick={handleClose}>
                                                <img src={item.icon} alt={item.title} /><span className="text-white">{item.title}</span>
                                            </NavLink>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Header;