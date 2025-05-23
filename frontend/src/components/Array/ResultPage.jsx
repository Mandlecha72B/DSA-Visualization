
import React from "react";
import { CheckCircle, XCircle, RefreshCw, BadgeCheck, Info } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import mcqQuestions from "../utils/mcqData";
import Header from "../Header"; // ✅ Header Component Import

const ResultsPage = () => {
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
                            if (question.type === "insert" || question.type === "delete" || question.type === "update") {
                                // ✅ Compare entire arrays instead of one index
                                //isCorrect = JSON.stringify(userAnswer?.userAttempt) === JSON.stringify(userAnswer?.correctArray);
                                isCorrect = userAnswer?.isCorrect;
                            }
                            else {
                                // Normal MCQ validation
                                isCorrect = userAnswer === question.answer;
                            }

                            return (
                                <div key={index} className="p-3 border rounded-lg shadow-md bg-gray-100">
                                    {/* Question */}
                                    <h3 className="text-sm md:text-base font-semibold text-gray-800">
                                        {index + 1}. {question.question}
                                    </h3>

                                    {/* User Answer */}
                                    <p className={`mt-2 text-sm font-medium flex items-center gap-2 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                                        {isCorrect ? (
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <XCircle className="w-4 h-4 text-red-500" />
                                        )}
                                        Your Answer:{" "}
                                        {question.type === "mcq"
                                            ? userAnswer ?? "Not Answered"
                                            : userAnswer?.userAttempt
                                                ? JSON.stringify(userAnswer.userAttempt)
                                                : "Not Answered"}
                                    </p>


                                    {/* Correct Answer (Only for MCQs) */}
                                    {(question.type !== "insert" && question.type !== "delete" && question.type !== "update") && (
                                        <p className="text-blue-600 text-sm font-semibold flex items-center gap-2">
                                            ✅ Correct Answer: {question.answer}
                                        </p>
                                    )}

                                    {(question.type === "insert" || question.type === "delete" || question.type === "update") && (
                                        <p className="text-blue-600 text-sm font-semibold flex items-center gap-2">
                                            ✅ Correct Answer: {JSON.stringify(userAnswer?.correctArray)}
                                        </p>
                                    )}

                                    {/* Explanation */}
                                    <p className="text-gray-600 text-xs md:text-sm italic mt-1 flex items-center gap-2">
                                        <Info className="w-4 h-4 text-gray-500" /> Explanation:
                                    </p>

                                    {/* 🟢 Special Case: Show Detailed Insertion Explanation */}
                                    {question.type === "insert" ? (
                                        <div className="bg-white p-2 rounded-lg mt-2 shadow-md text-sm text-gray-800">
                                            <p>🔹 <strong>Original Array:</strong> {JSON.stringify(userAnswer?.initialArray)}</p>
                                            <p>🔹 <strong>Element Inserted:</strong> {userAnswer?.targetValue} at Index {userAnswer?.targetIndex}</p>

                                            {/* User Attempt vs Correct Answer */}
                                            <p className={`mt-2 ${userAnswer?.isCorrect ? "text-green-500" : "text-red-500"}`}>
                                                {userAnswer?.isCorrect ? "✅ Correct Insertion!" : "❌ Incorrect Insertion!"}
                                            </p>

                                            <p>🔹 <strong>Your Attempt:</strong> {JSON.stringify(userAnswer?.userAttempt)}</p>
                                            <p>🔹 <strong>Correct Array:</strong> {JSON.stringify(userAnswer?.correctArray)}</p>

                                            {/* Step-by-step Explanation */}
                                            <p className="mt-2 text-gray-700 italic">
                                                {userAnswer?.explanation.split("\n").map((step, i) => (
                                                    <span key={i} className="block">🔸 {step}</span>
                                                ))}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-700 text-xs md:text-sm italic mt-1">{question.explanation}</p>
                                    )}
                                    {question.type === "delete" ? (
                                        <div className="bg-white p-2 rounded-lg mt-2 shadow-md text-sm text-gray-800">
                                            <p>🔹 <strong>Original Array:</strong> {JSON.stringify(userAnswer?.initialArray)}</p>
                                            <p>🔹 <strong>Element Deleted:</strong> From Index {userAnswer?.targetIndex}</p>

                                            {/* User Attempt vs Correct Answer */}
                                            <p className={`mt-2 ${userAnswer?.isCorrect ? "text-green-500" : "text-red-500"}`}>
                                                {userAnswer?.isCorrect ? "✅ Correct Insertion!" : "❌ Incorrect Insertion!"}
                                            </p>

                                            <p>🔹 <strong>Your Attempt:</strong> {JSON.stringify(userAnswer?.userAttempt)}</p>
                                            <p>🔹 <strong>Correct Array:</strong> {JSON.stringify(userAnswer?.correctArray)}</p>

                                            {/* Step-by-step Explanation */}
                                            <p className="mt-2 text-gray-700 italic">
                                                {userAnswer?.explanation.split("\n").map((step, i) => (
                                                    <span key={i} className="block">🔸 {step}</span>
                                                ))}
                                            </p>
                                        </div>
                                    ) : null}
                                    {question.type === "update" ? (
                                        <div className="bg-white p-2 rounded-lg mt-2 shadow-md text-sm text-gray-800">
                                            <p>🔹 <strong>Original Array:</strong> {JSON.stringify(userAnswer?.initialArray)}</p>
                                            <p>🔹 <strong>Element Updated:</strong> {userAnswer?.targetValue} at Index {userAnswer?.targetIndex}</p>

                                            {/* User Attempt vs Correct Answer */}
                                            <p className={`mt-2 ${userAnswer?.isCorrect ? "text-green-500" : "text-red-500"}`}>
                                                {userAnswer?.isCorrect ? "✅ Correct Insertion!" : "❌ Incorrect Insertion!"}
                                            </p>

                                            <p>🔹 <strong>Your Attempt:</strong> {JSON.stringify(userAnswer?.userAttempt)}</p>
                                            <p>🔹 <strong>Correct Array:</strong> {JSON.stringify(userAnswer?.correctArray)}</p>

                                            {/* Step-by-step Explanation */}
                                            <p className="mt-2 text-gray-700 italic">
                                                {userAnswer?.explanation}
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-6 flex flex-col md:flex-row gap-3 justify-center w-full">
                        <button
                            className="px-5 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg text-sm md:text-base font-semibold hover:bg-blue-600 transition-all duration-300 w-full md:w-auto"
                            onClick={() => navigate("/array-quiz")}
                        >
                            <RefreshCw className="w-4 h-4" /> Retry Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;


/*import React from "react";
import { CheckCircle, XCircle, RefreshCw, BadgeCheck, Info, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import mcqQuestions from "../utils/mcqData";
import Header from "../Header"; // ✅ Added Header Import

const ResultsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { score, userAnswers } = location.state || { score: 0, userAnswers: {} };

    // Calculate Score Percentage
    const totalQuestions = mcqQuestions.length;
    const percentage = (score / totalQuestions) * 100;

    return (
        <div className="flex flex-col min-h-screen ">
            {/* ✅ Header Component }
            <Header text="Quiz Results" />

            {/* Main Content }
            <div className="flex flex-col items-center justify-center flex-grow px-4 py-6">
                {/* Quiz Results Card - Increased Height }
                <div className="w-full max-w-3xl bg-white text-black p-6 md:p-8 rounded-lg shadow-lg min-h-[500px]">
                    {/* Score Display }
                    <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-3 flex items-center justify-center gap-2">
                        <BadgeCheck className="w-7 h-7 md:w-8 md:h-8 text-green-400" /> Quiz Results
                    </h2>
                    <p className="text-lg md:text-xl font-semibold text-blue-600 text-center">
                        🎯 Your Score: <span>{score}</span> / {totalQuestions}
                    </p>

                    {/* Progress Bar }
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

                    {/* Scrollable Answer Review Section }
                    <div className="mt-5 space-y-4 max-h-72 md:max-h-96 overflow-y-auto px-2">
                        {mcqQuestions.map((question, index) => {
                            const userAnswer = userAnswers[index];
                            const isCorrect = userAnswer === question.answer;

                            return (
                                <div key={index} className="p-3 border rounded-lg shadow-md bg-gray-100">
                                    {/* Question }
                                    <h3 className="text-sm md:text-base font-semibold text-gray-800">
                                        {index + 1}. {question.question}
                                    </h3>

                                    {/* User Answer }
                                    <p className={`mt-2 text-sm font-medium flex items-center gap-2 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                                        {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                        Your Answer: {userAnswer || "Not Answered"}
                                    </p>

                                    {/* Correct Answer }
                                    <p className="text-blue-600 text-sm font-semibold flex items-center gap-2">
                                        ✅ Correct Answer: {question.answer}
                                    </p>

                                    {/* Explanation }
                                    <p className="text-gray-600 text-xs md:text-sm italic mt-1 flex items-center gap-2">
                                        <Info className="w-4 h-4 text-gray-500" /> Explanation: {question.explanation}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Buttons }
                    <div className="mt-6 flex flex-col md:flex-row gap-3 justify-center w-full">
                        <button
                            className="px-5 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg text-sm md:text-base font-semibold hover:bg-blue-600 transition-all duration-300 w-full md:w-auto"
                            onClick={() => navigate("/array-quiz")}
                        >
                            <RefreshCw className="w-4 h-4" /> Retry Quiz
                        </button>

                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;*/

