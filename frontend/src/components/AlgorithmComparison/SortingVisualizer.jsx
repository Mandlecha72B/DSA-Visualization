
/*import React, { useState, useEffect } from "react";
import { ClipboardList } from "lucide-react"; // Import icon from Lucide React
import Tooltip from "../Tooltip";
import Modal from "react-modal";
import ComparisonResult from "./ComparisonResult";

const bubbleSort = async (arr, setArray, setHighlight, setSorted, setSteps, delay, setExecutionTime) => {
    let tempArr = [...arr];
    let sortedIndices = [];
    let steps = [{ pass: 1, array: [...tempArr], comparisons: 0 }];
    setSteps([...steps]);

    let executionTime = 0; // Track execution time

    for (let i = 0; i < tempArr.length - 1; i++) {
        let comparisons = 0;
        let passObj = { pass: i + 1, array: [...tempArr], comparisons };

        if (i > 0) {
            setSteps((prevSteps) => [...prevSteps, passObj]);
        }

        for (let j = 0; j < tempArr.length - 1 - i; j++) {
            setHighlight([j, j + 1]); // Highlight comparison
            await new Promise((resolve) => setTimeout(resolve, delay)); // Ignore this in time calc

            let start = performance.now(); // Start timer for actual computation

            comparisons++;

            if (tempArr[j] > tempArr[j + 1]) {
                // Swap elements
                [tempArr[j], tempArr[j + 1]] = [tempArr[j + 1], tempArr[j]];
                setArray([...tempArr]); // Update UI

                passObj.array = [...tempArr];
                setHighlight([j, j + 1, "swap"]);
                await new Promise((resolve) => setTimeout(resolve, delay)); // Ignore this in time calc
            }

            let end = performance.now(); // End timer

            executionTime += end - start; // Accumulate execution time

            passObj.comparisons = comparisons;
            setSteps((prevSteps) => {
                let newSteps = [...prevSteps];
                newSteps[i] = { ...passObj };
                return newSteps;
            });
        }

        sortedIndices.push(tempArr.length - 1 - i);
        setSorted([...sortedIndices]);
    }

    setSorted([...Array(tempArr.length).keys()]);
    setHighlight([]);

    setExecutionTime(executionTime); // Store the calculated execution time
};

const selectionSort = async (arr, setArray, setHighlight, setSorted, setSteps, delay, setExecutionTime) => {
    let tempArr = [...arr];
    let sortedIndices = [];
    let steps = [{ pass: 1, array: [...tempArr], comparisons: 0 }];
    setSteps([...steps]);

    let executionTime = 0; // Track execution time

    for (let i = 0; i < tempArr.length - 1; i++) {
        let comparisons = 0;
        let minIndex = i;
        let passObj = { pass: i + 1, array: [...tempArr], comparisons };

        if (i > 0) {
            setSteps((prevSteps) => [...prevSteps, passObj]);
        }

        for (let j = i + 1; j < tempArr.length; j++) {
            setHighlight([minIndex, j]);
            await new Promise((resolve) => setTimeout(resolve, delay));

            let start = performance.now(); // Start timing comparison
            comparisons++;

            if (tempArr[j] < tempArr[minIndex]) {
                minIndex = j;
            }
            let end = performance.now(); // End timing comparison
            executionTime += end - start; // Accumulate execution time

            passObj.comparisons = comparisons;
            setSteps((prevSteps) => {
                let newSteps = [...prevSteps];
                newSteps[i] = { ...passObj };
                return newSteps;
            });
        }

        if (minIndex !== i) {
            let start = performance.now(); // Start timing swap
            [tempArr[i], tempArr[minIndex]] = [tempArr[minIndex], tempArr[i]];
            let end = performance.now(); // End timing swap
            executionTime += end - start; // Accumulate execution time

            setArray([...tempArr]);
            passObj.array = [...tempArr];
            setHighlight([i, minIndex, "swap"]);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }

        passObj.comparisons = comparisons;
        passObj.array = [...tempArr];

        setSteps((prevSteps) => {
            let newSteps = [...prevSteps];
            newSteps[i] = { ...passObj };
            return newSteps;
        });

        sortedIndices.push(i);
        setSorted([...sortedIndices]);
        await new Promise((resolve) => setTimeout(resolve, delay));
    }

    setSorted([...Array(tempArr.length).keys()]);
    setHighlight([]);

    setExecutionTime(executionTime); // Store execution time in state
};

const insertionSort = async (arr, setArray, setHighlight, setSorted, setSteps, delay, setExecutionTime) => {
    let tempArr = [...arr];
    let sortedIndices = [];
    let steps = [{ pass: 1, array: [...tempArr], comparisons: 0 }];

    setSteps([...steps]); // Initialize steps
    sortedIndices.push(0); // First element is already sorted
    setSorted([...sortedIndices]);
    await new Promise((resolve) => setTimeout(resolve, delay));

    let executionTime = 0; // Track execution time

    for (let i = 1; i < tempArr.length; i++) {
        let key = tempArr[i];
        let j = i - 1;
        let comparisons = 0;
        let passObj = { pass: i, array: [...tempArr], comparisons };

        if (i > 1) {
            setSteps((prevSteps) => [...prevSteps, passObj]);
        }

        while (j >= 0 && tempArr[j] > key) {
            let start = performance.now(); // Start timing comparison
            comparisons++;
            setHighlight([j, j + 1]); // Highlight comparison
            await new Promise((resolve) => setTimeout(resolve, delay));

            tempArr[j + 1] = tempArr[j]; // Shift elements to the right
            setArray([...tempArr]);
            let end = performance.now(); // End timing comparison
            executionTime += end - start; // Accumulate execution time

            passObj.array = [...tempArr];
            passObj.comparisons = comparisons;
            setSteps((prevSteps) => {
                let newSteps = [...prevSteps];
                newSteps[i - 1] = { ...passObj };
                return newSteps;
            });

            setHighlight([j, j + 1, "swap"]); // Highlight swap
            await new Promise((resolve) => setTimeout(resolve, delay));

            j--;
        }

        let start = performance.now(); // Start timing insertion
        tempArr[j + 1] = key; // Place the key at the correct position
        comparisons++; // Increment for final comparison
        let end = performance.now(); // End timing insertion
        executionTime += end - start; // Accumulate execution time

        setArray([...tempArr]);

        passObj.array = [...tempArr];
        passObj.comparisons = comparisons;
        setSteps((prevSteps) => {
            let newSteps = [...prevSteps];
            newSteps[i - 1] = { ...passObj };
            return newSteps;
        });

        sortedIndices.push(i);
        setSorted([...sortedIndices]);

        await new Promise((resolve) => setTimeout(resolve, delay));
    }

    setSorted([...Array(tempArr.length).keys()]); // Mark all elements as sorted
    setHighlight([]);

    setExecutionTime(executionTime); // Store execution time in state
};

// Algorithm List
const algorithms = {
    "Bubble Sort": bubbleSort,
    "Selection Sort": selectionSort,
    "Insertion Sort": insertionSort,
};

Modal.setAppElement("#root");
const SortingVisualizer = () => {
    const [array1, setArray1] = useState([]);
    const [array2, setArray2] = useState([]);
    const [algo1, setAlgo1] = useState("Bubble Sort");
    const [algo2, setAlgo2] = useState("Selection Sort");
    const [sorting, setSorting] = useState(false);
    const [highlight1, setHighlight1] = useState([]);
    const [highlight2, setHighlight2] = useState([]);
    const [sorted1, setSorted1] = useState([]);
    const [sorted2, setSorted2] = useState([]);
    const [steps1, setSteps1] = useState([]);
    const [steps2, setSteps2] = useState([]);
    const [array, setArray] = useState([]);
    const [arrayCondition, setArrayCondition] = useState("");
    const [executionTime1, setExecutionTime1] = useState(0);
    const [executionTime2, setExecutionTime2] = useState(0);
    const [sortingCompleted, setSortingCompleted] = useState(false);
    const [showComparison, setShowComparison] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const generateArray = () => {
        let newArr = [];

        switch (arrayCondition) {
            case "Nearly Sorted":
                newArr = Array.from({ length: 10 }, (_, i) => i * 10 + Math.floor(Math.random() * 5)); // Small variations
                break;

            case "Completely Unsorted":
                newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
                break;

            case "Reverse Sorted":
                newArr = Array.from({ length: 10 }, (_, i) => (10 - i) * 10);
                break;

            case "Many Duplicates":
                let possibleValues = [10, 20, 30, 40, 50];
                newArr = Array.from({ length: 10 }, () => possibleValues[Math.floor(Math.random() * possibleValues.length)]);
                break;

            case "Small Array":
                newArr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1);
                break;

            case "Large Array":
                newArr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
                break;

            default: // Random (if no condition is selected)
                newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
                break;
        }

        setArray1([...newArr]);
        setArray2([...newArr]);
        setArray([...newArr]);
        setHighlight1([]);
        setHighlight2([]);
        setSorted1([]);
        setSorted2([]);
        setSteps1([{ pass: 1, array: [...newArr], comparisons: 0 }]);
        setSteps2([{ pass: 1, array: [...newArr], comparisons: 0 }]);
    };

    // ✅ Call `generateArray()` when `arrayCondition` changes
    useEffect(() => {
        generateArray();
    }, [arrayCondition]);

    useEffect(() => {
        setSortingCompleted(false); // Reset sorting completed state when algo1 or algo2 changes
    },[algo1, algo2, arrayCondition]);

    // Start Sorting
    const startSorting = async () => {
        if (algo1 === algo2) {
            alert("Please select two different sorting algorithms.");
            return;
        }
        setSorting(true);
        setSortingCompleted(false); // Reset sorting completed state

        await Promise.all([
            algorithms[algo1](array1, setArray1, setHighlight1, setSorted1, setSteps1, 800, setExecutionTime1),
            algorithms[algo2](array2, setArray2, setHighlight2, setSorted2, setSteps2, 800, setExecutionTime2)
        ]);
        setSorting(false);
        setSortingCompleted(true); // Set sorting completed to true

    };

    // Function to get color based on index
    const getColor = (index, highlight, sorted) => {
        if (sorted.includes(index)) return "bg-green-500"; // Sorted elements
        if (highlight.includes(index)) {
            return highlight.includes("swap") ? "bg-red-500" : "bg-yellow-400"; // Swapping or comparing
        }
        return "bg-blue-500"; // Default
    };

    const handleComparisonSummary = () => {
        setShowComparison(true);
        setIsModalOpen(true);
    }

    return (
        <div className="min-h-screen w-screen mx-auto flex flex-col items-center bg-base-200 p-3   ">
            <h1 className="text-4xl font-bold text-primary mb-5">Sorting Algorithm Comparison</h1>

            <div className="flex flex-wrap gap-4 justify-center">
                <div className="form-control">
                    <label className="label">Algorithm 1</label>
                    <select
                        className="select select-primary w-full"
                        value={algo1}
                        onChange={(e) => setAlgo1(e.target.value)}
                        disabled={sorting}
                    >
                        {Object.keys(algorithms).map((algo) => (
                            <option key={algo} value={algo}>
                                {algo}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">Algorithm 2</label>
                    <select
                        className="select select-secondary w-full"
                        value={algo2}
                        onChange={(e) => setAlgo2(e.target.value)}
                        disabled={sorting}
                    >
                        {Object.keys(algorithms).map((algo) => (
                            <option key={algo} value={algo}>
                                {algo}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Array Condition Selector }
                <div className="form-control">
                    <label className="label">Array Condition</label>
                    <select
                        className="select select-accent w-full"
                        value={arrayCondition}
                        onChange={(e) => {
                            setArrayCondition(e.target.value === "Random" ? "" : e.target.value);
                        }}
                        disabled={sorting}
                    >
                        <option value="Random">Random</option>
                        <option value="Nearly Sorted">Nearly Sorted</option>
                        <option value="Completely Unsorted">Completely Unsorted</option>
                        <option value="Reverse Sorted">Reverse Sorted</option>
                        <option value="Many Duplicates">Many Duplicates</option>
                        <option value="Small Array">Small Array</option>
                        <option value="Large Array">Large Array</option>
                    </select>
                </div>
            </div>


            <div className="flex gap-4 mt-5">
                <button className="btn btn-outline btn-accent" onClick={generateArray} disabled={sorting}>
                    New Array
                </button>
                <button className="btn btn-primary" onClick={startSorting} disabled={sorting}>
                    Start Sorting
                </button>
                <Tooltip content="Comparison summary" >
                    <button
                        className={`btn btn-circle btn-lg${sortingCompleted ? "btn-success" : "btn-disabled"}`}
                        onClick={handleComparisonSummary}
                        disabled={!sortingCompleted}
                    >
                        <ClipboardList size={15} />
                    </button>
                </Tooltip>
            </div>
           

            {/* Original Input Array }
            <div className="mt-3 w-full flex flex-col items-center ">
                <h3 className="text-lg font-semibold text-white-700"> Input Array</h3>
                <div className="flex gap-1 p-3 bg-base-100 shadow-lg rounded-md">
                    {array.map((val, idx) => (
                        <span key={idx} className="p-1 text-white font-bold rounded bg-gray-600">
                            {val}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-nowrap justify-center gap-10 mt-3 w-[90%] max-h-[300px] overflow-y-auto overflow-x-auto">
                {/* Algorithm 1 Visualization }
                <div className="max-w-[90vw] overflow-x-auto">
                    <h3 className="text-lg font-semibold text-primary">{algo1}</h3>
                    {steps1.map((step, stepIndex) => (
                        <div key={stepIndex} className="mb-3">
                            <h4 className="text-sm text-gray-500">Pass {stepIndex + 1} (Comparisons: {step.comparisons})</h4>
                            <div className="flex gap-2 p-3 bg-base-100 shadow-lg rounded-md">
                                {step.array?.map((val, idx) => (
                                    <span
                                        key={idx}
                                        className={`p-2 text-white font-bold rounded ${getColor(idx, highlight1, sorted1)}`}
                                    >
                                        {val}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Algorithm 2 Visualization }
                <div className="max-w-[90vw] overflow-x-auto">
                    <h3 className="text-lg font-semibold text-secondary">{algo2}</h3>
                    {steps2.map((step, stepIndex) => (
                        <div key={stepIndex} className="mb-3">
                            <h4 className="text-sm text-gray-500">Pass {stepIndex + 1} (Comparisons: {step.comparisons})</h4>
                            <div className="flex gap-2 p-3 bg-base-100 shadow-lg rounded-md">
                                {step.array?.map((val, idx) => (
                                    <span
                                        key={idx}
                                        className={`p-2 text-white font-bold rounded ${getColor(idx, highlight2, sorted2)}`}
                                    >
                                        {val}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        backdropFilter: "blur(4px)",
                    },
                }}
                contentLabel="Comparison Summary"
                className="w-full max-w-lg rounded-lg shadow-lg mx-auto my-20 p-6 relative flex flex-col"
            >
                
                <ComparisonResult
                    onClose={() => setIsModalOpen(false)}
                    algo1={algo1}
                    algo2={algo2}
                    executionTime1={executionTime1}
                    executionTime2={executionTime2}
                    arrayCondition={arrayCondition}
                />
            </Modal>


        </div >
    );
};

export default SortingVisualizer;*/


