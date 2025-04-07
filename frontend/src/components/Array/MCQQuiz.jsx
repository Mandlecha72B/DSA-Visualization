import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Timer, ChevronLeft, ChevronRight } from "lucide-react";
import allQuestions from "../utils/mcqData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InsertQuestion from "./InsertQuestion";
import DeleteQuestion from "./DeleteQuestion";
import UpdateQuestion from "./UpdateQuestion";
import Header from "../Header";

//import UpdateQuestion from "../interactiveQuestions/UpdateQuestion";
//import SearchQuestion from "../interactiveQuestions/SearchQuestion";

const MCQQuiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const [skippedInsertQuestion, setSkippedInsertQuestion] = useState(false); // New state for skipped insert question
    const [skippedDeleteQuestion, setSkippedDeleteQuestion] = useState(false); // New state for skipped delete question
    const [skippedUpdateQuestion, setSkippedUpdateQuestion] = useState(false); // New state for skipped update question
    const navigate = useNavigate();

    const currentQuestion = allQuestions[currentQuestionIndex];

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
            [questionIndex]: answerData, // ✅ Store answer data for each question
        }));
    };

    const handleMCQSelection = (option) => {
        if (answeredQuestions[currentQuestionIndex]) return;

        setSelectedAnswer(option);

        // ✅ Store MCQ answer using the same function used for other question types
        updateUserAnswers(currentQuestionIndex, option);

        if (option === currentQuestion.answer) {
            toast.success("Correct Answer 🎉");
            setScore((prev) => prev + 1);
        } else {
            toast.error("Incorrect Answer ❌");
        }
    };


    const nextQuestion = async () => {
        if (currentQuestionIndex < allQuestions.length - 1) {
            // Check if the current question was skipped
            let isSkipped = !answeredQuestions.hasOwnProperty(currentQuestionIndex);
            console.log("isSkipped", isSkipped);

            if (isSkipped && currentQuestion.type === "insert") {
                console.log("Skipped insert question, auto-saving...");
                setSkippedInsertQuestion(true); // Trigger auto-save inside InsertQuestion
            }

            else if (isSkipped && currentQuestion.type === "delete") {
                console.log("Skipped delete question, auto-saving...");
                setSkippedDeleteQuestion(true); // Trigger auto-save inside DeleteQuestion
            }

            else if (isSkipped && currentQuestion.type === "update") {
                console.log("Skipped update question, auto-saving...");
                setSkippedUpdateQuestion(true); // Trigger auto-save inside UpdateQuestion
            }

            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay for the next question

            //setCurrentQuestionIndex((prev) => prev + 1);
            //setSelectedAnswer(answeredQuestions[currentQuestionIndex + 1] || null);
            setCurrentQuestionIndex((prev) => {
                const newIndex = prev + 1;
                setSelectedAnswer(answeredQuestions[newIndex] || null);
                return newIndex;
            });
            setTimeLeft(15);


        } else {
            navigate("/results", { state: { score, userAnswers: answeredQuestions } });
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
            <Header text={"Array-Quizz"} />
            <h1 className="text-3xl font-extrabold mb-6 text-center">📚 Array Quiz</h1>

            <div className="w-full max-w-3xl bg-white text-black p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4 text-gray-700">
                    <p className="text-lg font-medium">
                        Question {currentQuestionIndex + 1} / {allQuestions.length}
                    </p>
                    <div className="flex items-center gap-2 text-yellow-500">
                        <Timer className="w-5 h-5" />
                        <p className="font-semibold text-lg">{timeLeft}s</p>
                    </div>
                </div>

                {/* Render MCQ or Interactive Question */}
                {currentQuestion.type === "mcq" ? (
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
                                        option === currentQuestion.answer ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />
                                    ) : null}
                                    {option}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    currentQuestion.type === "insert" ? (
                            <InsertQuestion data={currentQuestion} updateUserAnswers={updateUserAnswers} questionIndex={currentQuestionIndex} isSkipped={skippedInsertQuestion} setSkippedInsertQuestion={setSkippedInsertQuestion} onCorrect={() => setScore((prev) => prev + 1)} />
                    ) : currentQuestion.type === "delete" ? (
                                <DeleteQuestion data={currentQuestion} updateUserAnswers={updateUserAnswers} questionIndex={currentQuestionIndex} skippedDeleteQuestion={skippedDeleteQuestion} setSkippedDeleteQuestion={setSkippedDeleteQuestion} onCorrect={() => setScore((prev) => prev + 1)} />
                            ) : <UpdateQuestion data={currentQuestion} updateUserAnswers={updateUserAnswers} questionIndex={currentQuestionIndex} skippedUpdateQuestion={skippedUpdateQuestion} setSkippedUpdateQuestion={setSkippedUpdateQuestion} onCorrect={() => setScore((prev) => prev + 1)} />
                )}

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

