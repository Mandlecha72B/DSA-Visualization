/*export function getQuickSortSteps(array) {
    const steps = [];
    const arr = [...array]; // Copy to avoid mutating original array
    const sorted = new Set();
    let comparisons = 0;

    function addStep(highlights = {}) {
        steps.push({
            array: [...arr],
            highlights: {
                comparing: highlights.comparing || [],
                swapping: highlights.swapping || [],
                pivot: highlights.pivot ?? null,
                sorted: Array.from(sorted),
            },
            comparisons,
        });
    }

    function quickSort(low, high) {
        if (low < high) {
            const pivotIndex = partition(low, high);
            quickSort(low, pivotIndex - 1);
            quickSort(pivotIndex + 1, high);
        } else if (low === high) {
            sorted.add(low);
            addStep(); // add the last sorted element
        }
    }

    function partition(low, high) {
        const pivot = arr[high];
        let i = low;

        addStep({ pivot: high });

        for (let j = low; j < high; j++) {
            comparisons++;
            addStep({ comparing: [j, high], pivot: high });

            if (arr[j] < pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                addStep({ swapping: [i, j], pivot: high });
                i++;
            }
        }

        [arr[i], arr[high]] = [arr[high], arr[i]];
        sorted.add(i);
        addStep({ swapping: [i, high], pivot: high });

        return i;
    }

    quickSort(0, arr.length - 1);

    // Mark remaining sorted indices
    for (let i = 0; i < arr.length; i++) {
        sorted.add(i);
    }

    addStep(); // Final sorted array

    return steps;
}*/

/*export const getQuickSortSteps = (arr) => {
    const steps = [];
    const array = [...arr];
    const sortedIndices = new Set();
    let comparisons = 0;

    const addStep = (highlights = {}) => {
        steps.push({
            array: [...array],
            highlights: {
                comparing: highlights.comparing || [],
                swapping: highlights.swapping || [],
                pivot: highlights.pivot ?? null,
                sorted: Array.from(sortedIndices),
            },
            comparisons,
        });
    };

    const swap = (i, j) => {
        [array[i], array[j]] = [array[j], array[i]];
        addStep({ swapping: [i, j] });
    };

    const partition = (low, high) => {
        const pivot = array[high];
        let i = low - 1;
        addStep({ pivot: high }); // Show pivot selected

        for (let j = low; j < high; j++) {
            comparisons++;
            addStep({ comparing: [j, high], pivot: high });

            if (array[j] < pivot) {
                i++;
                if (i !== j) swap(i, j);
            }
        }

        if (i + 1 !== high) swap(i + 1, high);

        sortedIndices.add(i + 1); // Pivot is now in final position
        addStep({ pivot: i + 1 }); // Show after placing pivot

        return i + 1;
    };

    const quickSort = (low, high) => {
        if (low < high) {
            const pivotIndex = partition(low, high);

            // Recursive calls for left and right subarrays
            quickSort(low, pivotIndex - 1);
            quickSort(pivotIndex + 1, high);
        } else if (low === high) {
            // Single-element subarray — already sorted
            sortedIndices.add(low);
            addStep(); // Snapshot to show it's now sorted
        }
    };

    quickSort(0, array.length - 1);

    // Final step with all sorted
    addStep();

    return steps;
};*/

/*export const getQuickSortSteps = (arr) => {
    const steps = [];
    const array = [...arr];
    const sortedIndices = new Set();
    let comparisons = 0;

    const addStep = (arraySnapshot, highlights = {}, depth = 0, side = "root") => {
        steps.push({
            array: [...arraySnapshot],
            highlights: {
                comparing: highlights.comparing || [],
                swapping: highlights.swapping || [],
                pivot: highlights.pivot ?? null,
                sorted: Array.from(sortedIndices),
            },
            comparisons,
            depth,
            side,
        });
    };

    const swap = (arr, i, j) => {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };

    const quickSort = (arr, low, high, depth = 0, side = "root") => {
        if (low < high) {
            const pivot = arr[high];
            let i = low - 1;

            addStep(arr, { pivot: high }, depth, side); // Show pivot selected

            for (let j = low; j < high; j++) {
                comparisons++;
                addStep(arr, { comparing: [j, high], pivot: high }, depth, side);

                if (arr[j] < pivot) {
                    i++;
                    if (i !== j) {
                        swap(arr, i, j);
                        addStep(arr, { swapping: [i, j], pivot: high }, depth, side);
                    }
                }
            }

            if (i + 1 !== high) {
                swap(arr, i + 1, high);
                addStep(arr, { swapping: [i + 1, high], pivot: high }, depth, side);
            }

            sortedIndices.add(i + 1);
            addStep(arr, { pivot: i + 1 }, depth, side); // Pivot in position

            const left = arr.slice(low, i + 1);
            const right = arr.slice(i + 2, high + 1);

            // Recursively sort left and right
            if (left.length > 0) quickSort(arr, low, i, depth + 1, "left");
            if (right.length > 0) quickSort(arr, i + 2, high, depth + 1, "right");

        } else if (low === high) {
            sortedIndices.add(low);
            addStep(arr, {}, depth, side); // Final sorted element
        }
    };

    quickSort(array, 0, array.length - 1);

    return steps;
};*/

