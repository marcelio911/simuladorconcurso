import { isNight } from "@/utils/dateTimeUtils";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => {

  return (
    <div className={`relative cena ${isNight ? 'noite' : 'dia'} flex flex-col h-screen min-h-screen`}>
      <div className={`theme-background ${isNight ? 'noite-obj noite-ceu ' : 'dia-obj dia-ceu'}`}>
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;