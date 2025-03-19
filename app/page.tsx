import Card from "@/components/Card";
import React from "react";
import { Smooch_Sans } from "next/font/google";
import Table from "@/components/Table";
import UserStats from "@/components/UserStats";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
const font = Smooch_Sans({ subsets: ["latin"] });

export default function Home() {
  const data = [
    {
      name: "Scalable Advanced Software Solutions",
      slug: "scalable_advanced_software_solutions",
      description: "Scalable Software Solution",
      level: "hard",
      author: "user1",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6c0773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Big Data and Infrastructure",
      slug: "big_data_and_infrastructure",
      description: "Big Data and Infrastructure",
      level: "medium",
      author: "user1",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6c0773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Knowledge Engineering",
      slug: "knowledge_engineering",
      description: "Knowledge Engineering",
      level: "hard",
      author: "user1",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6c0773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  const contestants = [
    {
      username: "user1",
      duration: "30mins",
      score: "50/60",
      title: "Top Boss (1st)",
    },
    {
      username: "user1",
      duration: "29mins",
      score: "50/60",
      title: "Top (2nd)",
    },
    {
      username: "user1",
      duration: "29mins",
      score: "49/60",
      title: "Contender (3rd)",
    },
    {
      username: "user1",
      duration: "28mins",
      score: "49/60",
      title: "Contender (4th)",
    },
    {
      username: "user1",
      duration: "28mins",
      score: "49/60",
      title: "Contender (5th)",
    },
    {
      username: "user1",
      duration: "28mins",
      score: "49/60",
      title: "Contender (6th)",
    },
    {
      username: "user1",
      duration: "28mins",
      score: "49/60",
      title: "Contender (7th)",
    },
    {
      username: "user1",
      duration: "28mins",
      score: "49/60",
      title: "Contender (8th)",
    },
    {
      username: "user1",
      duration: "28mins",
      score: "49/60",
      title: "Contender (9th)",
    },
    {
      username: "user1",
      duration: "28mins",
      score: "49/60",
      title: "Contender (10th)",
    },
  ];
  return (
    <div
      className={cn(
        "bg-gradient-to-br min-h-screen from-[#100e2e] via-[#1e1b4b]  to-[#002345] px-4 md:px-10 py-6 w-full overflow-x-hidden",
        font.className
      )}
    >
      <div className="max-w-[1440px] mx-auto">
        {" "}
        <Header />
        <div className="flex gap-10 flex-wrap-reverse justify-between">
          <div className="flex-1 max-w-[923px]">
            <h2 className="text-white font-extrabold text-md  mb-2 mx-auto">
              Courses
            </h2>
            <div className="flex flex-wrap   mx-auto mb-10">
              <div
                className={
                  `${font.className} ` +
                  "flex w-full justify-between flex-wrap flex-1  gap-x-2 gap-y-5"
                }
              >
                {data.map((item) => (
                  <React.Fragment key={item.slug}>
                    <Card {...item} />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <h2 className="text-white font-extrabold text-md  mb-2 mx-auto">
              Hall of Fame
            </h2>
            <div className="max-w-[923px] mx-auto overflow-x-hidden">
              <Table contestants={contestants} />
            </div>
          </div>
          <div className="flex-1 max-w-[300px]">
            <h2 className="text-white font-extrabold text-md  mb-2 mx-auto">
              Your Stats
            </h2>
            <UserStats />
          </div>
        </div>
      </div>
    </div>
  );
}
