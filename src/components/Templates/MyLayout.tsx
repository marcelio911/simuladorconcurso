import React from "react";

interface Props {
  children: React.ReactNode;
}

const MyLayout: React.FC<Props> = ({ children }) => {

  return (
    <div className="bg-blue-100 min-h-screen">
      {children}
    </div>
  );
};

export default MyLayout;