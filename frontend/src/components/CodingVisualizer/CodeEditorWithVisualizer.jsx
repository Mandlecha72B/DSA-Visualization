//ONLY SORTING ALGORITHMS
/*import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function CodeEditorWithVisualizer() {
    const [allSteps, setAllSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [arraySize, setArraySize] = useState(5);
    const [arrayElements, setArrayElements] = useState(["", "", "", "", ""]);
    const [error,setError] = useState(null);
    
    const editorRef = useRef(null);

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
    }

    async function runUserCode(rawCode) {
        try {
            const parsedArray = arrayElements.map(Number).filter((n) => !isNaN(n));
            if (parsedArray.length !== arraySize) {
                alert("Please enter all array elements as valid numbers.");
                return;
            }

            const match = rawCode.match(/function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(/);
            if (!match) {
                alert("Could not find a valid function declaration in the code.");
                return;
            }

            const functionName = match[1];
            const paramMatch = rawCode.match(new RegExp(`function\\s+${functionName}\\s*\\(.*\\s*,\\s*log\\s*,?`));
            if (!paramMatch) {
                alert('Your function must include "log" as a parameter in order to visualize the steps.');
                return;
            }
            
            setAllSteps([]);
            setCurrentStepIndex(0);
            setIsPlaying(false);

            const response = await axios.post("http://localhost:3000/api/codeVisualizer/instrument", {
                code: rawCode,
            });

            const instrumentedCode = response.data.instrumentedCode;

            const steps = [];
            function log(type, a, b, isSwap, arr, line, operator = null) {
                steps.push({
                    type,
                    a,
                    b,
                    isSwap,
                    arr,
                    line,
                    ...(operator && { operator }), // Only include if defined
                });
            }

             
            // 2. Dynamically build the new Function
            const fn = new Function(
                "arr",
                "log",
                `${instrumentedCode}; return ${functionName}(arr, log);`
            );

            fn(parsedArray, log);

            setAllSteps(steps);
            setIsPlaying(true);
        } catch (error) {
            console.error("Instrumentation error:", error);
        }
    }

    useEffect(() => {
        if (isPlaying && currentStepIndex < allSteps.length) {
            const timeout = setTimeout(() => {
                setCurrentStepIndex((prev) => prev + 1);
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [isPlaying, currentStepIndex, allSteps.length]);

    function resetVisualization() {
        setAllSteps([]);
        setCurrentStepIndex(0);
        setIsPlaying(false);
    }

    return (
        <div className="w-full h-screen bg-base-100 p-6 grid grid-rows-[auto_1fr_auto] gap-6 overflow-hidden">
            {/* Title & Array Inputs *}
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-primary">🔧 Code Editor & Visualizer</h1>

                <div className="bg-base-200 p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-6">
                    <div className="form-control w-full md:w-1/4">
                        <label className="label">
                            <span className="label-text font-semibold">Array Size</span>
                        </label>
                        <input
                            type="number"
                            min={1}
                            className="input input-bordered"
                            value={arraySize}
                            onChange={(e) => {
                                const newSize = parseInt(e.target.value);
                                setArraySize(newSize);
                                setArrayElements(Array(newSize).fill(""));
                            }}
                        />
                    </div>

                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-semibold">Array Elements</span>
                        </label>
                        <div className="flex flex-wrap gap-2 overflow-auto">
                            {arrayElements.map((value, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    className="input input-bordered w-16"
                                    value={value}
                                    onChange={(e) => {
                                        const newArray = [...arrayElements];
                                        newArray[index] = e.target.value;
                                        setArrayElements(newArray);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Editor + Visualizer Grid *}
            <div className="grid grid-cols-1 lg:grid-cols-[7fr_4fr] gap-6 overflow-hidden">
                {/* Editor *}
                <div className="bg-base-200 rounded-xl shadow-lg overflow-hidden flex flex-col">
                    <h2 className="text-xl font-semibold text-primary p-3 border-b border-base-300">📝 Code Editor</h2>
                    <div className="flex-1 overflow-auto">
                        <Editor
                            height="100%"
                            theme="vs-dark"
                            defaultLanguage="javascript"
                            defaultValue={`function sort(arr, log) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
}`}
                            onMount={handleEditorDidMount}
                        />
                    </div>
                </div>

                {/* Visualizer *}
                <div className="bg-base-200 rounded-xl shadow-lg overflow-hidden p-4 flex flex-col">
                    <h2 className="text-xl font-semibold text-secondary mb-3">📊 Visualization Steps</h2>
                    <div className="flex-1 overflow-auto pr-2">
                        {currentStepIndex > 0 ? (
                            <div className="space-y-3">
                                {allSteps.slice(0, currentStepIndex).map((step, index) => (
                                    <div
                                        key={index}
                                        className="bg-base-300 p-3 rounded-lg text-sm shadow-sm"
                                    >
                                        <code className="block">
                                            {step.type === "compare" && `🔍 Compare ${step.a} and ${step.b}`}
                                            {step.type === "check" && `✅ Check if ${step.a} ${step.operator} ${step.b}`}
                                            {step.type === "swap" && `🔄 Swap arr[${step.a}] and arr[${step.b}]`}
                                            {step.type === "set" && (step.isSwap
                                                ? `📝 Set arr[${step.a}] = arr[${step.b}]`
                                                : `📝 Set arr[${step.a}] = ${step.b}`)}

                                            <br />
                                            <span className="text-xs text-gray-400">
                                                Line: {step.line}, Array: {JSON.stringify(step.arr)}
                                            </span>
                                        </code>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 mt-4">Run your code to see the visualization here.</p>
                        )}
                    </div>
                </div>
            </div>
            {error && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h2 className="text-xl font-semibold text-red-600 mb-2">Execution Error</h2>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{error.message}</p>
                        <button
                            className="mt-4 btn btn-error btn-sm"
                            onClick={() => setError(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Buttons *}
            <div className="flex justify-end gap-4">
                <button onClick={resetVisualization} className="btn btn-error px-6">
                    Reset
                </button>
                <button onClick={() => runUserCode(editorRef.current.getValue())} className="btn btn-primary px-6">
                    Run Code
                </button>
            </div>
        </div>
    );
}*/


