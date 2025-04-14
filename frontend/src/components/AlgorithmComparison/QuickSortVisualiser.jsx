/*import React, { useEffect, useState } from "react";

// Helper to create a deep clone of nested structure
/*const cloneStructure = (structure) => structure.map(row => [...row]);



// 🟡 Set background color based on current highlight type
const getBackground = (i, highlight) => {
    if (!highlight || !highlight.indices.includes(i)) return "bg-gray-200";
    if (highlight.type === "pivot") return "bg-yellow-400";
    if (highlight.type === "compare") return "bg-blue-400";
    if (highlight.type === "swap") return "bg-red-400";
    if (highlight.type === "sorted") return "bg-green-500";
    return "bg-gray-200";
};

const QuickSortVisualizer = ({ array }) => {
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const arr = [...array];
        const stepList = [];
        simulateQuickSort(arr, 0, arr.length - 1, stepList, 0);
        setSteps(stepList);
        setCurrentStep(0);
    }, [array]);

    useEffect(() => {
        if (currentStep >= steps.length) return;

        const timer = setTimeout(() => {
            setCurrentStep((prev) => prev + 1);
        }, 700);

        return () => clearTimeout(timer);
    }, [currentStep, steps]);

    // render current visible state
    return (
        <div className="mt-8 flex flex-col items-center space-y-6">
            {steps
                .filter((step, index) => index <= currentStep)
                .map((step, index) => (
                    <div key={index} className="flex gap-2 flex-wrap">
                        {step.array.map((num, i) => {
                            const bg = getBackground(i, step.highlight);
                            return (
                                <div
                                    key={i}
                                    className={`w-12 h-12 flex items-center justify-center rounded text-black font-semibold text-lg transition-all duration-300 ${bg}`}
                                >
                                    {num}
                                </div>
                            );
                        })}
                    </div>
                ))}
        </div>
    );
};

export default QuickSortVisualizer;


// Visual recursive quick sort logic
const simulateQuickSort = (arr, low, high, steps, level) => {
    if (low >= high) {
        if (low === high) {
            steps.push({
                array: arr.slice(low, high + 1),
                highlight: { type: "sorted", indices: [0] },
            });
        }
        return;
    }

    const pivotIndex = high;
    const pivotVal = arr[pivotIndex];
    let i = low - 1;

    // Show initial pivot
    steps.push({
        array: arr.slice(low, high + 1),
        highlight: { type: "pivot", indices: [pivotIndex - low] },
    });

    for (let j = low; j < high; j++) {
        // Compare step
        steps.push({
            array: arr.slice(low, high + 1),
            highlight: { type: "compare", indices: [j - low, pivotIndex - low] },
        });

        if (arr[j] < pivotVal) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];

            // Swap step
            steps.push({
                array: arr.slice(low, high + 1),
                highlight: { type: "swap", indices: [i - low, j - low] },
            });
        }
    }

    // Final pivot swap
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    steps.push({
        array: arr.slice(low, high + 1),
        highlight: { type: "swap", indices: [i + 1 - low, pivotIndex - low] },
    });

    // Sorted position highlight
    steps.push({
        array: arr.slice(low, high + 1),
        highlight: { type: "sorted", indices: [i + 1 - low] },
    });

    const pi = i + 1;

    // Recursively visualize left and right, now as separate rows
    simulateQuickSort(arr, low, pi - 1, steps, level + 1);
    simulateQuickSort(arr, pi + 1, high, steps, level + 1);
};*/


/*import QuickSortTreeNode from "./QuickSortTreeNode";

const QuickSortVisualizer = ({ array }) => {
    const [tree, setTree] = useState(null);

    useEffect(() => {
        const arr = [...array];
        const tree = buildQuickSortTree(arr, 0, arr.length - 1);
        setTree(tree);
    }, [array]);

    return (
        <div className="mt-6">
            <QuickSortTreeNode node={tree} />
        </div>
    );
};

export default QuickSortVisualizer;

const buildQuickSortTree = (arr, low, high) => {
    if (low > high) return null;
    if (low === high) {
        return {
            array: [arr[low]],
            highlight: { type: "sorted", indices: [0] },
            left: null,
            right: null
        };
    }

    const pivot = arr[high];
    const currentArray = arr.slice(low, high + 1);

    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    const pivotIndex = i + 1;

    return {
        array: currentArray,
        highlight: { type: "pivot", indices: [pivotIndex - low] },
        left: buildQuickSortTree(arr, low, pivotIndex - 1),
        right: buildQuickSortTree(arr, pivotIndex + 1, high)
    };
};*/



