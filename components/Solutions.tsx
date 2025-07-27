"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as raw_questions from "@/data/mcq.json";
import * as ds_and_ml from "@/data/ds_and_ml.json";
import * as ke_questions from "@/data/knowledge_engineering2.json";
import { Smooch_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
const font = Smooch_Sans({ subsets: ["latin"] });

const SolutionsPage = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const answers = searchParams.get("answers");

  const parsedAnswers = useMemo(
    () => (answers ? JSON.parse(answers as string) : {}),
    [answers]
  );

  const course = [
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
    {
      name: "Data Science and Machine Learning",
      slug: "ds_and_ml",
      description: "Data Science and Machine Learning",
      level: "hard",
      author: "user1",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6c0773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    // for deep learning
    {
      name: "Deep Learning",
      slug: "deep_learning",
      description: "Deep Learning",
      level: "hard",
      author: "user1",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6c0773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  const submittedQuestions = useMemo(() => {
    const questions = (slug: string) => {
      switch (slug) {
        case "knowledge_engineering2":
          return Array.from(ke_questions);
        case "scalable_advanced_software_solutions":
          return Array.from(raw_questions);
        case "ds_and_ml":
          return Array.from(ds_and_ml);
        default:
          return Array.from(ds_and_ml);
      }
    };
    return Object.keys(parsedAnswers).map((key) => {
      const question = Array.from(questions(slug)).find(
        (q) => q.id === parseInt(key)
      );
      return {
        ...question,
        id: parseInt(key),
        userAnswer: parsedAnswers[key],
      };
    });
  }, [parsedAnswers, slug]);

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
            {course.filter((c) => c.slug === slug)[0].name}
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
                    <h3 className="text-lg overflow-x-auto font-semibold">
                      <Markdown remarkPlugins={[remarkGfm]}>
                        {q.question}
                      </Markdown>
                    </h3>
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
