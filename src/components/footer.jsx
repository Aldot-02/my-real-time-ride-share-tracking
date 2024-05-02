import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { ImInfo } from "react-icons/im";
import { MdOutlineNotifications } from "react-icons/md";

function Footer() {
  return (
    <>
      <footer>
        <Link to="/">
          <FaRegHeart style={{ color: "#fff" }} />
        </Link>
        <Link to="/routes">
          <ImInfo style={{ color: "#fff" }} />
        </Link>
        <MdOutlineNotifications />
      </footer>
    </>
  );
}

export default Footer;
