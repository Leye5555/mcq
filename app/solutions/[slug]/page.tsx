"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as questions from "@/data/mcq.json";
import { Smooch_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import Header from "@/components/Header";
const font = Smooch_Sans({ subsets: ["latin"] });

const SolutionsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const answers = searchParams.get("answers");

  const parsedAnswers = useMemo(
    () => (answers ? JSON.parse(answers as string) : {}),
    [answers]
  );
  const course = {
    name: "Scalable Advanced Software Solutions",
  };

  const submittedQuestions = useMemo(() => {
    return Object.keys(parsedAnswers).map((key) => {
      const question = Array.from(questions).find(
        (q) => q.id === parseInt(key)
      );
      return {
        ...question,
        id: parseInt(key),
        userAnswer: parsedAnswers[key],
      };
    });
  }, [parsedAnswers]);

  return (
    <div className="bg-gradient-to-br min-h-screen from-[#100e2e] via-[#1e1b4b]  to-[#002345] px-4 md:px-10 py-6 w-full overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto">
        {" "}
        <Header />
        <div className="mt-20">
          <h1
            className={cn(
              "text-white text-5xl font-extrabold text-center",
              font.className
            )}
          >
            {course.name}
          </h1>
          <div className=" flex flex-col items-center justify-center  p-6 text-white">
            <Card className="w-full max-w-3xl pt-4 sm:p-6 bg-black/50  rounded-2xl shadow-lg text-white">
              <CardContent>
                <h2 className="text-2xl font-bold mb-4">Solutions</h2>
                {submittedQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="mb-6 p-4 border border-gray-600 rounded-lg"
                  >
                    <h3 className="text-lg font-semibold">{q.question}</h3>
                    <p className="mt-2">
                      Your Answer:{" "}
                      <span
                        className={
                          q.userAnswer === q.correctAnswer
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {q.userAnswer || "Not answered"}
                      </span>
                    </p>
                    <p className="mt-1 text-green-400">
                      Correct Answer: {q.correctAnswer}
                    </p>
                    <p className="mt-1 text-gray-300">
                      Explanation: {q.explanation}
                    </p>
                  </div>
                ))}
                <Button
                  onClick={() => router.push("/")}
                  className="mt-4 bg-blue-500 hover:bg-blue-600"
                >
                  Back to Quizzes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
