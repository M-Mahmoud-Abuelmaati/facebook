import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { CgMenuGridR } from "react-icons/cg";
import { MdOndemandVideo, MdGroups } from "react-icons/md";
import { useState } from "react";
import "../../styles/Navbar.css";
import { changeUserLocation } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.users.user);
  const userLocation = localStorage.getItem("l1");

  const [activePage, setActivePage] = useState(userLocation);
  const [showNot, setShowNot] = useState(false);
  const dispatch = useDispatch();

  const showNotifications = () => {
    if (showNot) {
      setShowNot(false);
    } else {
      // const checkNot = user.notifications?.length;
      // if (checkNot) return
      setShowNot(true);
    }
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-container-inner">
        <Link
          to="/profile"
          title="Profile"
          className={activePage === "Profile" ? "active" : ""}
          onClick={() => {
            setActivePage("Profile");
            dispatch(changeUserLocation("Profile"));
          }}
        >
          <img
            src={
              user.img !== "" ? `http://localhost:5000/public/${user.img}` : ""
            }
            alt="default-icon"
            className="navbar--img"
          />
        </Link>
        <Link
          to="/"
          className={activePage === "Home" ? "active" : ""}
          title="Home"
          onClick={() => {
            setActivePage("Home");
            dispatch(changeUserLocation("Home"));
          }}
        >
          <AiOutlineHome className="sm-nav" />
        </Link>
        <a
          onClick={(e) => {
            e.preventDefault();
            setActivePage("Search");
          }}
          className={activePage === "Search" ? "active" : ""}
          title="Search"
          href="/"
        >
          <AiOutlineSearch className="sm-nav" />
        </a>
        {showNot && (
          <div className="notification-container">
            <>
              <div className="notificationHeader">Notifications</div>
              {user.notifications?.length ? (
                user.notifications?.map((i, index) => {
                  return (
                    <div className="notificationInner" key={index}>
                      <div className="triangle"></div>
                      <Link
                        to={i.to}
                        reloadDocument={true}
                        className="notification-text"
                      >
                        {i.message}
                      </Link>
                    </div>
                  );
                })
              ) : (
                <a href="##" className="notification-text">No new Notification</a>
              )}
            </>
          </div>
        )}
        <a
          onClick={(e) => {
            e.preventDefault();
            setActivePage("Notifications");
            showNotifications();
          }}
          className={activePage === "Notifications" ? "active" : ""}
          title="Notifications"
          href="/"
        >
          <IoIosNotificationsOutline className="sm-nav" />
        </a>
        <a
          onClick={(e) => {
            e.preventDefault();
            setActivePage("Messages");
          }}
          className={activePage === "Messages" ? "active" : ""}
          title="Messages"
          href="/"
        >
          <FiMessageSquare className="sm-nav" />
        </a>
        <div className="navbar-menu">
          <a
            onClick={(e) => {
              e.preventDefault();
              setActivePage("Menu");
            }}
            className={activePage === "Menu" ? "active" : ""}
            title="Menu"
            href="/"
          >
            <CgMenuGridR className="sm-nav" />
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              setActivePage("Watch");
            }}
            className={activePage === "Watch" ? "active" : ""}
            title="Watch"
            href="/"
          >
            <MdOndemandVideo className="sm-nav" />
          </a>
        </div>
        <div className="navbar-group">
          <a
            onClick={(e) => {
              e.preventDefault();
              setActivePage("Groups");
            }}
            className={activePage === "Groups" ? "active" : ""}
            title="Groups"
            href="/"
          >
            <MdGroups className="sm-nav" />
          </a>
        </div>
      </div>
    </nav>
  );
}
