"use client";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { Smooch_Sans } from "next/font/google";
import * as raw_questions from "@/data/mcq.json";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { Metadata } from "next";
const font = Smooch_Sans({ subsets: ["latin"] });

const QuizPage = () => {
  const [countUp] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(() => {
    return localStorage.getItem("attempts")
      ? Number(localStorage.getItem("attempts"))
      : 0;
  });
  const [time, setTime] = useState(0);
  const router = useRouter();
  const param = useParams();
  const [compReady, setCompReady] = useState(false);
  //   const questions: Question[] = [
  //     {
  //       id: 1,
  //       question: "What is the capital of France?",
  //       options: ["Paris", "London", "Berlin"],
  //       correctAnswer: "Paris",
  //       explanation: "Paris is the capital and largest city of France.",
  //     },
  //     {
  //       id: 2,
  //       question: "Which planet is known as the Red Planet?",
  //       options: ["Mars", "Venus", "Jupiter"],
  //       correctAnswer: "Mars",
  //       explanation:
  //         "Mars is called the Red Planet because of its reddish appearance.",
  //     },
  //     {
  //       id: 3,
  //       question: "What is the largest mammal?",
  //       options: ["Elephant", "Blue Whale", "Giraffe"],
  //       correctAnswer: "Blue Whale",
  //       explanation:
  //         "The Blue Whale is the largest mammal in the world, with a length of up to 30 meters.",
  //     },
  //   ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (countUp ? prev + 1 : Math.max(prev - 1, 0)));
    }, 1000);
    return () => clearInterval(timer);
  }, [countUp]);

  const handleAnswer = ({ option, id }: { option: string; id: number }) => {
    setAnswers((prev) => ({ ...prev, [id]: option }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const questions = useMemo(() => {
    let initial_questions = Array.from(raw_questions);
    // remove previous question set so we can cover all questions in the database
    const prevQuestionIds = localStorage.getItem("questionIds");
    if (
      prevQuestionIds &&
      JSON.parse(prevQuestionIds)?.length < initial_questions.length
    )
      initial_questions = initial_questions.filter(
        (q) => !JSON.parse(prevQuestionIds)?.includes(q.id)
      );

    let currentIndex = initial_questions.length;

    // shuffle the questions
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      //swap a random element with the current element
      [initial_questions[currentIndex], initial_questions[randomIndex]] = [
        initial_questions[randomIndex],
        initial_questions[currentIndex],
      ];
    }
    const final_questions = initial_questions.slice(0, 60);
    return final_questions;
  }, []);

  const submitQuiz = () => {
    setSubmitted(true);

    const questionIds = questions.map((q) => q.id);
    const prevQuestionIds = localStorage.getItem("questionIds");
    if (
      prevQuestionIds &&
      JSON.parse(prevQuestionIds)?.length < raw_questions.length
    ) {
      questionIds.push(...JSON.parse(prevQuestionIds));
    }
    localStorage.setItem("questionIds", JSON.stringify(questionIds));
    const attempts = localStorage.getItem("attempts");
    localStorage.setItem(
      "attempts",
      attempts ? String(Number(attempts) + 1) : "1"
    );
  };

  const viewSolutions = () => {
    const search = new URLSearchParams("answers=" + JSON.stringify(answers));

    router.push(`/solutions/${param.slug}?${search.toString()}`);
  };

  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce(
    (acc, q, index) =>
      answers[questions[index].id] === q.correctAnswer ? acc + 1 : acc,
    0
  );

  const course = {
    name: "Scalable Advanced Software Solutions",
  };

  useEffect(() => {
    if (typeof window !== "undefined") setCompReady(true);
  }, []);

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
            {compReady && (
              <Card className="w-full max-w-3xl pt-4 sm:p-6 bg-black/50  rounded-2xl shadow-lg text-white">
                <CardContent>
                  <div className="flex flex-wrap justify-between items-center mb-8">
                    <span className="text-sm font-semibold text-[#23bdb0]">
                      Answered: {answeredCount} / {questions.length}
                    </span>
                    <span>Attempts : {attempts}</span>
                    <span className="text-sm text-[#23bdb0] ">
                      Time: {Math.floor(time / 60)}min {Math.floor(time % 60)}
                      sec
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    {questions[currentQuestionIndex].question}
                  </h2>
                  <div className="space-y-3">
                    {questions[currentQuestionIndex].options.map((option) => (
                      <button
                        key={option}
                        className={`w-full p-3 text-left rounded-lg transition-all duration-200 border-2 
                  ${
                    answers[questions[currentQuestionIndex].id] === option
                      ? "border-green-500 bg-green-700"
                      : "border-gray-600"
                  }
                `}
                        onClick={() =>
                          handleAnswer({
                            option,
                            id: questions[currentQuestionIndex].id,
                          })
                        }
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    {currentQuestionIndex === questions.length - 1 ? (
                      <Button
                        onClick={submitQuiz}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button onClick={nextQuestion}>Next</Button>
                    )}
                  </div>
                  {submitted && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                      <h3 className="text-lg font-semibold">Results</h3>
                      <p className="mt-2">
                        Score: {score} / {questions.length}
                      </p>
                      <Button
                        onClick={viewSolutions}
                        className="mt-4 bg-blue-500 hover:bg-blue-600"
                      >
                        View Solutions
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
