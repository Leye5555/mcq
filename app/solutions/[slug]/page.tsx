"use client";
import SolutionsPage from "@/components/Solutions";

type PageProps = {
  params: {
    slug: string;
  };
};

const page = ({ params }: PageProps) => {
  return <SolutionsPage slug={params.slug} />;
};

export default page;
