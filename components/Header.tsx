"use client";
import Image from "next/image";
import React from "react";
import { Smooch_Sans } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Download from "./Download";
const font = Smooch_Sans({ subsets: ["latin"] });
const Header = () => {
  const pathname = usePathname();
  return (
    <div className="mb-10 gap-2 flex items-center justify-between w-full">
      <div className="gap-2 flex items-center">
        <Image src="/assets/logo.svg" width={32} height={32} alt="mcq" />{" "}
        <Link href="/">
          <h1
            className={
              `${font.className} ` + "text-white font-extrabold text-3xl"
            }
          >
            ulster_mcq
          </h1>
        </Link>
      </div>
      <div>{"/challenge/ds_and_ml" === pathname && <Download />}</div>
    </div>
  );
};

export default Header;