import React, { useState, useEffect } from "react";
import { ClipboardList } from "lucide-react"; // Import icon from Lucide React
import Tooltip from "../Tooltip";
import Modal from "react-modal";
import ComparisonResult from "./ComparisonResult";
import QuickSortVisualizer from "./QuickSortVisualiser";
import { getQuickSortRecursiveSteps } from "./utils/QuickSort"; // Import the function to get quicksort steps

const bubbleSort = async (arr, setArray, setHighlight, setSorted, setSteps, delay, setExecutionTime) => {
    let tempArr = [...arr];
    let sortedIndices = [];
    let steps = [{ pass: 1, array: [...tempArr], comparisons: 0 }];
    setSteps([...steps]);

    let executionTime = 0; // Track execution time

    for (let i = 0; i < tempArr.length - 1; i++) {
        let comparisons = 0;
        let passObj = { pass: i + 1, array: [...tempArr], comparisons };

        if (i > 0) {
            setSteps((prevSteps) => [...prevSteps, passObj]);
        }

        for (let j = 0; j < tempArr.length - 1 - i; j++) {
            setHighlight([j, j + 1]); // Highlight comparison
            await new Promise((resolve) => setTimeout(resolve, delay)); // Ignore this in time calc

            let start = performance.now(); // Start timer for actual computation

            comparisons++;

            if (tempArr[j] > tempArr[j + 1]) {
                // Swap elements
                [tempArr[j], tempArr[j + 1]] = [tempArr[j + 1], tempArr[j]];
                setArray([...tempArr]); // Update UI

                passObj.array = [...tempArr];
                setHighlight([j, j + 1, "swap"]);
                await new Promise((resolve) => setTimeout(resolve, delay)); // Ignore this in time calc
            }

            let end = performance.now(); // End timer

            executionTime += end - start; // Accumulate execution time

            passObj.comparisons = comparisons;
            setSteps((prevSteps) => {
                let newSteps = [...prevSteps];
                newSteps[i] = { ...passObj };
                return newSteps;
            });
        }

        sortedIndices.push(tempArr.length - 1 - i);
        setSorted([...sortedIndices]);
    }

    setSorted([...Array(tempArr.length).keys()]);
    setHighlight([]);

    setExecutionTime(executionTime); // Store the calculated execution time
};

