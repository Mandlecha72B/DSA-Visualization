
/*import React, { useEffect, useState } from 'react';
import { getMergeSortSteps } from './utils/MergeSort';

const MergeSortVisualizer = ({ array }) => {
    const [treeSteps, setTreeSteps] = useState(null);
    const [executionTime, setExecutionTime] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [showMerge, setShowMerge] = useState(false);

    useEffect(() => {
        const { treeSteps, executionTime, maxDepth } = getMergeSortSteps(array);
        setTreeSteps(treeSteps);
        setExecutionTime(executionTime);

        let level = 0;
        const interval = setInterval(() => {
            level++;
            setCurrentLevel(level);
            if (level > maxDepth) {
                clearInterval(interval);
                setTimeout(() => setShowMerge(true), 800);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [array]);

    return (
        <div className="max-h-[300px]">
            {treeSteps && (
                <ArrayNode
                    node={treeSteps}
                    level={0}
                    currentLevel={currentLevel}
                    showMerge={showMerge}
                />
            )}
            
        </div>
    );
};

const ArrayNode = ({ node, level, currentLevel, showMerge }) => {
    const [mergeIndex, setMergeIndex] = useState(0);

    useEffect(() => {
        if (showMerge && node.mergeSteps.length > 0) {
            let i = 0;
            const interval = setInterval(() => {
                if (i < node.mergeSteps.length) {
                    setMergeIndex(i + 1);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 800);
            return () => clearInterval(interval);
        }
    }, [showMerge]);

    const currentStep = node.mergeSteps?.[mergeIndex - 1];
    const isVisible = level <= currentLevel;

    const getColor = (idx, node) => {
        if (currentStep?.highlights?.merging?.includes(idx)) return 'bg-green-500';
        if (currentStep?.highlights?.comparing?.includes(idx)) return 'bg-yellow-400';
        if (showMerge && node.array.length === 1 && node.mergeSteps.length === 0) return 'bg-green-500';
        return 'bg-blue-600';
    };

    if (!isVisible) return null;

    const displayedArray = currentStep?.array || node.original;

    return (
        <div className="flex flex-col items-center mt-4">
            {/* Array Elements }
            <div className="flex gap-2 bg-base-100 p-3 shadow-lg rounded-md">
                {displayedArray.map((val, idx) => (
                    <span
                        key={idx}
                        className={`p-2 text-white font-bold rounded ${getColor(idx, node)}`}
                    >
                        {val}
                    </span>
                ))}
            </div>

           

            {/* Children Subarrays }
            {node.left && node.right && (
                <div className="flex gap-10 mt-4 w-full justify-center">
                    <ArrayNode node={node.left} level={level + 1} currentLevel={currentLevel} showMerge={showMerge} />
                    <ArrayNode node={node.right} level={level + 1} currentLevel={currentLevel} showMerge={showMerge} />
                </div>
            )}
        </div>
    );
};

export default MergeSortVisualizer;*/



import React, { useEffect, useState } from 'react';