import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function CodeEditorWithVisualizer() {
    const [allSteps, setAllSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [arraySize, setArraySize] = useState(5);
    const [arrayElements, setArrayElements] = useState(["", "", "", "", ""]);
    const [error, setError] = useState(null);
    const [algorithmType, setAlgorithmType] = useState("sorting"); // State for algorithm selection
    const [searchElement, setSearchElement] = useState(0); // State for search element
    const [editorCode, setEditorCode] = useState("");


    const editorRef = useRef(null);

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
    }

    useEffect(() => {
        if (algorithmType === "sorting") {
            setEditorCode(`function sort(arr, log) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
}`);
        } else if (algorithmType === "searching") {
            setEditorCode(`function search(arr, target, log) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == target) {    
      return i;
    }
  }
  return -1;
}`);
        }
    }, [algorithmType]);



    async function runUserCode(rawCode) {
        try {
            const parsedArray = arrayElements.map(Number).filter((n) => !isNaN(n));
            if (parsedArray.length !== arraySize) {
                alert("Please enter all array elements as valid numbers.");
                return;
            }

            const match = rawCode.match(/function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(/);
            if (!match) {
                alert("Could not find a valid function declaration in the code.");
                return;
            }

            const functionName = match[1];
            const paramMatch = rawCode.match(new RegExp(`function\\s+${functionName}\\s*\\(.*\\s*,\\s*log\\s*,?`));
            if (!paramMatch) {
                alert('Your function must include "log" as a parameter in order to visualize the steps.');
                return;
            }

            setAllSteps([]);
            setCurrentStepIndex(0);
            setIsPlaying(false);

            const response = await axios.post("http://localhost:3000/api/codeVisualizer/instrument", {
                code: rawCode,
                algorithmType
            });

            const instrumentedCode = response.data.instrumentedCode;

            const steps = [];
            function log(type, a, b, isSwap, arr, line, operator = null) {
                steps.push({
                    type,
                    a,
                    b,
                    isSwap,
                    arr,
                    line,
                    ...(operator && { operator }), // Only include if defined
                });
            }


            // 2. Dynamically build the new Function
            if (algorithmType === "sorting") {
                const fn = new Function(
                    "arr",
                    "log",
                    `${instrumentedCode}; return ${functionName}(arr, log);`
                );

                fn(parsedArray, log);

            }
            else if (algorithmType === "searching") {
                const fn = new Function(
                    "arr",
                    "x",
                    "log",
                    `${instrumentedCode}; return ${functionName}(arr, x, log);`
                );

                fn(parsedArray, searchElement, log);
            }

            setAllSteps(steps);
            setIsPlaying(true);
        } catch (error) {
            console.error("Instrumentation error:", error);
        }
    }

    useEffect(() => {
        if (isPlaying && currentStepIndex < allSteps.length) {
            const timeout = setTimeout(() => {
                setCurrentStepIndex((prev) => prev + 1);
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [isPlaying, currentStepIndex, allSteps.length]);

    function resetVisualization() {
        setAllSteps([]);
        setCurrentStepIndex(0);
        setIsPlaying(false);
    }

    return (
        <div className="w-full h-screen bg-base-100 p-6 grid grid-rows-[auto_1fr_auto] gap-6 overflow-hidden">
            {/* Title & Array Inputs */}
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-primary">🔧 Code Editor & Visualizer</h1>
                {/* Algorithm selection */}
                <div className="form-control w-full md:w-1/4">
                    <label className="label">
                        <span className="label-text font-semibold">Algorithm Type</span>
                    </label>
                    <select
                        className="select select-bordered"
                        value={algorithmType}
                        onChange={(e) => setAlgorithmType(e.target.value)}
                    >
                        <option value="sorting">Sorting Algorithms</option>
                        <option value="searching">Searching Algorithms</option>
                    </select>
                </div>

                <div className="flex flex-wrap gap-4 w-full">
                    {/* Array Size */}
                    <div className="form-control w-full md:w-1/4">
                        <label className="label">
                            <span className="label-text font-semibold">Array Size</span>
                        </label>
                        <input
                            type="number"
                            min={1}
                            className="input input-bordered"
                            value={arraySize}
                            onChange={(e) => {
                                const newSize = parseInt(e.target.value);
                                setArraySize(newSize);
                                setArrayElements(Array(newSize).fill(""));
                            }}
                        />
                    </div>

                    {/* Array Elements */}
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-semibold">Array Elements</span>
                        </label>
                        <div className="flex flex-wrap gap-2 overflow-auto">
                            {arrayElements.map((value, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    className="input input-bordered w-16"
                                    value={value}
                                    onChange={(e) => {
                                        const newArray = [...arrayElements];
                                        newArray[index] = e.target.value;
                                        setArrayElements(newArray);
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Conditional input for Searching Algorithm */}
                    {algorithmType === "searching" && (
                        <div className="form-control w-full md:w-1/4">
                            <label className="label">
                                <span className="label-text font-semibold">Element to Search</span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered"
                                value={searchElement}
                                onChange={(e) => setSearchElement(Number(e.target.value))}
                            />
                        </div>
                    )}

                </div>
            </div>


            {/* Editor + Visualizer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[7fr_4fr] gap-6 overflow-hidden">
                {/* Editor */}
                <div className="bg-base-200 rounded-xl shadow-lg overflow-hidden flex flex-col">
                    <h2 className="text-xl font-semibold text-primary p-3 border-b border-base-300">📝 Code Editor</h2>
                    <div className="flex-1 overflow-auto">
                        <Editor
                            height="100%"
                            theme="vs-dark"
                            defaultLanguage="javascript"
                            value={editorCode}
                            onMount={handleEditorDidMount}
                        />
                    </div>
                </div>

                {/* Visualizer */}
                <div className="bg-base-200 rounded-xl shadow-lg overflow-hidden p-4 flex flex-col">
                    <h2 className="text-xl font-semibold text-secondary mb-3">📊 Visualization Steps</h2>
                    <div className="flex-1 overflow-auto pr-2">
                        {currentStepIndex > 0 ? (
                            <div className="space-y-3">
                                {allSteps.slice(0, currentStepIndex).map((step, index) => (
                                    <div
                                        key={index}
                                        className="bg-base-300 p-3 rounded-lg text-sm shadow-sm"
                                    >
                                        <code className="block">
                                            {step.type === "compare" && `🔍 Compare ${step.a} and ${step.b}`}
                                            {step.type === "check" && `✅ Check if ${step.a} ${step.operator} ${step.b}`}
                                            {step.type === "swap" && `🔄 Swap arr[${step.a}] and arr[${step.b}]`}
                                            {step.type === "set" && (step.isSwap
                                                ? `📝 Set arr[${step.a}] = arr[${step.b}]`
                                                : `📝 Set arr[${step.a}] = ${step.b}`)}
                                            {step.type === "found" && `🎯 Found ${step.a} at index ${step.b}`}
                                            {step.type === "notFound" && `❌ ${step.a} not found in array`}
                                            {step.type === "setVar" && `📌 Set ${step.a} = ${step.b}`}
                                           

                                            <br />
                                            <span className="text-xs text-gray-400">
                                                Line: {step.line}, Array: {JSON.stringify(step.arr)}
                                            </span>
                                        </code>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 mt-4">Run your code to see the visualization here.</p>
                        )}
                    </div>
                </div>
            </div>
            {error && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h2 className="text-xl font-semibold text-red-600 mb-2">Execution Error</h2>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{error.message}</p>
                        <button
                            className="mt-4 btn btn-error btn-sm"
                            onClick={() => setError(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-4">
                <button onClick={resetVisualization} className="btn btn-error px-6">
                    Reset
                </button>
                <button onClick={() => runUserCode(editorRef.current.getValue())} className="btn btn-primary px-6">
                    Run Code
                </button>
            </div>
        </div>
    );
}

// {step.type === "recursiveCall" && `🔁 Recursive call to ${step.a}(${step.b.map(v => JSON.stringify(v)).join(", ")})`}


/*import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function CodeEditorWithVisualizer() {
    const [allSteps, setAllSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const editorRef = useRef(null);

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
    }

    async function runUserCode(rawCode) {
        try {
            setAllSteps([]);
            setCurrentStepIndex(0);
            setIsPlaying(false);

            const response = await axios.post("http://localhost:3000/api/codeVisualizer/instrument", {
                code: rawCode,
            });

            const instrumentedCode = response.data.instrumentedCode;

            const steps = [];
            const log = (type, a, b, arr, line) => {
                steps.push({ type, a, b, arr: [...arr], line });
            };

            const fn = new Function("arr", "log", `${instrumentedCode}; return sort(arr, log);`);
            fn([5, 3, 2, 8, 1], log);

            setAllSteps(steps);
            setIsPlaying(true);
        } catch (error) {
            console.error("Instrumentation error:", error);
        }
    }

    // Step-by-step animation effect
    useEffect(() => {
        if (isPlaying && currentStepIndex < allSteps.length) {
            const timeout = setTimeout(() => {
                setCurrentStepIndex((prev) => prev + 1);
            }, 600); // ⏱️ Delay between steps (ms)
            return () => clearTimeout(timeout);
        }
    }, [isPlaying, currentStepIndex, allSteps.length]);

    function resetVisualization() {
        setAllSteps([]);
        setCurrentStepIndex(0);
        setIsPlaying(false);
    }

    return (
        <div className="w-full h-screen bg-base-100 p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-primary">Code Editor & Visualizer</h1>
                <div className="flex gap-3">
                    <button
                        onClick={() => runUserCode(editorRef.current.getValue())}
                        className="btn btn-primary shadow-md"
                    >
                        Run Code
                    </button>
                    <button
                        onClick={resetVisualization}
                        className="btn btn-error shadow-md"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4">
                {/* Editor }
                <div className="w-full md:w-1/2 h-[75vh] bg-base-200 rounded-xl shadow-lg overflow-hidden">
                    <Editor
                        height="100%"
                        theme="vs-dark"
                        defaultLanguage="javascript"
                        defaultValue={`function sort(arr, log) {
  for (let i = 0; i < arr.length-1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`}
                        onMount={handleEditorDidMount}
                    />
                </div>

                {/* Visualizer }
                <div className="w-full md:w-1/2 h-[75vh] bg-white dark:bg-base-200 rounded-xl shadow-lg overflow-y-auto p-4">
                    <h2 className="text-lg font-semibold mb-3 text-secondary">Visualization Steps</h2>
                    {currentStepIndex > 0 ? (
                        <div className="space-y-2">
                            {allSteps.slice(0, currentStepIndex).map((step, index) => (
                                <div
                                    key={index}
                                    className="bg-base-300 p-3 rounded-lg text-sm shadow-sm"
                                >
                                    <code className="block">
                                        {step.type === "compare"
                                            ? `🔍 Compare ${step.a} and ${step.b}`
                                            : `🔄 Swap ${step.a} and ${step.b}`}<br />
                                        <span className="text-xs text-gray-400">Array: {JSON.stringify(step.arr)}</span>
                                    </code>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Run your code to see the visualization here.</p>
                    )}
                </div>
            </div>
        </div>
    );
}*/

//IMPROVED LAYOUT WITH ARRAY USER INPUT
/*import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function CodeEditorWithVisualizer() {
    const [allSteps, setAllSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [arraySize, setArraySize] = useState(5);
    const [arrayElements, setArrayElements] = useState(["", "", "", "", ""]);
    const editorRef = useRef(null);

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
    }

    async function runUserCode(rawCode) {
        try {
            const parsedArray = arrayElements.map(Number).filter((n) => !isNaN(n));
            if (parsedArray.length !== arraySize) {
                alert("Please enter all array elements as valid numbers.");
                return;
            }

            setAllSteps([]);
            setCurrentStepIndex(0);
            setIsPlaying(false);

            const response = await axios.post("http://localhost:3000/api/codeVisualizer/instrument", {
                code: rawCode,
            });

            const instrumentedCode = response.data.instrumentedCode;

            const steps = [];
            const log = (type, a, b, arr, line) => {
                steps.push({ type, a, b, arr: [...arr], line });
            };

            const fn = new Function("arr", "log", `${instrumentedCode}; return sort(arr, log);`);
            fn(parsedArray, log);

            setAllSteps(steps);
            setIsPlaying(true);
        } catch (error) {
            console.error("Instrumentation error:", error);
        }
    }

    useEffect(() => {
        if (isPlaying && currentStepIndex < allSteps.length) {
            const timeout = setTimeout(() => {
                setCurrentStepIndex((prev) => prev + 1);
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [isPlaying, currentStepIndex, allSteps.length]);

    function resetVisualization() {
        setAllSteps([]);
        setCurrentStepIndex(0);
        setIsPlaying(false);
    }

    return (
        <div className="w-full h-screen bg-base-100 p-6 grid grid-rows-[auto_1fr_auto] gap-6 overflow-hidden">
            {/* Title & Array Inputs }
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-primary">🔧 Code Editor & Visualizer</h1>

                <div className="bg-base-200 p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-6">
                    <div className="form-control w-full md:w-1/4">
                        <label className="label">
                            <span className="label-text font-semibold">Array Size</span>
                        </label>
                        <input
                            type="number"
                            min={1}
                            className="input input-bordered"
                            value={arraySize}
                            onChange={(e) => {
                                const newSize = parseInt(e.target.value);
                                setArraySize(newSize);
                                setArrayElements(Array(newSize).fill(""));
                            }}
                        />
                    </div>

                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-semibold">Array Elements</span>
                        </label>
                        <div className="flex flex-wrap gap-2 overflow-auto">
                            {arrayElements.map((value, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    className="input input-bordered w-16"
                                    value={value}
                                    onChange={(e) => {
                                        const newArray = [...arrayElements];
                                        newArray[index] = e.target.value;
                                        setArrayElements(newArray);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Editor + Visualizer Grid }
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
                {/* Editor }
                <div className="bg-base-200 rounded-xl shadow-lg overflow-hidden flex flex-col">
                    <h2 className="text-xl font-semibold text-primary p-3 border-b border-base-300">📝 Code Editor</h2>
                    <div className="flex-1 overflow-auto">
                        <Editor
                            height="100%"
                            theme="vs-dark"
                            defaultLanguage="javascript"
                            defaultValue={`function sort(arr, log) {
  for (let i = 0; i < arr.length-1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`}
                            onMount={handleEditorDidMount}
                        />
                    </div>
                </div>

                {/* Visualizer }
                <div className="bg-base-200 rounded-xl shadow-lg overflow-hidden p-4 flex flex-col">
                    <h2 className="text-xl font-semibold text-secondary mb-3">📊 Visualization Steps</h2>
                    <div className="flex-1 overflow-auto pr-2">
                        {currentStepIndex > 0 ? (
                            <div className="space-y-3">
                                {allSteps.slice(0, currentStepIndex).map((step, index) => (
                                    <div
                                        key={index}
                                        className="bg-base-300 p-3 rounded-lg text-sm shadow-sm"
                                    >
                                        <code className="block">
                                            {step.type === "compare"
                                                ? `🔍 Compare ${step.a} and ${step.b}`
                                                : `🔄 Swap ${step.a} and ${step.b}`}
                                            <br />
                                            <span className="text-xs text-gray-400">
                                                Array: {JSON.stringify(step.arr)}
                                            </span>
                                        </code>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 mt-4">Run your code to see the visualization here.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Buttons }
            <div className="flex justify-end gap-4">
                <button onClick={resetVisualization} className="btn btn-error px-6">
                    Reset
                </button>
                <button onClick={() => runUserCode(editorRef.current.getValue())} className="btn btn-primary px-6">
                    Run Code
                </button>
            </div>
        </div>

    );
}*/

/*async function runUserCode(rawCode) {
        try {
            const parsedArray = arrayElements.map(Number).filter((n) => !isNaN(n));
            if (parsedArray.length !== arraySize) {
                alert("Please enter all array elements as valid numbers.");
                return;
            }

            setAllSteps([]);
            setCurrentStepIndex(0);
            setIsPlaying(false);

            const response = await axios.post("http://localhost:3000/api/codeVisualizer/instrument", {
                code: rawCode,
            });

            const instrumentedCode = response.data.instrumentedCode;

            const steps = [];
            const log = (type, a, b, isSwap, arr, line) => {
                steps.push({ type, a, b, isSwap, arr: [...arr], line });
            };

            // Timeout-based execution
            const runWithTimeout = (code, arr, log, timeout = 3000) => {
                const wrappedCode = `
                new Promise((resolve, reject) => {
                    try {
                        const result = (function() {
                            ${code}
                            return sort([...arr], log);
                        })();
                        resolve(result);
                    } catch (err) {
                        reject(err);
                    }
                });
            `;

                const codePromise = new Function("arr", "log", `return ${wrappedCode}`)(arr, log);
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("⏱ Execution timed out. Possible infinite loop.")), timeout)
                );

                return Promise.race([codePromise, timeoutPromise]);
            };

            await runWithTimeout(instrumentedCode, parsedArray, log);

            setAllSteps(steps);
            setIsPlaying(true);
        } catch (error) {
            console.error("Instrumentation error:", error);
            setError(error); // Use this to show error in a modal
        }
    }*/