const selectionSort = async (arr, setArray, setHighlight, setSorted, setSteps, delay, setExecutionTime) => {
    let tempArr = [...arr];
    let sortedIndices = [];
    let steps = [{ pass: 1, array: [...tempArr], comparisons: 0 }];
    setSteps([...steps]);

    let executionTime = 0; // Track execution time

    for (let i = 0; i < tempArr.length - 1; i++) {
        let comparisons = 0;
        let minIndex = i;
        let passObj = { pass: i + 1, array: [...tempArr], comparisons };

        if (i > 0) {
            setSteps((prevSteps) => [...prevSteps, passObj]);
        }

        for (let j = i + 1; j < tempArr.length; j++) {
            setHighlight([minIndex, j]);
            await new Promise((resolve) => setTimeout(resolve, delay));

            let start = performance.now(); // Start timing comparison
            comparisons++;

            if (tempArr[j] < tempArr[minIndex]) {
                minIndex = j;
            }
            let end = performance.now(); // End timing comparison
            executionTime += end - start; // Accumulate execution time

            passObj.comparisons = comparisons;
            setSteps((prevSteps) => {
                let newSteps = [...prevSteps];
                newSteps[i] = { ...passObj };
                return newSteps;
            });
        }

        if (minIndex !== i) {
            let start = performance.now(); // Start timing swap
            [tempArr[i], tempArr[minIndex]] = [tempArr[minIndex], tempArr[i]];
            let end = performance.now(); // End timing swap
            executionTime += end - start; // Accumulate execution time

            setArray([...tempArr]);
            passObj.array = [...tempArr];
            setHighlight([i, minIndex, "swap"]);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }

        passObj.comparisons = comparisons;
        passObj.array = [...tempArr];

        setSteps((prevSteps) => {
            let newSteps = [...prevSteps];
            newSteps[i] = { ...passObj };
            return newSteps;
        });

        sortedIndices.push(i);
        setSorted([...sortedIndices]);
        await new Promise((resolve) => setTimeout(resolve, delay));
    }

    setSorted([...Array(tempArr.length).keys()]);
    setHighlight([]);

    setExecutionTime(executionTime); // Store execution time in state
};

