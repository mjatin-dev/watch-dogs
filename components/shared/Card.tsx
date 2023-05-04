import React from "react";
interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return <div className='bg-card shadow-xl rounded-xl p-8'>{children}</div>;
}

export default Card;
