import Challenges from "@/components/Challenges";
import React from "react";
type PageProps = {
  params: {
    slug: string;
  };
};

const page = ({ params }: PageProps) => {
  return <Challenges slug={params.slug} />;
};

export default page;