const insertionSort = async (arr, setArray, setHighlight, setSorted, setSteps, delay, setExecutionTime) => {
    let tempArr = [...arr];
    let sortedIndices = [];
    let steps = [{ pass: 1, array: [...tempArr], comparisons: 0 }];

    setSteps([...steps]); // Initialize steps
    sortedIndices.push(0); // First element is already sorted
    setSorted([...sortedIndices]);
    await new Promise((resolve) => setTimeout(resolve, delay));

    let executionTime = 0; // Track execution time

    for (let i = 1; i < tempArr.length; i++) {
        let key = tempArr[i];
        let j = i - 1;
        let comparisons = 0;
        let passObj = { pass: i, array: [...tempArr], comparisons };

        if (i > 1) {
            setSteps((prevSteps) => [...prevSteps, passObj]);
        }

        while (j >= 0 && tempArr[j] > key) {
            let start = performance.now(); // Start timing comparison
            comparisons++;
            setHighlight([j, j + 1]); // Highlight comparison
            await new Promise((resolve) => setTimeout(resolve, delay));

            tempArr[j + 1] = tempArr[j]; // Shift elements to the right
            setArray([...tempArr]);
            let end = performance.now(); // End timing comparison
            executionTime += end - start; // Accumulate execution time

            passObj.array = [...tempArr];
            passObj.comparisons = comparisons;
            setSteps((prevSteps) => {
                let newSteps = [...prevSteps];
                newSteps[i - 1] = { ...passObj };
                return newSteps;
            });

            setHighlight([j, j + 1, "swap"]); // Highlight swap
            await new Promise((resolve) => setTimeout(resolve, delay));

            j--;
        }

        let start = performance.now(); // Start timing insertion
        tempArr[j + 1] = key; // Place the key at the correct position
        comparisons++; // Increment for final comparison
        let end = performance.now(); // End timing insertion
        executionTime += end - start; // Accumulate execution time

        setArray([...tempArr]);

        passObj.array = [...tempArr];
        passObj.comparisons = comparisons;
        setSteps((prevSteps) => {
            let newSteps = [...prevSteps];
            newSteps[i - 1] = { ...passObj };
            return newSteps;
        });

        sortedIndices.push(i);
        setSorted([...sortedIndices]);

        await new Promise((resolve) => setTimeout(resolve, delay));
    }

    setSorted([...Array(tempArr.length).keys()]); // Mark all elements as sorted
    setHighlight([]);

    setExecutionTime(executionTime); // Store execution time in state
};



// Algorithm List
const algorithms = {
    "Bubble Sort": bubbleSort,
    "Selection Sort": selectionSort,
    "Insertion Sort": insertionSort,
    "Quick Sort": "QuickSortVisualizer",
};