/*export const getQuickSortRecursiveSteps = (arr) => {
    const steps = [];

    const quickSort = (array, low, high, depth = 0) => {
        const stepGroup = {
            array: [...array],
            low,
            high,
            depth,
            steps: [],
            left: null,
            right: null
        };

        const sortedIndices = new Set();
        let comparisons = 0;

        const addStep = (highlights = {}) => {
            stepGroup.steps.push({
                array: [...array],
                highlights: {
                    comparing: highlights.comparing || [],
                    swapping: highlights.swapping || [],
                    pivot: highlights.pivot ?? null,
                    low: highlights.low ?? null,
                    high: highlights.high ?? null,
                    sorted: Array.from(sortedIndices),
                },
                comparisons
            });
        };

        const swap = (i, j) => {
            [array[i], array[j]] = [array[j], array[i]];
            addStep({
                swapping: [i, j],
                pivot: currentPivot,
                low: currentLow,
                high: currentHigh
            });
        };

        let currentPivot = null;
        let currentLow = null;
        let currentHigh = null;

        const partition = (low, high) => {
            const pivot = array[high];
            currentPivot = high;
            currentLow = low;
            currentHigh = high;

            let i = low - 1;
            addStep({ pivot: high, low, high });

            for (let j = low; j < high; j++) {
                comparisons++;
                addStep({ comparing: [j, high], pivot: high, low, high });

                if (array[j] < pivot) {
                    i++;
                    if (i !== j) swap(i, j);
                }
            }

            if (i + 1 !== high) swap(i + 1, high);

            sortedIndices.add(i + 1);
            addStep({ pivot: i + 1, low, high });

            return i + 1;
        };

        if (low < high) {
            const pivotIndex = partition(low, high);
            stepGroup.left = quickSort(array.slice(low, pivotIndex), 0, pivotIndex - low - 1, depth + 1);
            stepGroup.right = quickSort(array.slice(pivotIndex + 1, high + 1), 0, high - pivotIndex - 1, depth + 1);
        } else if (low === high) {
            sortedIndices.add(low);
            addStep({ low, high });
        }

        steps.push(stepGroup);
        return stepGroup;
    };

    quickSort([...arr], 0, arr.length - 1);
    return steps.reverse(); // root first
};*/

export const getQuickSortRecursiveSteps = (arr) => {
    const steps = [];

    const startTime = performance.now(); // ⏱️ Start timer

    const quickSort = (array, low, high, depth = 0) => {
        const stepGroup = {
            array: [...array],
            low,
            high,
            depth,
            steps: [],
            left: null,
            right: null
        };

        const sortedIndices = new Set();
        let comparisons = 0;

        const addStep = (highlights = {}) => {
            stepGroup.steps.push({
                array: [...array],
                highlights: {
                    comparing: highlights.comparing || [],
                    swapping: highlights.swapping || [],
                    pivot: highlights.pivot ?? null,
                    low: highlights.low ?? null,
                    high: highlights.high ?? null,
                    sorted: Array.from(sortedIndices),
                },
                comparisons
            });
        };

        const swap = (i, j) => {
            [array[i], array[j]] = [array[j], array[i]];
            addStep({
                swapping: [i, j],
                pivot: currentPivot,
                low: currentLow,
                high: currentHigh
            });
        };

        let currentPivot = null;
        let currentLow = null;
        let currentHigh = null;

        const partition = (low, high) => {
            const pivot = array[high];
            currentPivot = high;
            currentLow = low;
            currentHigh = high;

            let i = low - 1;
            addStep({ pivot: high, low, high });

            for (let j = low; j < high; j++) {
                comparisons++;
                addStep({ comparing: [j, high], pivot: high, low, high });

                if (array[j] < pivot) {
                    i++;
                    if (i !== j) swap(i, j);
                }
            }

            if (i + 1 !== high) swap(i + 1, high);

            sortedIndices.add(i + 1);
            addStep({ pivot: i + 1, low, high });

            return i + 1;
        };

        if (low < high) {
            const pivotIndex = partition(low, high);
            stepGroup.left = quickSort(array.slice(low, pivotIndex), 0, pivotIndex - low - 1, depth + 1);
            stepGroup.right = quickSort(array.slice(pivotIndex + 1, high + 1), 0, high - pivotIndex - 1, depth + 1);
        } else if (low === high) {
            sortedIndices.add(low);
            addStep({ low, high });
        }

        steps.push(stepGroup);
        return stepGroup;
    };

    quickSort([...arr], 0, arr.length - 1);

    const endTime = performance.now(); // ⏱️ End timer

    return {
        steps: steps.reverse(), // root first
        executionTime: parseFloat((endTime - startTime).toFixed(2)) // return ms as float
    };
};