/*import React, { useEffect, useState } from "react";
import { getQuickSortSteps } from "./utils/QuickSort"; // from above

const QuickSortVisualizer = ({ array }) => {

    function getColor(index, highlights) {
        if (highlights?.sorted?.includes(index)) return "bg-green-500";
        if (highlights?.swapping?.includes(index)) return "bg-red-400";
        if (highlights?.comparing?.includes(index)) return "bg-yellow-400";
        if (index === highlights?.pivot) return "bg-purple-500";
        return "bg-blue-600";
    }
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const quickSteps = getQuickSortSteps(array);
        setSteps(quickSteps);
        setCurrentStep(0);

        let i = 0;
        const interval = setInterval(() => {
            if (i >= quickSteps.length) {
                clearInterval(interval);
                return;
            }
            setCurrentStep(i);
            i++;
        }, 1000); // adjust delay for speed

        return () => clearInterval(interval);
    }, [array]);

    const step = steps[currentStep];

    return (
        <div className="flex justify-center gap-2 mt-6">
            {step?.array.map((num, idx) => (
                <span
                    key={idx}
                    className={`p-3 rounded text-white font-bold ${getColor(idx, step.highlights)}`}
                >
                    {num}
                </span>
            ))}
        </div>
    );
};

export default QuickSortVisualizer;*/

/*import React, { useEffect, useState } from "react";
import { getQuickSortSteps } from "./utils/QuickSort";

const QuickSortVisualizer = ({ array }) => {
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        const quickSteps = getQuickSortSteps(array);
        setSteps(quickSteps);
    }, [array]);

    const getColor = (index, highlights) => {
        if (highlights?.sorted?.includes(index)) return "bg-green-500";
        if (highlights?.swapping?.includes(index)) return "bg-red-400";
        if (highlights?.comparing?.includes(index)) return "bg-yellow-400";
        if (index === highlights?.pivot) return "bg-purple-500";
        return "bg-blue-600";
    };

    const groupedByDepth = steps.reduce((acc, step) => {
        const { depth, side } = step;
        if (!acc[depth]) acc[depth] = { left: [], right: [], root: [] };
        acc[depth][side].push(step);
        return acc;
    }, {});

    return (
        <div className="flex flex-col items-center gap-6 mt-10">
            {Object.entries(groupedByDepth).map(([depth, sides], dIdx) => (
                <div key={dIdx} className="w-full flex justify-center gap-16">
                    {["left", "root", "right"].map((side) => (
                        <div key={side} className="flex flex-col items-center gap-3">
                            {sides[side].map((step, sIdx) => (
                                <div key={sIdx} className="flex gap-2">
                                    {step.array.map((val, i) => (
                                        <span
                                            key={i}
                                            className={`px-3 py-2 text-white font-bold rounded ${getColor(i, step.highlights)}`}
                                        >
                                            {val}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default QuickSortVisualizer;*/

/*import React, { useEffect, useState } from "react";
import { getQuickSortRecursiveSteps } from "./utils/QuickSort";


const ArrayNode = ({ stepGroup, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showChildren, setShowChildren] = useState(false);
    const [childrenDone, setChildrenDone] = useState({ left: false, right: false });


    const step = stepGroup?.steps?.[currentStep];

    const getColor = (index, highlights) => {
        if (highlights?.sorted?.includes(index)) return "bg-green-500";
        if (highlights?.swapping?.includes(index)) return "bg-red-400";
        if (highlights?.comparing?.includes(index)) return "bg-yellow-400";
        if (index === highlights?.pivot) return "bg-purple-500";
        return "bg-blue-600";
    };

    const getPointers = (index) => {
        const pointers = [];
        if (index === step?.highlights?.low) pointers.push("L");
        if (index === step?.highlights?.high) pointers.push("H");
        if (index === step?.highlights?.pivot) pointers.push("P");
        return pointers.join(", ");
    };

    useEffect(() => {
        if (!stepGroup?.steps?.length) {
            setShowChildren(true);
            return;
        }

        let i = 0;
        const interval = setInterval(() => {
            if (i >= stepGroup.steps.length) {
                clearInterval(interval);
                setShowChildren(true);
                return;
            }
            setCurrentStep(i);
            i++;
        }, 800);

        return () => clearInterval(interval);
    }, [stepGroup]);

    useEffect(() => {
        if (showChildren && (!stepGroup.left && !stepGroup.right)) {
            onComplete?.();
        }
    }, [showChildren]);

    useEffect(() => {
        if (
            showChildren &&
            (stepGroup.left ? childrenDone.left : true) &&
            (stepGroup.right ? childrenDone.right : true)
        ) {
            onComplete?.();
        }
    }, [childrenDone, showChildren]);

    return (
        <div className="flex flex-col items-center mt-6">
            {/* Main Array }
            <div className="flex gap-2 justify-center">
                {step?.array?.map((num, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <span className={`p-3 rounded text-white font-bold ${getColor(idx, step?.highlights)}`}>
                            {num}
                        </span>
                        <span className="text-xs text-gray-400 mt-1 h-4">{getPointers(idx)}</span>
                    </div>
                ))}
            </div>

            {/* Subarrays }
            {showChildren && (
                <div className="flex justify-between w-full mt-4 gap-10">
                    {stepGroup.left && (
                        <ArrayNode
                            stepGroup={stepGroup.left}
                            onComplete={() => setChildrenDone(prev => ({ ...prev, left: true }))}
                        />
                    )}
                    {stepGroup.right && (
                        <ArrayNode
                            stepGroup={stepGroup.right}
                            onComplete={() => setChildrenDone(prev => ({ ...prev, right: true }))}
                        />
                    )}
                </div>
            )}
        </div>
    );
};


const QuickSortVisualizer = ({ array }) => {
    const [treeSteps, setTreeSteps] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [executionTime, setExecutionTime] = useState(0);

    useEffect(() => {
        const { steps, executionTime } = getQuickSortRecursiveSteps(array);
        setExecutionTime(executionTime);
        setTreeSteps(steps?.[0]);
        setIsCompleted(false);
    }, [array]);

    return (
        <div className="p-6">
            {treeSteps && (
                <ArrayNode
                    stepGroup={treeSteps}
                    onComplete={() => setIsCompleted(true)}
                />
            )}

            {isCompleted && (
                <div className="mt-8 text-center">
                    <h3 className="text-lg font-bold text-green-400">Final Sorted Array:</h3>
                    <div className="flex justify-center gap-2 mt-2">
                        {array
                            .slice()
                            .sort((a, b) => a - b)
                            .map((num, idx) => (
                                <span key={idx} className="p-3 bg-green-500 rounded text-white font-bold">
                                    {num}
                                </span>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuickSortVisualizer;*/

