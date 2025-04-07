import React from "react";
import { CheckCircle, XCircle, RefreshCw, BadgeCheck, Info } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import mcqQuestions from "../utils/linkedListMcq"; // ✅ MCQ Questions Import
import Header from "../Header"; // ✅ Header Component Import

const LinkedListResultPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { score, userAnswers } = location.state || { score: 0, userAnswers: {} };

    // Calculate Score Percentage
    const totalQuestions = mcqQuestions.length;
    const percentage = (score / totalQuestions) * 100;

    return (
        <div className="flex flex-col min-h-screen">
            {/* ✅ Header Component */}
            <Header text="Quiz Results" />

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center flex-grow px-4 py-6">
                {/* Quiz Results Card - Increased Height */}
                <div className="w-full max-w-3xl bg-white text-black p-6 md:p-8 rounded-lg shadow-lg min-h-[500px]">
                    {/* Score Display */}
                    <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-3 flex items-center justify-center gap-2">
                        <BadgeCheck className="w-7 h-7 md:w-8 md:h-8 text-green-400" /> Quiz Results
                    </h2>
                    <p className="text-lg md:text-xl font-semibold text-blue-600 text-center">
                        🎯 Your Score: <span>{score}</span> / {totalQuestions}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-5 md:h-6 relative overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                                width: `${percentage}%`,
                                backgroundColor: percentage >= 75 ? "green" : percentage >= 50 ? "yellow" : "red",
                            }}
                        ></div>
                        <p className="absolute inset-0 flex items-center justify-center text-gray-900 text-xs md:text-sm font-semibold">
                            {percentage.toFixed(1)}%
                        </p>
                    </div>

                    {/* Scrollable Answer Review Section */}
                    <div className="mt-5 space-y-4 max-h-72 md:max-h-96 overflow-y-auto px-2">
                        {mcqQuestions.map((question, index) => {
                            const userAnswer = userAnswers[index];

                            // ✅ Improved Correctness Check
                            let isCorrect = false;
                            // Normal MCQ validation
                            isCorrect = userAnswer === question.answer;
                            return (
                                <div key={index} className="p-3 border rounded-lg shadow-md bg-gray-100">
                                    {/* Question */}
                                    <h3 className="text-sm md:text-base font-semibold text-gray-800">
                                        {index + 1}. {question.question}
                                    </h3>

                                    {/* User Answer */}
                                    <p className={`mt-2 text-sm font-medium flex items-center gap-2 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                                        {isCorrect ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                                        Your Answer: {userAnswer === null ? "Not Answered" : userAnswer}
                                    </p>


                                    {/* Correct Answer (Only for MCQs) */}
                                    {(question.type !== "insert" || question.type !== "delete" || question.type !== "update") && (
                                        <p className="text-blue-600 text-sm font-semibold flex items-center gap-2">
                                            ✅ Correct Answer: {question.answer}
                                        </p>
                                    )}



                                    {/* Explanation */}
                                    <p className="text-gray-600 text-xs md:text-sm italic mt-1 flex items-center gap-2">
                                        <Info className="w-4 h-4 text-gray-500" /> Explanation:
                                    </p>
                                    <p className="text-gray-700 text-xs md:text-sm italic mt-1">{question.explanation}</p>


                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-6 flex flex-col md:flex-row gap-3 justify-center w-full">
                        <button
                            className="px-5 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg text-sm md:text-base font-semibold hover:bg-blue-600 transition-all duration-300 w-full md:w-auto"
                            onClick={() => navigate("/linked-list-quiz")}
                        >
                            <RefreshCw className="w-4 h-4" /> Retry Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkedListResultPage;