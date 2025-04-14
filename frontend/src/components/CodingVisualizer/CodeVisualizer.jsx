import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";

const defaultCode = `function* mySort(arr) {
  let a = [...arr];
  
  for (let i = 0; i < a.length; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i - 1; j++) {
      yield {
        array: [...a],
        comparing: [j, j + 1],
        i,
        j,
      };
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
        yield {
          array: [...a],
          swapping: [j, j + 1],
          i,
          j,
        };
      }
    }
    yield { array: [...a], passComplete: true };
    if (!swapped) break;
  }
}`;

const initialArray = [5, 1, 4, 2, 8];

const SortingVisualizer = () => {
    const [code, setCode] = useState(defaultCode);
    const [visualArray, setVisualArray] = useState(initialArray);
    const [stepArrays, setStepArrays] = useState([]);
    const [compareIndices, setCompareIndices] = useState([]);
    const [swapIndices, setSwapIndices] = useState([]);
    const [iPointer, setIPointer] = useState(null);
    const [jPointer, setJPointer] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const generatorRef = useRef(null);
    const [arraySize, setArraySize] = useState(initialArray.length);
    const [arrayInput, setArrayInput] = useState(initialArray.join(", "));

    const stepCountRef = useRef(0);
    const maxSteps = 1000; // Set a safe upper limit



    const runGenerator = () => {
        try {
            if (!generatorRef.current) return;

            if (stepCountRef.current >= maxSteps) {
                alert("Execution stopped: too many steps (possible infinite loop).");
                setIsRunning(false);
                return;
            }

            const { value, done } = generatorRef.current.next();
            stepCountRef.current++;

            if (done) {
                setIsRunning(false);
                return;
            }

            if (value.comparing) {
                setCompareIndices(value.comparing);
                setSwapIndices([]);
            } else if (value.swapping) {
                setSwapIndices(value.swapping);
                setCompareIndices([]);
            } else {
                setCompareIndices([]);
                setSwapIndices([]);
            }

            if (value.i !== undefined) setIPointer(value.i);
            if (value.j !== undefined) setJPointer(value.j);

            setVisualArray(value.array);

            if (value.passComplete) {
                setStepArrays((prev) => [...prev, value.array]);
            }

            setTimeout(runGenerator, 400);
        } catch (err) {
            alert("Error during execution: " + err.message);
            setIsRunning(false);
        }
    };

    const handleStop = () => {
        setIsRunning(false);
        generatorRef.current = null;
        stepCountRef.current = 0;
    };


    const handleStart = () => {
        try {
            const match = code.match(/function\*\s*(\w+)/);
            if (!match) return alert("Please define a generator function like `function* mySort(arr) to see the visualization`");

            const funcName = match[1];
            const wrappedCode = `${code}; return ${funcName}([...arr]);`;
            const userFunc = new Function("arr", wrappedCode);

            generatorRef.current = userFunc([...visualArray]);
            stepCountRef.current = 0;

            setStepArrays([]);
            setVisualArray([...visualArray]);


            //setStepArrays([initialArray]);
            //setVisualArray([...initialArray]);
            setCompareIndices([]);
            setSwapIndices([]);
            setIPointer(null);
            setJPointer(null);
            setIsRunning(true);
            runGenerator();
        } catch (err) {
            console.error(err);
            alert("Error in your code: " + err.message);
        }
    };

    const getColor = (idx) => {
        if (swapIndices.includes(idx)) return "bg-red-400 text-white";
        if (compareIndices.includes(idx)) return "bg-yellow-300";
        return "bg-base-200";
    };

    return (
        <div className="h-screen bg-base-100 p-4 sm:p-6 lg:p-8">

            <div className="space-y-8 px-2 sm:px-4 lg:px-8">


                <h1 className="text-2xl font-bold text-center text-primary">🔁 Sorting Visualizer</h1>
                <div className="bg-base-200 rounded-xl shadow-xl">
                    <h2 className="text-xl font-semibold">📝 Input Array</h2>

                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                        <div className="form-control w-full sm:w-40">
                            <label className="label">
                                <span className="label-text">Array Size</span>
                            </label>
                            <input
                                type="number"
                                min={1}
                                className="input input-bordered"
                                value={arraySize}
                                onChange={(e) => setArraySize(Number(e.target.value))}
                            />
                        </div>

                        <div className="form-control flex-grow">
                            <label className="label">
                                <span className="label-text">Elements (comma separated)</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={arrayInput}
                                onChange={(e) => setArrayInput(e.target.value)}
                                placeholder="e.g. 5,1,4,2,8"
                            />
                        </div>

                        <button
                            className="btn btn-success"
                            onClick={() => {
                                const parsed = arrayInput
                                    .split(",")
                                    .map((val) => parseInt(val.trim(), 10))
                                    .filter((val) => !isNaN(val));
                                if (parsed.length !== arraySize) {
                                    alert("Please enter exactly " + arraySize + " valid numbers.");
                                    return;
                                }
                                setVisualArray(parsed);
                                setStepArrays([parsed]);
                            }}
                        >
                            Set Array
                        </button>
                    </div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-[7fr_2fr] gap-10">

                    {/* Code Editor */}
                    <div className="bg-base-200 rounded-xl p-4 shadow-xl">
                        <h2 className="text-2xl font-semibold mb-4">✏️ Algorithm Editor</h2>
                        <div className="w-full h-[300px] overflow-y-auto ">
                            <Editor
                                height="100%"
                                width="100%"
                                language="javascript"
                                theme="vs-dark"
                                value={code}
                                onChange={(value) => setCode(value || "")}
                                options={{ fontSize: 14 }}
                            />
                        </div>
                        <button
                            className="btn btn-primary mt-4 min-w-4 "
                            onClick={handleStart}
                            disabled={isRunning}
                        >
                            {isRunning ? "Running..." : "Start Visualization"}
                        </button>
                        <button
                            className="btn btn-error flex-1"
                            onClick={handleStop}
                            disabled={!isRunning}
                        >
                            Stop Visualization
                        </button>
                    </div>

                    {/* Visualization */}
                    <div className="bg-base-200  h-[500px] overflow-y-auto rounded-xl p-4 shadow-xl">
                        <h2 className="text-2xl font-semibold mb-4">🧠 Visualization</h2>
                        <div className="mb-6">
                            <p className="mb-2 text-base-content/70">🔄 Current Pass</p>
                            <div className="flex gap-2 flex-wrap justify-center">
                                {visualArray.map((num, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-12 h-12 flex items-center justify-center rounded-lg font-semibold shadow ${getColor(idx)}`}
                                    >
                                        {num}
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2 flex-wrap justify-center mt-2">
                                {visualArray.map((_, idx) => (
                                    <div key={idx} className="w-12 text-center text-xs text-base-content">
                                        <div>
                                            {iPointer === idx ? (
                                                <span className="badge badge-outline badge-primary">i</span>
                                            ) : jPointer === idx ? (
                                                <span className="badge badge-outline badge-secondary">j</span>
                                            ) : (
                                                <span className="invisible">-</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h3 className="text-lg font-medium mt-6">✅ Pass Results</h3>
                        <div className="flex flex-col gap-2 mt-2 max-h-[300px] overflow-y-auto pr-2">
                            {stepArrays.map((arr, passIndex) => (
                                <div key={passIndex} className="flex items-center gap-2">
                                    <div className="text-sm text-base-content/50 w-6 text-right">{passIndex + 1}</div>
                                    {arr.map((num, idx) => (
                                        <div
                                            key={idx}
                                            className="w-10 h-10 bg-base-300 flex items-center justify-center rounded-md shadow text-sm font-semibold"
                                        >
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortingVisualizer;
