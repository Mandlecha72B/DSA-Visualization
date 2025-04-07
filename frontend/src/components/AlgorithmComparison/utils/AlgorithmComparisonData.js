// src/data/sortingComplexities.js
export const sortingComplexities = {
    "Bubble Sort": {
        "Random": {
            timeComplexity: "O(n²)",
            timeExplanation: "For a completely random array, Bubble Sort doesn't benefit from any prior order, so it requires O(n²) comparisons and swaps.",
            spaceComplexity: "O(1)",
            spaceExplanation: "Bubble Sort is an in-place sorting algorithm, meaning it only requires a constant amount of additional memory, regardless of input size.",
            stability: "Bubble Sort is a stable sort.",
            stabilityExplanation: "Bubble Sort only swaps adjacent elements when necessary.Since equal elements never jump over each other, the original order is preserved."
        },
        "Nearly Sorted": {
            timeComplexity: "O(n)",
            timeExplanation: "Since the array is nearly sorted, Bubble Sort will perform only a few swaps and finish in linear time. The optimized version detects sorted sequences early.",
            spaceComplexity: "O(1)",
            spaceExplanation: "Bubble Sort doesn't use extra memory apart from a few temporary variables for swapping elements.",
            stability: "Bubble Sort is a stable sort.",
            stabilityExplanation: "Bubble Sort only swaps adjacent elements when necessary.Since equal elements never jump over each other, the original order is preserved."
        },
        "Completely Unsorted": {
            timeComplexity: "O(n²)",
            timeExplanation: "Bubble Sort has to compare and swap every element multiple times, leading to O(n²) complexity.",
            spaceComplexity: "O(1)",
            spaceExplanation: "It sorts in place without using any extra space.",
            stability: "Bubble Sort is a stable sort.",
            stabilityExplanation: "Bubble Sort only swaps adjacent elements when necessary.Since equal elements never jump over each other, the original order is preserved."
        },
        "Reverse Sorted": {
            timeComplexity: "O(n²)",
            timeExplanation: "Each element has to be swapped to the other end, making it the worst case with O(n²) complexity.",
            spaceComplexity: "O(1)",
            spaceExplanation: "Only a few extra variables are used for swapping, so the space complexity remains constant.",
            stability: "Bubble Sort is a stable sort.",
            stabilityExplanation: "Bubble Sort only swaps adjacent elements when necessary.Since equal elements never jump over each other, the original order is preserved."
        },
        "Many Duplicates": {
            timeComplexity: "O(n²)",
            timeExplanation: "Even though there are duplicates, Bubble Sort still performs O(n²) comparisons. However, fewer swaps may be needed.",
            spaceComplexity: "O(1)",
            spaceExplanation: "Bubble Sort does not require additional memory apart from storing a few variables.",
            stability: "Bubble Sort is a stable sort.",
            stabilityExplanation: "Bubble Sort only swaps adjacent elements when necessary.Since equal elements never jump over each other, the original order is preserved."
        },
        "Small Array": {
            timeComplexity: "O(n) to O(n²)",
            timeExplanation: "For very small arrays, the performance difference is negligible. If the array is nearly sorted, it takes O(n); otherwise, it takes O(n²).",
            spaceComplexity: "O(1)",
            spaceExplanation: "Even for small arrays, Bubble Sort operates in-place with constant space usage.",
            stability: "Bubble Sort is a stable sort.",
            stabilityExplanation: "Bubble Sort only swaps adjacent elements when necessary.Since equal elements never jump over each other, the original order is preserved."
        },
        "Large Array": {
            timeComplexity: "O(n²)",
            timeExplanation: "Bubble Sort is inefficient for large arrays due to quadratic time complexity, making it impractical.",
            spaceComplexity: "O(1)",
            spaceExplanation: "Despite being inefficient in time complexity, it still only uses O(1) extra space.",
            stability: "Bubble Sort is a stable sort.",
            stabilityExplanation: "Bubble Sort only swaps adjacent elements when necessary.Since equal elements never jump over each other, the original order is preserved."
        },
        
    },

    "Selection Sort": {
        "Random": {
            timeComplexity: "O(n²)",
            timeExplanation: "Selection Sort always performs O(n²) comparisons, regardless of the initial order, since it must find the minimum element in each pass.",
            spaceComplexity: "O(1)",
            spaceExplanation: "Selection Sort is an in-place algorithm, meaning it sorts the array without requiring extra memory.",
            stability: "Selection Sort is not a stable sort. It may change the relative order of equal elements.",
            stabilityExplanation: "Selection Sort finds the minimum element and swaps it with the current position.If there are duplicates, their relative order can change due to non- adjacent swaps."
        },
        "Nearly Sorted": {
            timeComplexity: "O(n²)",
            timeExplanation: "Even if the array is nearly sorted, Selection Sort still scans the entire unsorted portion in each pass, making it O(n²).",
            spaceComplexity: "O(1)",
            spaceExplanation: "The algorithm only swaps elements in place and does not require additional storage.",
            stability: "Selection Sort is not a stable sort. It may change the relative order of equal elements.",
            stabilityExplanation: "Selection Sort finds the minimum element and swaps it with the current position.If there are duplicates, their relative order can change due to non- adjacent swaps."
        },
        "Completely Unsorted": {
            timeComplexity: "O(n²)",
            timeExplanation: "Selection Sort does not adapt to disorder and must perform O(n²) comparisons regardless of input randomness.",
            spaceComplexity: "O(1)",
            spaceExplanation: "Since Selection Sort works in place, it doesn't use any extra memory beyond a few temporary variables.",
            stability: "Selection Sort is not a stable sort. It may change the relative order of equal elements.",
            stabilityExplanation: "Selection Sort finds the minimum element and swaps it with the current position.If there are duplicates, their relative order can change due to non- adjacent swaps."
        },
        "Reverse Sorted": {
            timeComplexity: "O(n²)",
            timeExplanation: "Selection Sort still performs O(n²) comparisons, as it scans the entire array for the minimum element in each pass.",
            spaceComplexity: "O(1)",
            spaceExplanation: "It requires only a few extra variables for swapping, keeping space usage constant.",
            stability: "Selection Sort is not a stable sort. It may change the relative order of equal elements.",
            stabilityExplanation: "Selection Sort finds the minimum element and swaps it with the current position.If there are duplicates, their relative order can change due to non- adjacent swaps."
        },
        "Many Duplicates": {
            timeComplexity: "O(n²)",
            timeExplanation: "The presence of duplicate values does not impact Selection Sort’s efficiency, as it still makes O(n²) comparisons.",
            spaceComplexity: "O(1)",
            spaceExplanation: "No additional storage is needed, making it a constant-space algorithm.",
            stability: "Selection Sort is not a stable sort. It may change the relative order of equal elements.",
            stabilityExplanation: "Selection Sort finds the minimum element and swaps it with the current position.If there are duplicates, their relative order can change due to non- adjacent swaps."
        },
        "Small Array": {
            timeComplexity: "O(n²)",
            timeExplanation: "For small arrays, Selection Sort is feasible but still performs O(n²) comparisons even if sorting is trivial.",
            spaceComplexity: "O(1)",
            spaceExplanation: "Even for small arrays, Selection Sort does not require extra memory.",
            stability: "Selection Sort is not a stable sort. It may change the relative order of equal elements.",
            stabilityExplanation: "Selection Sort finds the minimum element and swaps it with the current position.If there are duplicates, their relative order can change due to non- adjacent swaps."
        },
        "Large Array": {
            timeComplexity: "O(n²)",
            timeExplanation: "Due to its quadratic complexity, Selection Sort is impractical for large arrays compared to more efficient algorithms like Quick Sort and Merge Sort.",
            spaceComplexity: "O(1)",
            spaceExplanation: "Despite its inefficiency in time complexity, Selection Sort has the advantage of using minimal memory.",
            stability: "Selection Sort is not a stable sort. It may change the relative order of equal elements.",
            stabilityExplanation: "Selection Sort finds the minimum element and swaps it with the current position.If there are duplicates, their relative order can change due to non- adjacent swaps."
        }
    },

    "Insertion Sort": {
        "Random": {
            timeComplexity: "O(n²)",
            timeExplanation: "For a completely random array, each element is likely to be inserted far from its original position, leading to O(n²) comparisons and shifts.",
            spaceComplexity: "O(1)",
            spaceExplanation: "Insertion Sort sorts in place, requiring only a constant amount of extra memory.",
            stability: "Insertion Sort is a stable sort.",
            stabilityExplanation: "Insertion Sort shifts elements instead of swapping, so equal elements remain in the same order."
        },
        "Nearly Sorted": {
            timeComplexity: "O(n)",
            timeExplanation: "If the array is nearly sorted, Insertion Sort runs in linear time as elements are already close to their correct positions, requiring minimal shifts.",
            spaceComplexity: "O(1)",
            spaceExplanation: "It still operates in-place without needing extra memory.",
            stability: "Insertion Sort is a stable sort.",
            stabilityExplanation: "Insertion Sort shifts elements instead of swapping, so equal elements remain in the same order."
        },
        "Completely Unsorted": {
            timeComplexity: "O(n²)",
            timeExplanation: "In the worst case, every element needs to be shifted back in the array, leading to O(n²) comparisons and swaps.",
            spaceComplexity: "O(1)",
            spaceExplanation: "No additional memory is required apart from a few temporary variables.",
            stability: "Insertion Sort is a stable sort.",
            stabilityExplanation: "Insertion Sort shifts elements instead of swapping, so equal elements remain in the same order."
        },
        "Reverse Sorted": {
            timeComplexity: "O(n²)",
            timeExplanation: "Each element must be moved all the way to the front, leading to the worst-case O(n²) performance.",
            spaceComplexity: "O(1)",
            spaceExplanation: "Only a few extra variables are used, keeping space usage constant.",
            stability: "Insertion Sort is a stable sort.",
            stabilityExplanation: "Insertion Sort shifts elements instead of swapping, so equal elements remain in the same order."
        },
        "Many Duplicates": {
            timeComplexity: "O(n²)",
            timeExplanation: "Even with duplicates, Insertion Sort still performs O(n²) operations as it needs to compare and shift elements.",
            spaceComplexity: "O(1)",
            spaceExplanation: "The algorithm works in place, so it doesn’t require additional storage.",
            stability: "Insertion Sort is a stable sort.",
            stabilityExplanation: "Insertion Sort shifts elements instead of swapping, so equal elements remain in the same order."
        },
        "Small Array": {
            timeComplexity: "O(n) to O(n²)",
            timeExplanation: "For small arrays, the difference in performance is minimal. If the array is already somewhat sorted, Insertion Sort runs in near O(n) time.",
            spaceComplexity: "O(1)",
            spaceExplanation: "Small arrays don’t impact space complexity as the sorting is still in-place.",
            stability: "Insertion Sort is a stable sort.",
            stabilityExplanation: "Insertion Sort shifts elements instead of swapping, so equal elements remain in the same order."
        },
        "Large Array": {
            timeComplexity: "O(n²)",
            timeExplanation: "Due to its quadratic time complexity, Insertion Sort is inefficient for large arrays compared to more advanced algorithms like Merge Sort or Quick Sort.",
            spaceComplexity: "O(1)",
            spaceExplanation: "Despite poor time efficiency, it remains memory efficient since no extra space is used.",
            stability: "Insertion Sort is a stable sort.",
            stabilityExplanation: "Insertion Sort shifts elements instead of swapping, so equal elements remain in the same order."
        }
    },
};