/*import React, { useEffect, useState } from "react";
import { getQuickSortRecursiveSteps } from "./utils/QuickSort";

const ArrayNode = ({ stepGroup, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showChildren, setShowChildren] = useState(false);
    const [childrenDone, setChildrenDone] = useState({ left: false, right: false });

    const step = stepGroup?.steps?.[currentStep];

    const getColor = (index, highlights) => {
        if (highlights?.sorted?.includes(index)) return "bg-green-500";
        if (highlights?.swapping?.includes(index)) return "bg-red-400";
        if (highlights?.comparing?.includes(index)) return "bg-yellow-400";
        if (index === highlights?.pivot) return "bg-purple-500";
        return "bg-blue-600";
    };

    const getPointers = (index) => {
        const pointers = [];
        if (index === step?.highlights?.low) pointers.push("L");
        if (index === step?.highlights?.high) pointers.push("H");
        if (index === step?.highlights?.pivot) pointers.push("P");
        return pointers.join(", ");
    };

    useEffect(() => {
        if (!stepGroup?.steps?.length) {
            setShowChildren(true);
            return;
        }

        let i = 0;
        const interval = setInterval(() => {
            if (i >= stepGroup.steps.length) {
                clearInterval(interval);
                setShowChildren(true);
                return;
            }
            setCurrentStep(i);
            i++;
        }, 800);

        return () => clearInterval(interval);
    }, [stepGroup]);

    useEffect(() => {
        if (showChildren && (!stepGroup.left && !stepGroup.right)) {
            onComplete?.();
        }
    }, [showChildren]);

    useEffect(() => {
        if (
            showChildren &&
            (stepGroup.left ? childrenDone.left : true) &&
            (stepGroup.right ? childrenDone.right : true)
        ) {
            onComplete?.();
        }
    }, [childrenDone, showChildren]);

    return (
        <div className="flex flex-col items-center mt-4">
            {/* Main Array }
            <div className="flex gap-2 justify-center flex-wrap">
                {step?.array?.map((num, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <span className={`p-2 rounded text-white font-bold ${getColor(idx, step?.highlights)}`}>
                            {num}
                        </span>
                        <span className="text-xs text-gray-400 mt-1 h-4">{getPointers(idx)}</span>
                    </div>
                ))}
            </div>

            {/* Subarrays }
            {showChildren && (
                <div className="flex justify-between w-full mt-4 gap-10">
                    {stepGroup.left && (
                        <ArrayNode
                            stepGroup={stepGroup.left}
                            onComplete={() => setChildrenDone(prev => ({ ...prev, left: true }))}
                        />
                    )}
                    {stepGroup.right && (
                        <ArrayNode
                            stepGroup={stepGroup.right}
                            onComplete={() => setChildrenDone(prev => ({ ...prev, right: true }))}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

const QuickSortVisualizer = ({ array }) => {
    const [treeSteps, setTreeSteps] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [executionTime, setExecutionTime] = useState(0);

    useEffect(() => {
        const { steps, executionTime } = getQuickSortRecursiveSteps(array);
        setExecutionTime(executionTime);
        setTreeSteps(steps?.[0]);
        setIsCompleted(false);
    }, [array]);

    return (
        <div className="overflow-x-auto max-h-[280px]">
            {treeSteps && (
                <ArrayNode
                    stepGroup={treeSteps}
                    onComplete={() => setIsCompleted(true)}
                />
            )}

            {isCompleted && (
                <div className="mt-6 text-center">
                    <h4 className="text-sm font-semibold text-green-400">Final Sorted Array</h4>
                    <div className="flex justify-center flex-wrap gap-2 mt-2">
                        {array
                            .slice()
                            .sort((a, b) => a - b)
                            .map((num, idx) => (
                                <span key={idx} className="p-2 bg-green-500 rounded text-white font-bold">
                                    {num}
                                </span>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuickSortVisualizer;*/

