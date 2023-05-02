import React, { useState } from "react";
import Nav from "./Nav";
import Login from "./Login";
interface ChildrenProps {
  children: React.ReactNode;
}
function Layout({ children }: ChildrenProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };
  return (
    <div>
      <Nav handleOpen={handleOpen} />
      <Login handleClose={handleClose} show={show} />
      {children}
    </div>
  );
}

export default Layout;
