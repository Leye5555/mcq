"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { Smooch_Sans } from "next/font/google";
import * as questions from "@/data/azure_mcq_questions_fully_updated.json";
import { cn } from "@/lib/utils";
const font = Smooch_Sans({ subsets: ["latin"] });

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizProps {
  questions: Question[];
  countUp?: boolean; // Determines whether timer counts up or down
}

const QuizPage: React.FC<QuizProps> = ({ countUp = true }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const router = useRouter();
  const param = useParams();
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

  const handleAnswer = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: option }));
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

  const submitQuiz = () => {
    setSubmitted(true);
  };

  const viewSolutions = () => {
    const search = new URLSearchParams("answers=" + JSON.stringify(answers));

    router.push(`/solutions/${param.slug}?${search.toString()}`);
  };

  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce(
    (acc, q, index) => (answers[index] === q.correctAnswer ? acc + 1 : acc),
    0
  );

  const course = {
    name: "Big Data and Infrastructure",
  };

  return (
    <div className="bg-gradient-to-br min-h-screen from-[#100e2e] via-[#1e1b4b]  to-[#002345] px-4 md:px-10 py-6 w-full overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto">
        {" "}
        <div className="mb-10">
          <h1
            className={
              `${font.className} ` + "text-white font-extrabold text-3xl"
            }
          >
            ulster_mcq
          </h1>
        </div>
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
                <div className="flex flex-wrap justify-between items-center mb-8">
                  <span className="text-sm font-semibold text-[#23bdb0]">
                    Answered: {answeredCount} / {questions.length}
                  </span>
                  <span className="text-sm text-[#23bdb0] ">
                    Time: {Math.floor(time / 60)}min {Math.floor(time % 60)}sec
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
                    answers[currentQuestionIndex] === option
                      ? "border-green-500 bg-green-700"
                      : "border-gray-600"
                  }
                `}
                      onClick={() => handleAnswer(option)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
