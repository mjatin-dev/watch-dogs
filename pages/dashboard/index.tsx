import Login from "@/components/Login";
import Nav from "@/components/Nav";
import React, { useState } from "react";

function Dashboard() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };

  return (
    <div className='flex min-h-screen flex-col items-center bg-#0A0909'>
      <Nav handleOpen={handleOpen} />
      <Login handleClose={handleClose} show={show} />
    </div>
  );
}

export default Dashboard;
