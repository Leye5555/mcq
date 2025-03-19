import { cn } from "@/lib/utils";
import React from "react";

const UserStats = () => {
  const userData = {
    username: "Faith",
    duration: "1:00:00",
    score: "40/50",
    rank: "1",
    fastest_time: "00:30:00",
  };
  return (
    <div
      className={cn(
        "bg-black/50 min-w-[230px] rounded-lg text-white p-4 relative overflow-hidden font-bold flex min-h-[160px]",
        userData?.username ? "" : "flex justify-center items-center"
      )}
    >
      {userData?.username ? (
        <ul className="list-none">
          <li>Username : {userData.username}</li>
          <li className="text-green-500 text-xl font-bold">
            Rank : {userData.rank}
          </li>
          <li>Fastest Time : {userData.fastest_time}</li>
          <li> Most Recent Score : {userData.score}</li>
          <li>Most Recent Time : {userData.duration}</li>
        </ul>
      ) : (
        <p>Your stats will show here</p>
      )}
    </div>
  );
};

export default UserStats;
