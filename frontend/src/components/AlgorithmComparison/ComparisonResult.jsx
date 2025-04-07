import React from "react";
import { MdClose } from "react-icons/md";
import { sortingComplexities } from "./utils/AlgorithmComparisonData";


const ComparisonResult = ({ onClose, algo1, algo2, executionTime1, executionTime2, arrayCondition }) => {

    const handleBetterAlgorithm = () => {
        if (executionTime1 < executionTime2) {
            return `${algo1} is faster than ${algo2}`;
        } else if (executionTime2 < executionTime1) {
            return `${algo2} is faster than ${algo1}`;
        } else {
            return `Both algorithms perform equally well`;
        }
    }
    
    return (
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-xl shadow-xl max-w-3xl mx-auto transform transition-all duration-300 hover:scale-105 max-h-[80vh] overflow-auto">
            {/* Close Button */}
            <button
                className="absolute top-3 right-3 p-2 rounded-full bg-gray-700 hover:bg-red-500 transition-all text-white shadow-md hover:scale-110"
                onClick={onClose}
            >
                <MdClose className="text-xl" />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center mb-4 text-primary">Comparison Result</h2>

            {/* Array Condition */}
            <div className="text-center mb-4">
                <span className="px-3 py-1 bg-gray-700 rounded-lg text-sm font-medium">
                    Condition: {arrayCondition===""? "Random" : arrayCondition}
                </span>
            </div>

            {/* Side-by-Side Comparison Table */}
            <div className="grid grid-cols-2 gap-4 text-center">
                {/* Algorithm 1 */}
                <div className="p-4 border border-gray-700 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-400">{algo1}</h3>
                    <p className="text-sm text-gray-400 mt-1">Execution Time: <strong>{executionTime1} ms</strong></p>
                    <p className="mt-3">
                        <strong>Time Complexity:</strong> {sortingComplexities[algo1]?.[(arrayCondition === "" ? "Random" : arrayCondition)]?.timeComplexity}
                    </p>
                    <p className="text-sm text-gray-400">{sortingComplexities[algo1]?.[(arrayCondition === "" ? "Random" : arrayCondition)]?.timeExplanation}</p>
                    <p className="mt-3">
                        <strong>Space Complexity:</strong> {sortingComplexities[algo1]?.[(arrayCondition === "" ? "Random" : arrayCondition)]?.spaceComplexity}
                    </p>
                    <p className="text-sm text-gray-400">{sortingComplexities[algo1]?.[(arrayCondition === "" ? "Random" : arrayCondition)]?.spaceExplanation}</p>
                    <p className="mt-3">
                        <strong>Stability:</strong> {sortingComplexities[algo1]?.[(arrayCondition === "" ? "Random" : arrayCondition)]?.stability}
                    </p>
                    <p className="text-sm text-gray-400">{sortingComplexities[algo1]?.[(arrayCondition === "" ? "Random" : arrayCondition)]?.stabilityExplanation}</p>

                </div>

                {/* Algorithm 2 */}
                <div className="p-4 border border-gray-700 rounded-lg">
                    <h3 className="text-xl font-semibold text-green-400">{algo2}</h3>
                    <p className="text-sm text-gray-400 mt-1">Execution Time: <strong>{executionTime2} ms</strong></p>
                    <p className="mt-3">
                        <strong>Time Complexity:</strong> {sortingComplexities[algo2]?.[(arrayCondition === "" ? "Random" : arrayCondition)]?.timeComplexity}
                    </p>
                    <p className="text-sm text-gray-400">{sortingComplexities[algo2]?.[(arrayCondition === "" ? "Random" : arrayCondition)]?.timeExplanation}</p>
                    <p className="mt-3">
                        <strong>Space Complexity:</strong> {sortingComplexities[algo2]?.[(arrayCondition === "" ? "Random" : arrayCondition)]?.spaceComplexity}
                    </p>
                    <p className="text-sm text-gray-400">{sortingComplexities[algo2]?.[(arrayCondition === "" ? "Random" : arrayCondition)]?.spaceExplanation}</p>
                    <p className="mt-3">
                        <strong>Stability:</strong> {sortingComplexities[algo2]?.[(arrayCondition === "" ? "Random" : arrayCondition)]?.stability}
                    </p>
                    <p className="text-sm text-gray-400">{sortingComplexities[algo2]?.[(arrayCondition === "" ? "Random" : arrayCondition)]?.stabilityExplanation}</p>
                </div>
            </div>

            {/* Best Algorithm Suggestion */}
            <div className="mt-5 text-center p-3 border border-gray-600 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-400">Which Algorithm is Better?</h3>
                <p className="text-sm text-gray-300">{handleBetterAlgorithm()}</p>
            </div>
        </div>
    );
};

export default ComparisonResult;