const MergeSortVisualizer = ({ array, sorting, steps, maxDepth }) => {
    const [treeSteps, setTreeSteps] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [showMerge, setShowMerge] = useState(false);

    useEffect(() => {
        // Reset tree before assigning new one
        setTreeSteps(null); // Clear old tree (forces unmount)  
        // Slight delay to allow unmount (ensures full reset)           
        if (steps && sorting) {
            setTreeSteps(steps);

        }

        let level = 0;
        const interval = setInterval(() => {
            level++;
            setCurrentLevel(level);
            if (level > maxDepth) {
                clearInterval(interval);
                setTimeout(() => setShowMerge(true), 800);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [steps, array]);

    return (
        <div className="max-h-[300px]">
            {treeSteps && (
                <ArrayNode
                    node={treeSteps}
                    level={0}
                    currentLevel={currentLevel}
                    showMerge={showMerge}
                />
            )}

        </div>
    );
};

const ArrayNode = ({ node, level, currentLevel, showMerge }) => {
    const [mergeIndex, setMergeIndex] = useState(0);

    useEffect(() => {
        if (showMerge && node.mergeSteps.length > 0) {
            let i = 0;
            const interval = setInterval(() => {
                if (i < node.mergeSteps.length) {
                    setMergeIndex(i + 1);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 800);
            return () => clearInterval(interval);
        }
    }, [showMerge]);

    const currentStep = node.mergeSteps?.[mergeIndex - 1];
    const isVisible = level <= currentLevel;

    const getColor = (idx, node) => {
        if (currentStep?.highlights?.merging?.includes(idx)) return 'bg-green-500';
        if (currentStep?.highlights?.comparing?.includes(idx)) return 'bg-yellow-400';
        if (showMerge && node.array.length === 1 && node.mergeSteps.length === 0) return 'bg-green-500';
        return 'bg-blue-600';
    };

    if (!isVisible) return null;

    const displayedArray = currentStep?.array || node.original;

    return (
        <div className="flex flex-col items-center mt-4">
            {/* Array Elements*/ }
            <div className="flex gap-2 bg-base-100 p-3 shadow-lg rounded-md">
                {displayedArray.map((val, idx) => (
                    <span
                        key={idx}
                        className={`p-2 text-white font-bold rounded ${getColor(idx, node)}`}
                    >
                        {val}
                    </span>
                ))}
            </div>
            



            {/* Children Subarrays*/ }
            {node.left && node.right && (
                <div className="flex gap-10 mt-4 w-full justify-center">
                    <ArrayNode node={node.left} level={level + 1} currentLevel={currentLevel} showMerge={showMerge} />
                    <ArrayNode node={node.right} level={level + 1} currentLevel={currentLevel} showMerge={showMerge} />
                </div>
            )}
        </div>
    );
};

export default MergeSortVisualizer;



/*import React, { useEffect, useState } from 'react';

const MergeSortVisualizer = ({ array, sorting, steps, maxDepth }) => {
    const [treeSteps, setTreeSteps] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [showMerge, setShowMerge] = useState(false);

    useEffect(() => {
        setTreeSteps(null);

        if (steps && sorting) {
            setTreeSteps(steps);
        }

        let level = 0;
        const interval = setInterval(() => {
            level++;
            setCurrentLevel(level);
            if (level > maxDepth) {
                clearInterval(interval);
                setTimeout(() => setShowMerge(true), 800);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [steps, array]);

    return (
        <div className="max-h-[300px]">
            {treeSteps && (
                <ArrayNode
                    node={treeSteps}
                    level={0}
                    currentLevel={currentLevel}
                    showMerge={showMerge}
                />
            )}
        </div>
    );
};

const ArrayNode = ({ node, level, currentLevel, showMerge }) => {
    const [mergeIndex, setMergeIndex] = useState(0);

    useEffect(() => {
        if (showMerge && node.mergeSteps.length > 0) {
            let i = 0;
            const interval = setInterval(() => {
                if (i < node.mergeSteps.length) {
                    setMergeIndex(i + 1);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 800);
            return () => clearInterval(interval);
        }
    }, [showMerge]);

    const currentStep = node.mergeSteps?.[mergeIndex - 1];
    const isVisible = level <= currentLevel;

    const getColor = (idx, node) => {
        if (currentStep?.highlights?.merging?.includes(idx)) return 'bg-green-500';
        if (currentStep?.highlights?.comparing?.includes(idx)) return 'bg-yellow-400';
        if (showMerge && node.array.length === 1 && node.mergeSteps.length === 0) return 'bg-green-500';
        return 'bg-blue-600';
    };

    if (!isVisible) return null;

    const displayedArray = currentStep?.array || node.original;
    const pointers = currentStep?.pointers || {
        start: node.start,
        mid: node.mid,
        end: node.end,
    };

    return (
        <div className="flex flex-col items-center mt-4">
            {/* Array Elements }
            <div className="flex gap-2 bg-base-100 p-3 shadow-lg rounded-md">
                {displayedArray.map((val, idx) => (
                    <span
                        key={idx}
                        className={`p-2 text-white font-bold rounded ${getColor(idx, node)}`}
                    >
                        {val}
                    </span>
                ))}
            </div>

            {/* Pointer Labels }
            <div className="flex gap-2 justify-center mt-1">
                {displayedArray.map((_, idx) => {
                    const globalIdx = pointers.start + idx;
                    let label = '';
                    if (globalIdx === pointers.start) label = 'Start';
                    if (globalIdx === pointers.mid) label = 'Mid';
                    if (globalIdx === pointers.end) label = 'End';

                    return (
                        <div key={idx} className="w-10 text-xs text-center text-gray-400">
                            {label}
                        </div>
                    );
                })}
            </div>

            {/* Children Subarrays }
            {node.left && node.right && (
                <div className="flex gap-10 mt-4 w-full justify-center">
                    <ArrayNode
                        node={node.left}
                        level={level + 1}
                        currentLevel={currentLevel}
                        showMerge={showMerge}
                    />
                    <ArrayNode
                        node={node.right}
                        level={level + 1}
                        currentLevel={currentLevel}
                        showMerge={showMerge}
                    />
                </div>
            )}
        </div>
    );
};

export default MergeSortVisualizer;*/








