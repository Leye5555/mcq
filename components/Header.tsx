import Image from "next/image";
import React from "react";
import { Smooch_Sans } from "next/font/google";
const font = Smooch_Sans({ subsets: ["latin"] });
const Header = () => {
  return (
    <div className="mb-10 gap-2 flex items-center">
      <Image src="/assets/logo.svg" width={32} height={32} alt="mcq" />{" "}
      <h1
        className={`${font.className} ` + "text-white font-extrabold text-3xl"}
      >
        ulster_mcq
      </h1>
    </div>
  );
};

export default Header;
