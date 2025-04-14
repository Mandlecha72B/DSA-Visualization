import React, { useState, useEffect } from "react";
import {
    CheckCircle,
    XCircle,
    Timer,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import stackQuestions from "../utils/stackMcqData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const StackQuiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const navigate = useNavigate();

    const currentQuestion = stackQuestions[currentQuestionIndex];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (timeLeft === 0) {
            toast.error("Time's up! Moving to next question.");
            nextQuestion();
        }
    }, [timeLeft]);

    const updateUserAnswers = (questionIndex, answerData) => {
        setAnsweredQuestions((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: answerData,
        }));
    };

    const handleMCQSelection = (option) => {
        if (answeredQuestions[currentQuestionIndex]) return;

        setSelectedAnswer(option);
        updateUserAnswers(currentQuestionIndex, option);

        if (option === currentQuestion.answer) {
            toast.success("Correct Answer 🎉");
            setScore((prev) => prev + 1);
        } else {
            toast.error("Incorrect Answer ❌");
        }
    };

    //   const nextQuestion = async () => {
    //     if (currentQuestionIndex < stackQuestions.length - 1) {
    //       await new Promise((resolve) => setTimeout(resolve, 1000));
    //       setCurrentQuestionIndex((prev) => {
    //         const newIndex = prev + 1;
    //         setSelectedAnswer(answeredQuestions[newIndex] || null);
    //         return newIndex;
    //       });
    //       setTimeLeft(15);
    //     } else {
    //       navigate("/stack-results", {
    //         state: { score, userAnswers: answeredQuestions },
    //       });
    //     }
    //   };

    const nextQuestion = async () => {
        // Debugging log
        console.log(
            `Question ${currentQuestionIndex + 1} of ${stackQuestions.length}`
        );

        if (currentQuestionIndex < stackQuestions.length - 1) {
            // Go to next question
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setCurrentQuestionIndex((prev) => prev + 1);
            setTimeLeft(15);
        } else {
            // Last question completed
            console.log("Quiz completed! Score:", score);
            navigate("/stack-results", {
                state: {
                    score,
                    userAnswers: answeredQuestions,
                },
            });
        }
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => {
                const newIndex = prev - 1;
                setSelectedAnswer(answeredQuestions[newIndex] || null);
                if (!answeredQuestions[newIndex]) setTimeLeft(15);
                return newIndex;
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white">
            <Header text={"Stack Quiz"} />
            <h1 className="text-3xl font-extrabold mb-6 text-center">
                📚 Stack Data Structure Quiz
            </h1>

            <div className="w-full max-w-3xl bg-white text-black p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4 text-gray-700">
                    <p className="text-lg font-medium">
                        Question {currentQuestionIndex + 1} / {stackQuestions.length}
                    </p>
                    <div className="flex items-center gap-2 text-yellow-500">
                        <Timer className="w-5 h-5" />
                        <p className="font-semibold text-lg">{timeLeft}s</p>
                    </div>
                </div>

                {/* Render MCQ Question */}
                <>
                    <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleMCQSelection(option)}
                                disabled={answeredQuestions[currentQuestionIndex]}
                                className={`w-full flex items-center gap-2 p-4 rounded-lg text-lg font-medium border transition-all duration-300 
                  ${selectedAnswer === option
                                        ? option === currentQuestion.answer
                                            ? "bg-green-500 text-white border-green-600"
                                            : "bg-red-500 text-white border-red-600"
                                        : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                            >
                                {selectedAnswer === option ? (
                                    option === currentQuestion.answer ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <XCircle className="w-5 h-5" />
                                    )
                                ) : null}
                                {option}
                            </button>
                        ))}
                    </div>
                </>

                <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
                    <button
                        className={`px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 rounded-lg text-sm md:text-lg font-semibold transition-all duration-300 
              ${currentQuestionIndex === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-yellow-500 hover:bg-yellow-600"
                            }`}
                        onClick={previousQuestion}
                        disabled={currentQuestionIndex === 0}
                    >
                        <ChevronLeft className="w-5 h-5" /> Previous
                    </button>

                    <button
                        className="px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 rounded-lg bg-blue-500 text-sm md:text-lg font-semibold hover:bg-blue-600 transition-all duration-300"
                        onClick={nextQuestion}
                    >
                        Next <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StackQuiz;
