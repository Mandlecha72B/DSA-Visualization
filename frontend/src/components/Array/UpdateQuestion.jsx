import React, { useState,useEffect } from "react";
import toast from "react-hot-toast";

const UpdateQuestion = ({ data, onCorrect, updateUserAnswers, questionIndex, skippedUpdateQuestion }) => {
    const [array, setArray] = useState([...data.array]); // Initialize array state

    useEffect(() => {
        if (skippedUpdateQuestion) {
            console.log("skippedUpdateQuestion changed:", skippedUpdateQuestion);
            autoSaveUpdateQuestion();
        }
    }, [skippedUpdateQuestion]);

    const autoSaveUpdateQuestion = () => {

        const correctArray = [...data.array];
        correctArray[data.targetIndex] = data.targetValue; // Expected update



        updateUserAnswers(questionIndex, {
            initialArray: data.array,
            userAttempt: "Not Answered",
            correctArray,
            targetIndex: data.targetIndex,
            targetValue: data.targetValue,
            explanation: `Updated element at index ${data.targetIndex} with value ${data.targetValue}.`,
            isCorrect: false,
        });
        setSkippedUpdateQuestion(false); // Reset the skipped state


    }




    const handleUpdate = (index) => {
        if (index === data.targetIndex) {
            const updatedArray = [...array];
            updatedArray[index] = data.targetValue; // Update the correct index
            setArray(updatedArray);

            toast.success(`Updated index ${index} with ${data.targetValue}!`);

            checkCorrectness(updatedArray); // Check if the answer is correct
        } else {
            toast.error(`Incorrect! You must update index ${data.targetIndex}.`);
        }
    };

    const checkCorrectness = (userAttempt) => {
        const correctArray = [...data.array];
        correctArray[data.targetIndex] = data.targetValue; // Expected update

        const isCorrect = JSON.stringify(userAttempt) === JSON.stringify(correctArray);

        updateUserAnswers(questionIndex, {
            initialArray: data.array,
            userAttempt,
            correctArray,
            targetIndex: data.targetIndex,
            targetValue: data.targetValue,
            explanation: `Updated element at index ${data.targetIndex} with value ${data.targetValue}.`,
            isCorrect,
        });

        if (isCorrect) {
            onCorrect();
            toast.success("Correct update!");
        } else {
            toast.error("Incorrect update!");
        }
    };

    return (
        <div className="flex flex-col items-center">
            <p className="mb-4 text-lg font-semibold">
                Click on index <strong>{data.targetIndex}</strong> to update it with value <strong>{data.targetValue}</strong>.
            </p>

            <div className="flex gap-3 bg-white text-black p-3 rounded-lg shadow-md">
                {array.map((num, i) => (
                    <button
                        key={i}
                        className={`p-4 rounded-lg bg-blue-400`}
                        onClick={() => handleUpdate(i)}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UpdateQuestion;
