import React from "react";
interface CardProps {
  children: React.ReactNode;
  height?: string;
}

function Card({ children, height = "h-full" }: CardProps) {
  return (
    <div className={`bg-card ${height} shadow-xl rounded-xl p-8`}>
      {children}
    </div>
  );
}

export default Card;
