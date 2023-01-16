import React from "react";
import Logo from "../assets/foofest-logo.webp";
import Image from "next/image";
import Link from "next/link";

function Nav(props) {
  return (
    <nav>
      <Link href={"/"}>
        <Image src={Logo} alt="Foofest logo" className="logo" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px" />
      </Link>
      <Link href={"/tickets/step1"} className={"primary"}>
        Get tickets
      </Link>
    </nav>
  );
}

export default Nav;
