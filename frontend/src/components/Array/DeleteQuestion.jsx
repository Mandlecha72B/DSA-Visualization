import React, { useState, useCallback, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import toast from "react-hot-toast";

const ItemTypes = { NUMBER: "number" };

const DeleteQuestion = ({ data, onCorrect, updateUserAnswers, questionIndex, skippedDeleteQuestion }) => {
    const [array, setArray] = useState([...data.array]);
    const deleteIndex = data.targetIndex;
    const [nextShiftIndex, setNextShiftIndex] = useState(deleteIndex); // Start shifting at the deletion index

    useEffect(() => {
        if (nextShiftIndex === array.length - 1) {
            setTimeout(() => {
                setArray((prevArray) => prevArray.slice(0, -1));
                toast.success("Element deleted successfully!");
                checkCorrectness([...array].slice(0, -1));
            }, 100);
        }
    }, [nextShiftIndex, array.length]);

    useEffect(() => {
        if (skippedDeleteQuestion) {
            console.log("skippedDeleteQuestion changed:", skippedDeleteQuestion);
                autoSaveDeleteQuestion();
            }
    }, [skippedDeleteQuestion]);
    
    const autoSaveDeleteQuestion = () => {

        let correctArray = [...data.array];

        for (let i = deleteIndex; i < correctArray.length - 1; i++) {
            correctArray[i] = correctArray[i + 1];
        }
        correctArray.pop(); // Remove last element

        

        let explanationSteps = [];
        let tempArray = [...data.array];

        for (let i = deleteIndex; i < tempArray.length - 1; i++) {
            if (tempArray[i] !== null) {
                explanationSteps.push(`Shift ${tempArray[i + 1]} → index ${i}`);
                tempArray[i] = tempArray[i + 1];

            }
        }
        tempArray.pop();
        explanationSteps.push(`Reduce array size from ${data.array.length} to ${tempArray.length}`);

        updateUserAnswers(questionIndex, {
            initialArray: data.array,
            userAttempt: "Not Answered",
            correctArray,
            targetIndex: deleteIndex,
            explanation: explanationSteps.join("\n"),
            isCorrect : false,
        });

        setSkippedDeleteQuestion(false); // Reset the skipped state

        
    }


    const handleShift = useCallback(
        (dragIndex) => {

            if (deleteIndex === data.array.length - 1) {
                setArray((prevArray) => prevArray.slice(0, -1));
                toast.success("Element deleted successfully!");
                checkCorrectness(array.slice(0, -1));
                return;
            }

            /* setArray((prevArray) => {
            let newArray = [...prevArray];

            // Shift elements left
            for (let i = nextShiftIndex; i < dragIndex; i++) {
                newArray[i] = newArray[i + 1];
            }

            return newArray;
        });*/

            let newArray = [...array];


            if (dragIndex === deleteIndex || dragIndex > array.length - 1 || dragIndex <= nextShiftIndex) return;

            for (let i = nextShiftIndex; i < dragIndex; i++) {
                newArray[i] = newArray[i + 1];
            }

            setArray(newArray);

            setNextShiftIndex((prevIndex) => prevIndex + 1); // Move shift index forward


        },
        [array, nextShiftIndex]
    );

    const checkCorrectness = (userAttempt) => {
        let correctArray = [...data.array];

        for (let i = deleteIndex; i < correctArray.length - 1; i++) {
            correctArray[i] = correctArray[i + 1];
        }
        correctArray.pop(); // Remove last element

        const isCorrect = JSON.stringify(userAttempt) === JSON.stringify(correctArray);

        let explanationSteps = [];
        let tempArray = [...data.array];

        for (let i = deleteIndex; i < tempArray.length - 1; i++) {
            if (tempArray[i] !== null) {
                explanationSteps.push(`Shift ${tempArray[i + 1]} → index ${i}`);
                tempArray[i] = tempArray[i + 1];

            }
        }
        tempArray.pop();
        explanationSteps.push(`Reduce array size from ${data.array.length} to ${tempArray.length}`);

        updateUserAnswers(questionIndex, {
            initialArray: data.array,
            userAttempt,
            correctArray,
            targetIndex: deleteIndex,
            explanation: explanationSteps.join("\n"),
            isCorrect,
        });

        if (isCorrect) {
            onCorrect();
            toast.success("Correct deletion!");
        } else {
            toast.error("Incorrect deletion!");
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col items-center">
                <p className="mb-4 text-sm sm:text-lg md:text-xl font-semibold text-center px-4">

                    Delete element at index <strong>{deleteIndex}</strong> by shifting elements left.
                </p>

                <div className="flex flex-wrap justify-center items-center gap-3 bg-white text-black p-3 rounded-lg shadow-md w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl">

                    {array.map((num, i) => (
                        <DropZone key={i} index={i} onShift={handleShift} nextShiftIndex={nextShiftIndex}>
                            <DraggableItem value={num} index={i} />
                        </DropZone>
                    ))}
                </div>
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

    return (
        <div
            ref={drag}
            className={`p-3 sm:p-4 md:p-5 bg-blue-500 text-white rounded-lg cursor-grab 
    text-xs sm:text-sm md:text-base 
    min-w-[40px] sm:min-w-[50px] md:min-w-[60px] 
    ${isDragging ? "opacity-50" : "opacity-100"}`}
        >
            {value}
        </div>

    );
};

const DropZone = ({ index, onShift, nextShiftIndex, children }) => {
    const [, drop] = useDrop(() => ({
        accept: ItemTypes.NUMBER,
        drop: (item) => onShift(item.index),
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    }));

    return (
        <div
            ref={drop}
            className={`p-2 sm:p-3 md:p-4 border-2 border-dashed border-gray-500 
    min-w-[40px] sm:min-w-[50px] md:min-w-[60px] 
    flex justify-center 
    ${index === nextShiftIndex ? "bg-yellow-200" : ""}`}
        >
            {children}
        </div>

    );
};

export default DeleteQuestion;
