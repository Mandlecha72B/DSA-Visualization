
export const getMergeSortSteps = (arr) => {
    const start = performance.now();
    let comparisons = 0;
    let maxDepth = 0;

    const buildSteps = (array, depth = 0) => {
        maxDepth = Math.max(maxDepth, depth);

        if (array.length <= 1) {
            return {
                array,
                original: array,
                left: null,
                right: null,
                mergeSteps: [],
                depth
            };
        }

        const mid = Math.floor(array.length / 2);
        const leftArr = array.slice(0, mid);
        const rightArr = array.slice(mid);

        const leftNode = buildSteps(leftArr, depth + 1);
        const rightNode = buildSteps(rightArr, depth + 1);

        const merged = [];
        const mergeSteps = [];
        let i = 0, j = 0;

        while (i < leftNode.array.length && j < rightNode.array.length) {
            comparisons++;

            mergeSteps.push({
                array: [...merged, ...leftNode.array.slice(i), ...rightNode.array.slice(j)],
                highlights: {
                    comparing: [merged.length, merged.length + 1],
                    merging: [],
                },
                comparisons,
            });

            if (leftNode.array[i] < rightNode.array[j]) {
                merged.push(leftNode.array[i++]);
            } else {
                merged.push(rightNode.array[j++]);
            }
        }

        merged.push(...leftNode.array.slice(i));
        merged.push(...rightNode.array.slice(j));

        mergeSteps.push({
            array: [...merged],
            highlights: {
                comparing: [],
                merging: [...Array(merged.length).keys()],
            },
            comparisons,
        });

        return {
            array: merged,
            original: array,
            left: leftNode,
            right: rightNode,
            mergeSteps,
            depth,
        };
    };

    const treeSteps = buildSteps(arr);
    const end = performance.now();

    return {
        treeSteps,
        executionTime: end - start,
        comparisons,
        maxDepth,
    };
};

/*export const getMergeSortSteps = (arr) => {
    const start = performance.now();
    let comparisons = 0;
    let maxDepth = 0;

    const buildSteps = (array, depth = 0, globalStart = 0, globalEnd = array.length - 1) => {
        maxDepth = Math.max(maxDepth, depth);

        if (array.length <= 1) {
            return {
                array,
                original: array,
                left: null,
                right: null,
                mergeSteps: [],
                depth,
                start: globalStart,
                mid: Math.floor((globalStart + globalEnd) / 2),
                end: globalEnd,
            };
        }

        const mid = Math.floor(array.length / 2);
        const leftArr = array.slice(0, mid);
        const rightArr = array.slice(mid);

        const globalMid = Math.floor((globalStart + globalEnd) / 2);
        const leftNode = buildSteps(leftArr, depth + 1, globalStart, globalMid);
        const rightNode = buildSteps(rightArr, depth + 1, globalMid + 1, globalEnd);

        const merged = [];
        const mergeSteps = [];
        let i = 0, j = 0;

        while (i < leftNode.array.length && j < rightNode.array.length) {
            comparisons++;

            mergeSteps.push({
                array: [...merged, ...leftNode.array.slice(i), ...rightNode.array.slice(j)],
                highlights: {
                    comparing: [merged.length, merged.length + 1],
                    merging: [],
                },
                comparisons,
                pointers: {
                    start: globalStart,
                    mid: globalMid,
                    end: globalEnd,
                },
            });

            if (leftNode.array[i] < rightNode.array[j]) {
                merged.push(leftNode.array[i++]);
            } else {
                merged.push(rightNode.array[j++]);
            }
        }

        merged.push(...leftNode.array.slice(i));
        merged.push(...rightNode.array.slice(j));

        mergeSteps.push({
            array: [...merged],
            highlights: {
                comparing: [],
                merging: [...Array(merged.length).keys()],
            },
            comparisons,
            pointers: {
                start: globalStart,
                mid: globalMid,
                end: globalEnd,
            },
        });

        return {
            array: merged,
            original: array,
            left: leftNode,
            right: rightNode,
            mergeSteps,
            depth,
            start: globalStart,
            mid: globalMid,
            end: globalEnd,
        };
    };

    const treeSteps = buildSteps(arr);
    const end = performance.now();

    return {
        treeSteps,
        executionTime: end - start,
        comparisons,
        maxDepth,
    };
};*/
