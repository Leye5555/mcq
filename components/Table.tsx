import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import {getMinutes } from "date-fns";

export default function TableComp({
  contestants,
}: {
  contestants: {
    username: string;
    duration: string;
    score: string;
    title: string;
  }[];
}) {
  return (
    <Table className="bg-black/50 rounded-lg text-white relative overflow-hidden mb-10 font-bold">
      <TableCaption className="text-white/60 italic ">
        Do you have what it takes to be a champion?
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] p-4">Username</TableHead>
          <TableHead className="p-4">Duration</TableHead>
          <TableHead className="p-4">Score</TableHead>
          <TableHead className="text-right p-4">Ranking</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contestants.map((contestant, index) => (
          <TableRow key={contestant.username} className="hover:text-[#39ccfd]">
            <TableCell className="font-medium p-4">
              {contestant.username}
            </TableCell>
            <TableCell className="p-4">{contestant.duration}</TableCell>
            <TableCell className="p-4">{contestant.score}</TableCell>
            <TableCell className="text-right p-4">
              {index === 0 ? "👑" : ""} {contestant.title}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