Modal.setAppElement("#root");
const SortingVisualizer = () => {
    const [array1, setArray1] = useState([]);
    const [array2, setArray2] = useState([]);
    const [algo1, setAlgo1] = useState("Bubble Sort");
    const [algo2, setAlgo2] = useState("Selection Sort");
    const [sorting, setSorting] = useState(false);
    const [highlight1, setHighlight1] = useState([]);
    const [highlight2, setHighlight2] = useState([]);
    const [sorted1, setSorted1] = useState([]);
    const [sorted2, setSorted2] = useState([]);
    const [steps1, setSteps1] = useState([]);
    const [steps2, setSteps2] = useState([]);
    const [array, setArray] = useState([]);
    const [arrayCondition, setArrayCondition] = useState("");
    const [executionTime1, setExecutionTime1] = useState(0);
    const [executionTime2, setExecutionTime2] = useState(0);
    const [sortingCompleted, setSortingCompleted] = useState(false);
    const [showComparison, setShowComparison] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    //const [isQuickSort, setIsQuickSort] = useState(false);
    

    const generateArray = () => {
        let newArr = [];

        switch (arrayCondition) {
            case "Nearly Sorted":
                newArr = Array.from({ length: 10 }, (_, i) => i * 10 + Math.floor(Math.random() * 5)); // Small variations
                break;

            case "Completely Unsorted":
                newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
                break;

            case "Reverse Sorted":
                newArr = Array.from({ length: 10 }, (_, i) => (10 - i) * 10);
                break;

            case "Many Duplicates":
                let possibleValues = [10, 20, 30, 40, 50];
                newArr = Array.from({ length: 10 }, () => possibleValues[Math.floor(Math.random() * possibleValues.length)]);
                break;

            case "Small Array":
                newArr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1);
                break;

            case "Large Array":
                newArr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
                break;

            default: // Random (if no condition is selected)
                newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
                break;
        }

        setArray1([...newArr]);
        setArray2([...newArr]);
        setArray([...newArr]);
        setHighlight1([]);
        setHighlight2([]);
        setSorted1([]);
        setSorted2([]);
        setSteps1([{ pass: 1, array: [...newArr], comparisons: 0 }]);
        setSteps2([{ pass: 1, array: [...newArr], comparisons: 0 }]);
    };

    // ✅ Call `generateArray()` when `arrayCondition` changes
    useEffect(() => {
        generateArray();
    }, [arrayCondition]);

    useEffect(() => {
        setSortingCompleted(false); // Reset sorting completed state when algo1 or algo2 changes
    }, [algo1, algo2, arrayCondition]);

    // Start Sorting
    const startSorting = async () => {
        if (algo1 === algo2) {
            alert("Please select two different sorting algorithms.");
            return;
        }
        setSorting(true);
        setSortingCompleted(false); // Reset sorting completed state

        await Promise.all([
            algo1 !== "Quick Sort"
                ? algorithms[algo1](array1, setArray1, setHighlight1, setSorted1, setSteps1, 800, setExecutionTime1)
                : Promise.resolve(setExecutionTime1(getQuickSortRecursiveSteps(array1).executionTime)),

            algo2 !== "Quick Sort"
                ? algorithms[algo2](array2, setArray2, setHighlight2, setSorted2, setSteps2, 800, setExecutionTime2)
                : Promise.resolve(setExecutionTime2(getQuickSortRecursiveSteps(array2).executionTime)),
        ]);

        setSorting(false);
        setSortingCompleted(true); // Set sorting completed to true

    };

    // Function to get color based on index
    const getColor = (index, highlight, sorted) => {
        if (sorted.includes(index)) return "bg-green-500"; // Sorted elements
        if (highlight.includes(index)) {
            return highlight.includes("swap") ? "bg-red-500" : "bg-yellow-400"; // Swapping or comparing
        }
        return "bg-blue-500"; // Default
    };

    const handleComparisonSummary = () => {
        setShowComparison(true);
        setIsModalOpen(true);
    }

    return (
        <div className="min-h-screen w-screen mx-auto flex flex-col items-center bg-base-200 p-3   ">
            <h1 className="text-4xl font-bold text-primary mb-5">Sorting Algorithm Comparison</h1>

            <div className="flex flex-wrap gap-4 justify-center">
                <div className="form-control">
                    <label className="label">Algorithm 1</label>
                    <select
                        className="select select-primary w-full"
                        value={algo1}
                        onChange={(e) => setAlgo1(e.target.value)}
                        disabled={sorting}
                    >
                        {Object.keys(algorithms).map((algo) => (
                            <option key={algo} value={algo}>
                                {algo}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">Algorithm 2</label>
                    <select
                        className="select select-secondary w-full"
                        value={algo2}
                        onChange={(e) => setAlgo2(e.target.value)}
                        disabled={sorting}
                    >
                        {Object.keys(algorithms).map((algo) => (
                            <option key={algo} value={algo}>
                                {algo}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Array Condition Selector */}
                <div className="form-control">
                    <label className="label">Array Condition</label>
                    <select
                        className="select select-accent w-full"
                        value={arrayCondition}
                        onChange={(e) => {
                            setArrayCondition(e.target.value === "Random" ? "" : e.target.value);
                        }}
                        disabled={sorting}
                    >
                        <option value="Random">Random</option>
                        <option value="Nearly Sorted">Nearly Sorted</option>
                        <option value="Completely Unsorted">Completely Unsorted</option>
                        <option value="Reverse Sorted">Reverse Sorted</option>
                        <option value="Many Duplicates">Many Duplicates</option>
                        <option value="Small Array">Small Array</option>
                        <option value="Large Array">Large Array</option>
                    </select>
                </div>
            </div>


            <div className="flex gap-4 mt-5">
                <button className="btn btn-outline btn-accent" onClick={generateArray} disabled={sorting}>
                    New Array
                </button>
                <button className="btn btn-primary" onClick={startSorting} disabled={sorting}>
                    Start Sorting
                </button>
                <Tooltip content="Comparison summary" >
                    <button
                        className={`btn btn-circle btn-lg${sortingCompleted ? "btn-success" : "btn-disabled"}`}
                        onClick={handleComparisonSummary}
                        disabled={!sortingCompleted}
                    >
                        <ClipboardList size={15} />
                    </button>
                </Tooltip>
            </div>


            {/* Original Input Array */}
            <div className="mt-3 w-full flex flex-col items-center ">
                <h3 className="text-lg font-semibold text-white-700"> Input Array</h3>
                <div className="flex gap-1 p-3 bg-base-100 shadow-lg rounded-md">
                    {array.map((val, idx) => (
                        <span key={idx} className="p-1 text-white font-bold rounded bg-gray-600">
                            {val}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-nowrap justify-center gap-10 mt-3 w-[90%] max-h-[300px] overflow-y-auto overflow-x-auto">
                {/* Algorithm 1 Visualization */}
                <div className="max-w-[90vw] overflow-x-auto">
                    <h3 className="text-lg font-semibold text-primary">{algo1}</h3>
                    {algo1 === "Quick Sort" ? (
                        <QuickSortVisualizer array={array1} />
                    ) :
                    (steps1.map((step, stepIndex) => (
                        <div key={stepIndex} className="mb-3">
                            <h4 className="text-sm text-gray-500">Pass {stepIndex + 1} (Comparisons: {step.comparisons})</h4>
                            <div className="flex gap-2 p-3 bg-base-100 shadow-lg rounded-md">
                                {step.array?.map((val, idx) => (
                                    <span
                                        key={idx}
                                        className={`p-2 text-white font-bold rounded ${getColor(idx, highlight1, sorted1)}`}
                                    >
                                        {val}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )))}
                </div>

                {/* Algorithm 2 Visualization */}
                <div className="max-w-[90vw] overflow-x-auto">
                    <h3 className="text-lg font-semibold text-secondary">{algo2}</h3>
                    {algo1 === "Quick Sort" ? (
                        <QuickSortVisualizer array={array2} />
                    ) :
                    (steps2.map((step, stepIndex) => (
                        <div key={stepIndex} className="mb-3">
                            <h4 className="text-sm text-gray-500">Pass {stepIndex + 1} (Comparisons: {step.comparisons})</h4>
                            <div className="flex gap-2 p-3 bg-base-100 shadow-lg rounded-md">
                                {step.array?.map((val, idx) => (
                                    <span
                                        key={idx}
                                        className={`p-2 text-white font-bold rounded ${getColor(idx, highlight2, sorted2)}`}
                                    >
                                        {val}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )))}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        backdropFilter: "blur(4px)",
                    },
                }}
                contentLabel="Comparison Summary"
                className="w-full max-w-lg rounded-lg shadow-lg mx-auto my-20 p-6 relative flex flex-col"
            >

                <ComparisonResult
                    onClose={() => setIsModalOpen(false)}
                    algo1={algo1}
                    algo2={algo2}
                    executionTime1={executionTime1}
                    executionTime2={executionTime2}
                    arrayCondition={arrayCondition}
                />
            </Modal>


        </div >
    );
};

export default SortingVisualizer;


// Sorting Algorithms with Green Highlight for Sorted Elements
/*const bubbleSort = async (arr, setArray, setHighlight, setSorted, setSteps, steps1, delay) => {
    let tempArr = [...arr];
    let sortedIndices = [];
    //let steps = []; // Store initial state
    for (let i = 0; i < tempArr.length - 1; i++) {
        for (let j = 0; j < tempArr.length - 1 - i; j++) {
            setHighlight([j, j + 1]); // Comparing
            await new Promise((resolve) => setTimeout(resolve, delay));

            if (tempArr[j] > tempArr[j + 1]) {
                [tempArr[j], tempArr[j + 1]] = [tempArr[j + 1], tempArr[j]];
                setArray([...tempArr]);
                /*let newSteps = [...steps1];
                newSteps[i] = {
                    pass: i + 1,
                    array: [...tempArr],
                }
                setSteps((prevSteps) => [
                    ...prevSteps,
                    { pass: i + 1, array: [...tempArr] } // ✅ Store each swap step
                ]);
                //setSteps(newSteps); // Store state after each pass

                setHighlight([j, j + 1, "swap"]); // Swapping
                await new Promise((resolve) => setTimeout(resolve, delay*2));
            }
        }
        sortedIndices.push(tempArr.length - 1 - i); // Mark last sorted element
        setSorted([...sortedIndices]);
        //steps.push([...tempArr]); // Store state after each pass

        setSteps((prevSteps) => [
            ...prevSteps,  // Keep previous objects
            { pass: prevSteps.length + 1, array: [...tempArr] } // Add new object
        ]); // ✅ Update steps state after each pass
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
    //setSteps([...steps]); // Ensure final state is stored
    setSorted([...Array(tempArr.length).keys()]); // All elements are sorted
    setHighlight([]);
};*/

//comparisons updated in state only when swapping occurs
/*const bubbleSort = async (arr, setArray, setHighlight, setSorted, setSteps, delay) => {
    let tempArr = [...arr];
    let sortedIndices = [];
    let steps = [{ pass: 1, array: [...tempArr], comparisons:0 }]; // Initialize steps with first pass

    setSteps([...steps]); // Store the initial state

    for (let i = 0; i < tempArr.length - 1; i++) {

        let comparisons = 0; // Track comparisons per pass
        // ✅ Use the same index in setSteps (modify only `array`, not the object itself)
        let passObj = { pass: i + 1, array: [...tempArr], comparisons };

        if (i > 0) {
            // ✅ Add a new passObj only if it's a new pass
            setSteps((prevSteps) => [...prevSteps, passObj]);
        }

        for (let j = 0; j < tempArr.length - 1 - i; j++) {

            setHighlight([j, j + 1]); // Highlight comparison
            await new Promise((resolve) => setTimeout(resolve, delay));
            comparisons++; // Increment comparisons count

            if (tempArr[j] > tempArr[j + 1]) {
                // Swap elements
                [tempArr[j], tempArr[j + 1]] = [tempArr[j + 1], tempArr[j]];
                setArray([...tempArr]); // Update UI (without triggering new render)

                passObj.array = [...tempArr]; // ✅ Update array inside passObj
                passObj.comparisons = comparisons; // Update comparisons count
                // ✅ Update the same index in steps (instead of pushing a new one)
                setSteps((prevSteps) => {
                    let newSteps = [...prevSteps];
                    newSteps[i] = { ...passObj }; // Modify only the current pass
                    return newSteps;
                });

                setHighlight([j, j + 1, "swap"]); // Highlight swap
                await new Promise((resolve) => setTimeout(resolve, delay));


            }
        }

        sortedIndices.push(tempArr.length - 1 - i); // Mark last sorted element
        setSorted([...sortedIndices]);


    }

    setSorted([...Array(tempArr.length).keys()]); // Mark all elements as sorted
    setHighlight([]); // Clear highlighting
};*/

//comparisons are updated in state only when swapping occurs


/*const selectionSort = async (arr, setArray, setHighlight, setSorted, setSteps, delay) => {
    let tempArr = [...arr];
    let sortedIndices = [];
    //let steps = []; // Store initial state
    let steps = [{ pass: 1, array: [...tempArr], comparisons:0 }]; // Initialize steps with first pass
    setSteps([...steps]); // Store the initial state

    for (let i = 0; i < tempArr.length - 1; i++) {
        let comparisons = 0; // Track comparisons per pass
        let passObj = { pass: i + 1, array: [...tempArr], comparisons };

        if (i > 0) {
            // ✅ Add a new passObj only if it's a new pass
            setSteps((prevSteps) => [...prevSteps, passObj]);
        }
        let minIndex = i;
        for (let j = i + 1; j < tempArr.length; j++) {
            setHighlight([minIndex, j]); // Comparing
            await new Promise((resolve) => setTimeout(resolve, delay));
            comparisons++; // Increment comparisons count

            if (tempArr[j] < tempArr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [tempArr[i], tempArr[minIndex]] = [tempArr[minIndex], tempArr[i]];
            setArray([...tempArr]);
            passObj.array = [...tempArr]; // ✅ Update array inside passObj
            passObj.comparisons = comparisons; // Update comparisons count

            // ✅ Update the same index in steps (instead of pushing a new one)
            setSteps((prevSteps) => {
                let newSteps = [...prevSteps];
                newSteps[i] = { ...passObj }; // Modify only the current pass
                return newSteps;
            });
            setHighlight([i, minIndex, "swap"]); // Swapping
            await new Promise((resolve) => setTimeout(resolve, delay));
        }

        sortedIndices.push(i); // Mark sorted elements
        setSorted([...sortedIndices]);

        //setSteps([...steps]); // ✅ Update steps state after each pass
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
    setSorted([...Array(tempArr.length).keys()]); // All elements sorted
    setHighlight([]);
    //setSteps([...steps]); // ✅ Update steps state after each pass
};*/

//insertion sort without comparisons in state
/*const insertionSort = async (arr, setArray, setHighlight, setSorted, setSteps, delay) => {
    let tempArr = [...arr];
    let sortedIndices = [];
    //let steps = []; // Store initial state
    let steps = [{ pass: 1, array: [...tempArr] }]; // Initialize steps with first pass

    setSteps([...steps]); // Store the initial state
    for (let i = 1; i < tempArr.length; i++) {
        let key = tempArr[i];
        let j = i - 1;
        let passObj = { pass: i + 1, array: [...tempArr] };

        if (i > 1) {
            // ✅ Add a new passObj only if it's a new pass
            setSteps((prevSteps) => [...prevSteps, passObj]);
        }
        while (j >= 0 && tempArr[j] > key) {
            setHighlight([j, j + 1]); // Comparing
            await new Promise((resolve) => setTimeout(resolve, delay));

            tempArr[j + 1] = tempArr[j];
            setArray([...tempArr]);
            passObj.array = [...tempArr]; // ✅ Update array inside passObj

            // ✅ Update the same index in steps (instead of pushing a new one)
            setSteps((prevSteps) => {
                let newSteps = [...prevSteps];
                newSteps[i] = { ...passObj }; // Modify only the current pass
                return newSteps;
            });
            setHighlight([j, j + 1, "swap"]); // Swapping
            await new Promise((resolve) => setTimeout(resolve, delay));

            j--;
        }
        tempArr[j + 1] = key;
        setArray([...tempArr]);
        setSteps((prevSteps) => {
            let newSteps = [...prevSteps];
            newSteps[i] = { ...passObj }; // Modify only the current pass
            return newSteps;
        });
        sortedIndices.push(i); // Elements up to i are sorted
        setSorted([...sortedIndices]);
        //steps.push([...tempArr]); // Store state after each pass
        //setSteps([...steps]); // ✅ Update steps state after each pass
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
    setSorted([...Array(tempArr.length).keys()]); // All sorted
    setHighlight([]);
   // setSteps([...steps]); // Ensure final state is stored
};*/



// Generate a new random array
/*const generateArray = () => {
    let newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setArray1([...newArr]);
    setArray2([...newArr]);
    setArray([...newArr]);
    setHighlight1([]);
    setHighlight2([]);
    setSorted1([]);
    setSorted2([]);
    // setSteps1([newArr]); // ✅ Store initial state as an array of arrays
    //setSteps2([newArr]);
    setSteps1([{ pass: 1, array: [...newArr], comparisons: 0 }]); // ✅ Store initial state as an array of arrays
    //setSteps2([newArr]);
    setSteps2([{ pass: 1, array: [...newArr], comparisons: 0 }]);
};*/

/*const generateArray = () => {
    let newArr = [];

    if (!arrayCondition) {
        // ✅ Default to a completely random array
        newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    } else {
        switch (arrayCondition) {
            case "Nearly Sorted":
                newArr = Array.from({ length: 10 }, (_, i) => i + 1);
                for (let i = 0; i < 2; i++) {
                    let idx1 = Math.floor(Math.random() * 10);
                    let idx2 = Math.floor(Math.random() * 10);
                    [newArr[idx1], newArr[idx2]] = [newArr[idx2], newArr[idx1]]; // Swap random elements
                }
                break;

            case "Completely Unsorted":
                newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
                break;

            case "Reverse Sorted":
                newArr = Array.from({ length: 10 }, (_, i) => 10 - i);
                break;

            case "Many Duplicates":
                let possibleValues = [1, 2, 3, 4, 5];
                newArr = Array.from({ length: 10 }, () => possibleValues[Math.floor(Math.random() * possibleValues.length)]);
                break;

            case "Small Array":
                newArr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 50) + 1);
                break;

            case "Large Array":
                newArr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
                break;

            default:
                newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
        }
    }

    setArray1([...newArr]);
    setArray2([...newArr]);
    setArray([...newArr]);
    setHighlight1([]);
    setHighlight2([]);
    setSorted1([]);
    setSorted2([]);
    setSteps1([{ pass: 1, array: [...newArr], comparisons: 0 }]);
    setSteps2([{ pass: 1, array: [...newArr], comparisons: 0 }]);
};*/

//SORTING ALGORUTHMS WITH COMPARISONS IN STATE

/*const bubbleSort = async (arr, setArray, setHighlight, setSorted, setSteps, delay) => {
    let tempArr = [...arr];
    let sortedIndices = [];

    let steps = [{ pass: 1, array: [...tempArr], comparisons: 0, }]; // Initialize first pass
    setSteps([...steps]); // Store the initial state

    for (let i = 0; i < tempArr.length - 1; i++) {
        let comparisons = 0; // Track comparisons per pass
        let passObj = { pass: i + 1, array: [...tempArr], comparisons, };

        if (i > 0) {
            // ✅ Add a new passObj only if it's a new pass
            setSteps((prevSteps) => [...prevSteps, passObj]);
        }

        for (let j = 0; j < tempArr.length - 1 - i; j++) {
            setHighlight([j, j + 1]); // Highlight comparison
            await new Promise((resolve) => setTimeout(resolve, delay));

            comparisons++; // ✅ Increment comparison count

            if (tempArr[j] > tempArr[j + 1]) {
                // Swap elements
                [tempArr[j], tempArr[j + 1]] = [tempArr[j + 1], tempArr[j]];
                setArray([...tempArr]); // Update UI

                passObj.array = [...tempArr]; // ✅ Update array inside passObj
                setHighlight([j, j + 1, "swap"]); // Highlight swap
                await new Promise((resolve) => setTimeout(resolve, delay));
            }

            passObj.comparisons = comparisons; // ✅ Update comparison count

            // ✅ Update steps array in state
            setSteps((prevSteps) => {
                let newSteps = [...prevSteps];
                newSteps[i] = { ...passObj }; // Modify only the current pass
                return newSteps;
            });
        }

        sortedIndices.push(tempArr.length - 1 - i); // Mark last sorted element
        setSorted([...sortedIndices]);
    }

    setSorted([...Array(tempArr.length).keys()]); // Mark all elements as sorted
    setHighlight([]); // Clear highlighting
};*/

/*const selectionSort = async (arr, setArray, setHighlight, setSorted, setSteps, delay) => {
    let tempArr = [...arr];
    let sortedIndices = [];
    let steps = [{ pass: 1, array: [...tempArr], comparisons: 0 }]; // Initialize steps with first pass
    setSteps([...steps]); // Store the initial state

    for (let i = 0; i < tempArr.length - 1; i++) {
        let comparisons = 0; // Track comparisons per pass
        let minIndex = i;
        let passObj = { pass: i + 1, array: [...tempArr], comparisons, };

        if (i > 0) {
            // ✅ Add a new passObj only if it's a new pass
            setSteps((prevSteps) => [...prevSteps, passObj]);
        }

        for (let j = i + 1; j < tempArr.length; j++) {
            setHighlight([minIndex, j]); // Highlight comparison
            await new Promise((resolve) => setTimeout(resolve, delay));

            comparisons++; // ✅ Increment comparisons count
            passObj.comparisons = comparisons; // ✅ Update passObj comparisons

            if (tempArr[j] < tempArr[minIndex]) {
                minIndex = j;
            }

            // ✅ Update steps array in state
            setSteps((prevSteps) => {
                let newSteps = [...prevSteps];
                newSteps[i] = { ...passObj }; // Modify only the current pass
                return newSteps;
            });
        }

        if (minIndex !== i) {
            [tempArr[i], tempArr[minIndex]] = [tempArr[minIndex], tempArr[i]];
            setArray([...tempArr]); // Update UI

            passObj.array = [...tempArr]; // ✅ Update array inside passObj
            setHighlight([i, minIndex, "swap"]); // Highlight swap
            await new Promise((resolve) => setTimeout(resolve, delay));
        }

        // ✅ Ensure passObj stores the final array state & comparisons
        passObj.comparisons = comparisons;
        passObj.array = [...tempArr];

        // ✅ Update steps array in state
        setSteps((prevSteps) => {
            let newSteps = [...prevSteps];
            newSteps[i] = { ...passObj }; // Modify only the current pass
            return newSteps;
        });

        sortedIndices.push(i); // Mark sorted elements
        setSorted([...sortedIndices]);
        await new Promise((resolve) => setTimeout(resolve, delay));
    }

    setSorted([...Array(tempArr.length).keys()]); // All elements sorted
    setHighlight([]); // Clear highlighting
};*/

/*const insertionSort = async (arr, setArray, setHighlight, setSorted, setSteps, delay) => {
    let tempArr = [...arr];
    let sortedIndices = [];
    let steps = [{ pass: 1, array: [...tempArr], comparisons: 0 }]; // Store initial state

    setSteps([...steps]); // Initialize steps
    sortedIndices.push(0); // First element is sorted
    setSorted([...sortedIndices]); // Mark first element as sorted
    await new Promise((resolve) => setTimeout(resolve, delay));
    for (let i = 1; i < tempArr.length; i++) {
        let key = tempArr[i];
        let j = i - 1;
        let comparisons = 0; // Track comparisons per pass
        let passObj = { pass: i, array: [...tempArr], comparisons }; // ✅ Correct pass index

        if (i > 1) {
            // ✅ Store a new pass only at the start of a new pass
            setSteps((prevSteps) => [...prevSteps, passObj]);
        }

        while (j >= 0 && tempArr[j] > key) {
            comparisons++;
            setHighlight([j, j + 1]); // Comparing
            await new Promise((resolve) => setTimeout(resolve, delay));

            tempArr[j + 1] = tempArr[j]; // Shift elements to the right
            setArray([...tempArr]);

            // ✅ Store intermediate step after each shift
            passObj.array = [...tempArr];
            passObj.comparisons = comparisons;
            setSteps((prevSteps) => {
                let newSteps = [...prevSteps];
                newSteps[i - 1] = { ...passObj }; // Update current pass index
                return newSteps;
            });

            setHighlight([j, j + 1, "swap"]); // Swapping
            await new Promise((resolve) => setTimeout(resolve, delay));

            j--;
        }

        tempArr[j + 1] = key; // Place the key at the correct position
        comparisons++; // Increment for the final comparison
        setArray([...tempArr]);

        // ✅ Store final placement of key in steps
        passObj.array = [...tempArr];
        passObj.comparisons = comparisons;
        setSteps((prevSteps) => {
            let newSteps = [...prevSteps];
            newSteps[i - 1] = { ...passObj };
            return newSteps;
        });

        sortedIndices.push(i); // Elements up to i are sorted
        setSorted([...sortedIndices]);

        await new Promise((resolve) => setTimeout(resolve, delay));
    }

    setSorted([...Array(tempArr.length).keys()]); // All sorted
    setHighlight([]);
};*/

