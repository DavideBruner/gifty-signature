import React from "react";
import Image from "next/image";
import logo from "../public/logo.png";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image src={logo} alt="Logo" width={200} height={150} />
    </Link>
  );
};

export default Logo;
