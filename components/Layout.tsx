import React, { useState } from "react";
import Nav from "./Nav";
interface ChildrenProps {
  children: React.ReactNode;
}
function Layout({ children }: ChildrenProps) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}

export default Layout;
