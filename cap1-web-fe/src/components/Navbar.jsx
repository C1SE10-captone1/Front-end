import React, { useContext } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
import { AuthContext, useAuth } from "../context/AuthContext";

const Navbar = () => {
  // const {currentUser} = useContext(AuthContext)
  const { currentUser, signOut } = useAuth();
  console.log(currentUser);
  async function handleSignOut() {
    await signOut();
  }
  return (
    <div className="navbar">
      <span className="logo">SMART GRADE 5</span>
      <div className="user">
        <p>Welcome, {currentUser?.id}!</p>
        {/* <img src={currentUser.photoURL} alt="" /> */}
        <span>{currentUser.displayName}</span>
        <button onClick={handleSignOut}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
