import Link from "next/link";
import React from "react";

type PageProps = {
  name: string;
  slug: string;
  description: string;
  image: string;
  level: string;
  author: string;
};
const Card = (props: PageProps): JSX.Element => {
  return (
    <div className="w-full max-w-[300px] min-h-[150px] min-w-[250px] flex-1 bg-black/50 rounded-lg text-white p-4 relative overflow-hidden">
      <Link href={`/challenge/${props.slug}`} className="h-full block">
        <h3 className="text-[18px] font-bold">{props.name}</h3>
        <p className="text-[14px]">{props.description}</p>
        <span
          className={
            "absolute top-0 right-0 block  px-1 py-1 leading-none rounded-bl-lg" +
            " " +
            props.level
          }
        >
          {props.level}
        </span>
        <span className="absolute bottom-0 right-0 block border-t text-xs border-blue-800 px-1 py-1 leading-none rounded-tl-lg">
          by {props.author}
        </span>
      </Link>
    </div>
  );
};

export default Card;
