import React, { useState, useCallback , useEffect} from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import toast from "react-hot-toast";

const ItemTypes = { NUMBER: "number" };

const InsertQuestion = ({ data, onCorrect, updateUserAnswers, questionIndex, isSkipped, setSkippedInsertQuestion }) => {
    const [array, setArray] = useState(data.array);
    const [spaceCreated, setSpaceCreated] = useState(false);
    const [nextShiftIndex, setNextShiftIndex] = useState(data.array.length - 1);

    useEffect(() => {
        if (isSkipped) {
            console.log("skippedInsertQuestion changed:", isSkipped);
            autoSaveInsertQuestion();
        }
    }, [isSkipped]);

    


    const handleShift = useCallback((dragIndex) => {
        let newArray = [...array];

        //let emptyIndex = newArray.indexOf(null);
        //if (emptyIndex === -1 || emptyIndex <= dragIndex) return;
        if (nextShiftIndex === -1 || nextShiftIndex <= dragIndex) return;

        for (let i = nextShiftIndex; i > dragIndex; i--) {
            newArray[i] = newArray[i - 1];
        }
        //newArray[dragIndex] = null;
        setArray(newArray);
        setNextShiftIndex((prev) => prev - 1);
        if (dragIndex === data.targetIndex) {
            setSpaceCreated(true);
        }



        /*if (newArray[data.targetIndex] === null) {
            setSpaceCreated(true);
        }*/

    }, [array, data.targetIndex]);
    
  

    const autoSaveInsertQuestion = () => {
        console.log("Auto-saving skipped insert question...");
        let correctArray = [...data.array];

        for (let i = correctArray.length - 1; i > data.targetIndex; i--) {
            correctArray[i] = correctArray[i - 1];
        }
        correctArray[data.targetIndex] = data.targetValue;

        let explanationSteps = [];
        let tempArray = [...data.array];

        for (let i = tempArray.length - 1; i >= data.targetIndex; i--) {
            if (tempArray[i] !== null) {
                explanationSteps.push(`Shift ${tempArray[i]} → index ${i + 1}`);
                tempArray[i + 1] = tempArray[i];
                tempArray[i] = null;
            }
        }
        explanationSteps.push(`Insert ${data.targetValue} at index ${data.targetIndex}`);

        const insertionResult = {
            initialArray: data.array,
            userAttempt: "Not Answered",
            correctArray,
            targetValue: data.targetValue,
            targetIndex: data.targetIndex,
            explanation: explanationSteps.join("\n"),
            isCorrect: false,
        };

        updateUserAnswers(questionIndex, insertionResult);
        setSkippedInsertQuestion(false); // Reset skipped state
    };

    const handleInsert = useCallback(() => {
        if (!spaceCreated) {
            toast.error("Shift elements first to create space!");
            return;
        }

        // ✅ Preserve original user attempt
        let userAttempt = [...array];
        userAttempt[data.targetIndex] = data.targetValue; // Insert user’s value

        // ✅ Construct the correct array (without modifying UI immediately)
        let correctArray = [...data.array];
        for (let i = correctArray.length - 1; i > data.targetIndex; i--) {
            correctArray[i] = correctArray[i - 1]; // Perform correct shifts
        }
        correctArray[data.targetIndex] = data.targetValue; // Correct insertion

        // ✅ Compare user attempt with correct answer
        const isCorrect = JSON.stringify(userAttempt) === JSON.stringify(correctArray);

        // ✅ Explanation for result page
        let explanationSteps = [];
        let tempArray = [...data.array];

        for (let i = tempArray.length - 1; i >= data.targetIndex; i--) {
            if (tempArray[i] !== null) {
                explanationSteps.push(`Shift ${tempArray[i]} → index ${i + 1}`);
                tempArray[i + 1] = tempArray[i];
                tempArray[i] = null;
            }
        }
        explanationSteps.push(`Insert ${data.targetValue} at index ${data.targetIndex}`);

        // ✅ Store result
        const insertionResult = {
            initialArray: data.array,
            userAttempt,
            correctArray,
            targetValue: data.targetValue,
            targetIndex: data.targetIndex,
            explanation: explanationSteps.join("\n"),
            isCorrect,
        };
        console.log("Insertion Result:", insertionResult);

        if (isCorrect) {
            setArray(correctArray); // ✅ Only update UI when correct
            onCorrect();
            toast.success("Correct! Well done 🎉");
        } else {
            toast.error("Incorrect! Check the correct answer in results.");
        }

        setSpaceCreated(false); // Reset shifting state
        updateUserAnswers(questionIndex, insertionResult);
    }, [array, data, spaceCreated, updateUserAnswers, questionIndex, onCorrect]);





    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col items-center">
                <p className="mb-4 text-sm sm:text-lg md:text-xl font-semibold text-center px-4">
                    Shift elements to insert <strong>{data.targetValue}</strong> at index <strong>{data.targetIndex}</strong>.
                </p>

                <div className="flex flex-wrap justify-center items-center gap-3 bg-white text-black p-3 rounded-lg shadow-md w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl">

                    {array.map((num, i) => (
                        <DropZone key={i} index={i} onShift={handleShift}>
                            <DraggableItem value={num} index={i} />
                        </DropZone>
                    ))}
                </div>

                <button
                    onClick={handleInsert}
                    className="mt-4 px-6 py-3 bg-green-500 rounded-lg text-white text-sm sm:text-base md:text-lg shadow-lg transition hover:bg-green-600"
                >
                    Insert {data.targetValue}
                </button>
            </div>
        </DndProvider>
    );
};

const DraggableItem = ({ value, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.NUMBER,
        item: { index },
        collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    }));

    return value !== null ? (
        <div
            ref={drag}
            className={`p-3 sm:p-4 md:p-5 bg-green-500 text-white rounded-lg cursor-grab 
            text-xs sm:text-sm md:text-base 
            min-w-[40px] sm:min-w-[50px] md:min-w-[60px] text-center
            ${isDragging ? "opacity-50" : "opacity-100"}`}
        >
            {value}
        </div>

    ) : (
            <div className="p-4 bg-gray-200 rounded-lg text-xs sm:text-sm md:text-base 
            min-w-[40px] sm:min-w-[50px] md:min-w-[60px]  text-center">Empty</div>
    );
};

const DropZone = ({ index, onShift, children }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.NUMBER,
        drop: (item) => onShift(item.index),
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    }));

    return (
        <div
            ref={drop}
            className={`p-2 sm:p-3 md:p-4 border-2 border-dashed border-gray-500 
             min-w-[40px] sm:min-w-[50px] md:min-w-[60px] 
            ${isOver ? "bg-yellow-200" : ""}`}
        >
            {children}
        </div>
    );
};

export default InsertQuestion;
