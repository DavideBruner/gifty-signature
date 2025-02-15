import React from "react";
import Image from "next/image";
import logo from "../public/logo.png";

const Logo: React.FC = () => {
  return (
    <div>
      <Image src={logo} alt="Logo" width={200} height={150} />
    </div>
  );
};

export default Logo;