import React, { useEffect, useState } from "react";


const ArrayNode = ({ stepGroup, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showChildren, setShowChildren] = useState(false);
    const [childrenDone, setChildrenDone] = useState({ left: false, right: false });

    const step = stepGroup?.steps?.[currentStep];

    const getColor = (index, highlights) => {
        if (highlights?.sorted?.includes(index)) return "bg-green-500";
        if (highlights?.swapping?.includes(index)) return "bg-red-400";
        if (highlights?.comparing?.includes(index)) return "bg-yellow-400";
        if (index === highlights?.pivot) return "bg-purple-500";
        return "bg-blue-600";
    };

    const getPointers = (index) => {
        const pointers = [];
        if (index === step?.highlights?.low) pointers.push("L");
        if (index === step?.highlights?.high) pointers.push("H");
        if (index === step?.highlights?.pivot) pointers.push("P");
        return pointers.join(", ");
    };

    useEffect(() => {
        if (!stepGroup?.steps?.length) {
            setShowChildren(true);
            return;
        }

        let i = 0;
        const interval = setInterval(() => {
            if (i >= stepGroup.steps.length) {
                clearInterval(interval);
                setShowChildren(true);
                return;
            }
            setCurrentStep(i);
            i++;
        }, 800);

        return () => clearInterval(interval);
    }, [stepGroup]);

    useEffect(() => {
        if (showChildren && (!stepGroup.left && !stepGroup.right)) {
            onComplete?.();
        }
    }, [showChildren]);

    useEffect(() => {
        if (
            showChildren &&
            (stepGroup.left ? childrenDone.left : true) &&
            (stepGroup.right ? childrenDone.right : true)
        ) {
            onComplete?.();
        }
    }, [childrenDone, showChildren]);

    return (
        <div className="flex flex-col items-center mt-4">
            {/* Main Array */}
            <div className="flex gap-2 justify-center flex-wrap">
                {step?.array?.map((num, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <span className={`p-2 rounded text-white font-bold ${getColor(idx, step?.highlights)}`}>
                            {num}
                        </span>
                        <span className="text-xs text-gray-400 mt-1 h-4">{getPointers(idx)}</span>
                    </div>
                ))}
            </div>

            {/* Subarrays */}
            {showChildren && (
                <div className="flex justify-between w-full mt-4 gap-10">
                    {stepGroup.left && (
                        <ArrayNode
                            stepGroup={stepGroup.left}
                            onComplete={() => setChildrenDone(prev => ({ ...prev, left: true }))}
                        />
                    )}
                    {stepGroup.right && (
                        <ArrayNode
                            stepGroup={stepGroup.right}
                            onComplete={() => setChildrenDone(prev => ({ ...prev, right: true }))}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

const QuickSortVisualizer = ({ steps, array, sorting }) => {  
    const [treeSteps, setTreeSteps] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        // Reset tree before assigning new one
        setTreeSteps(null); // Clear old tree (forces unmount)
        setIsCompleted(false); // Reset completion state

        // Slight delay to allow unmount (ensures full reset)
       
            if (steps && sorting) {
                setTreeSteps(steps[0]);
                setIsCompleted(false);
            }
       

        
    }, [steps, array]);
    return (
        <div className="max-h-[300px]">
            {treeSteps && (
                <ArrayNode
                    stepGroup={treeSteps}
                    onComplete={() => setIsCompleted(true)}
                />
            )}

            {isCompleted && (
                <div className="mt-6 text-center">
                    <h4 className="text-sm font-semibold text-green-400">Final Sorted Array</h4>
                    <div className="flex justify-center flex-wrap gap-2 mt-2">
                        {array
                            .slice()
                            .sort((a, b) => a - b)
                            .map((num, idx) => (
                                <span key={idx} className="p-2 bg-green-500 rounded text-white font-bold">
                                    {num}
                                </span>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuickSortVisualizer;













