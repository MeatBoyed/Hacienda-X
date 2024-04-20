import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import Link from "next/link";
import { SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
// import { getMenuStyles } from "../../utils/common";
// import useHeaderColor from "../../hooks/useHeaderColor";
// import OutsideClickHandler from "react-outside-click-handler";
// import { Link, NavLink } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import ProfileMenu from "../ProfileMenu/ProfileMenu";
// import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
// import useAuthCheck from "../../hooks/useAuthCheck.jsx";

const Header = () => {
  //   const [menuOpened, setMenuOpened] = useState(false);
  //   const headerColor = useHeaderColor();
  //   const [modalOpened, setModalOpened] = useState(false);
  //   const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  //   const { validateLogin } = useAuthCheck();

  //   const handleAddPropertyClick = () => {
  //     if (validateLogin()) {
  //       setModalOpened(true);
  //     }
  //   };

  const { userId } = auth();

  return (
    <nav className="h-wrapper" style={{ background: undefined }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link href="/">
          <img src="./logo.png" alt="logo" width={100} />
        </Link>

        {/* menu */}
        {/* <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          > */}
        {/* <NavLink to="/properties">Properties</NavLink>

            <a href="mailto:zainkeepscode@gmail.com">Contact</a> */}

        {/* add property */}
        {/* <div onClick={handleAddPropertyClick}>Add Property</div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} /> */}
        {/* login button */}
        {!userId ? <SignUpButton>Get Started</SignUpButton> : <UserButton />}
        {/* </div>
        </OutsideClickHandler> */}

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          //   onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
