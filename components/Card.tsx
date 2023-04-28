import React from "react";

function Card({ children }: any) {
  return <div className='bg-card shadow-xl rounded-xl p-8'>{children}</div>;
}

export default Card;