export default MCQQuiz;


/*import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Timer, ChevronLeft, ChevronRight } from "lucide-react";
import mcqQuestions from "../utils/mcqData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../Header"; // Ensure Header is imported

const MCQQuiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            toast.error("Time's up! Moving to next question.");
            nextQuestion();
        }
    }, [timeLeft]);

    const currentQuestion = mcqQuestions[currentQuestionIndex];

    const handleAnswerSelection = (option) => {
        if (answeredQuestions[currentQuestionIndex]) return;

        setSelectedAnswer(option);
        setAnsweredQuestions((prev) => ({ ...prev, [currentQuestionIndex]: option }));

        if (option === currentQuestion.answer) {
            toast.success("Correct Answer 🎉");
            setScore((prevScore) => prevScore + 1);
        } else {
            toast.error("Incorrect Answer ❌");
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < mcqQuestions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedAnswer(answeredQuestions[currentQuestionIndex + 1] || null);
            setTimeLeft(10);
        } else {
            navigate("/results", { state: { score, userAnswers: answeredQuestions } });
        }
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
            setSelectedAnswer(answeredQuestions[currentQuestionIndex - 1] || null);

            if (!answeredQuestions[currentQuestionIndex - 1]) {
                setTimeLeft(10);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header Component }
            <Header text="MCQ Quiz" />

            {/* Main Quiz Container }
            <div className="flex flex-col items-center justify-center flex-grow px-4 py-6 md:py-10">
                <h1 className="text-2xl md:3xl font-bold mb-6 text-center text-white">📚 Array Quiz</h1>
                <div className="w-full max-w-3xl bg-white text-black p-6 md:p-8 rounded-lg shadow-lg">

                    {/* Progress & Timer }
                    <div className="flex justify-between items-center mb-4 ">
                        <p className="text-sm md:text-lg font-medium">
                            Question {currentQuestionIndex + 1} / {mcqQuestions.length}
                        </p>
                        <div className="flex items-center gap-2 text-yellow-500">
                            <Timer className="w-5 h-5" />
                            <p className="font-semibold text-sm md:text-lg">{timeLeft}s</p>
                        </div>
                    </div>

                    {/* Question }
                    <h2 className="text-lg md:text-xl font-bold mb-4">{currentQuestion.question}</h2>

                    {/* Answer Options }
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelection(option)}
                                disabled={answeredQuestions[currentQuestionIndex]}
                                className={`w-full flex items-center gap-2 p-3 md:p-4 rounded-lg text-sm md:text-lg font-medium border transition-all duration-300 
                                ${selectedAnswer === option
                                        ? option === currentQuestion.answer
                                            ? "bg-green-500 text-white border-green-600"
                                            : "bg-red-500 text-white border-red-600"
                                        : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                            >
                                {selectedAnswer === option ? (
                                    option === currentQuestion.answer ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />
                                ) : null}
                                {option}
                            </button>
                        ))}
                    </div>

                    {/* Navigation Buttons }
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

                {/* Score Display }
                <div className="mt-6 bg-white text-black py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-md text-sm md:text-lg font-semibold">
                    Score: <span className="text-blue-500">{score}</span> / {mcqQuestions.length}
                </div>
            </div>
        </div>
    );
};

export default MCQQuiz;*/







