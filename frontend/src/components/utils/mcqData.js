import { generateInsertQuestion } from "./generateInsertQuestion";
import { generateDeleteQuestion } from "./generateDeleteQuestion";
import { generateUpdateQuestion } from "./generateUpdateQuestion";

const mcqQuestions = [
    {
        type: "mcq",
        question: "What is the time complexity of inserting an element at the beginning of an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        answer: "O(n)",
        explanation: "Since elements must be shifted to make space, inserting at the beginning takes O(n) time."
    },
    {
        type: "mcq",
        question: "Which of the following is true about arrays?",
        options: [
            "Arrays can have dynamic size in JavaScript",
            "Arrays store elements in contiguous memory locations",
            "Arrays allow non-integer indexes",
            "Arrays in C++ automatically grow when needed"
        ],
        answer: "Arrays store elements in contiguous memory locations",
        explanation: "Arrays store elements in contiguous memory locations, making indexing efficient."
    },
    {
        type: "mcq",
        question: "How do you access the last element of an array in JavaScript?",
        options: [
            "arr[arr.length - 1]",
            "arr[-1]",
            "arr.last()",
            "arr[len(arr)-1]"
        ],
        answer: "arr[arr.length - 1]",
        explanation: "In JavaScript, `arr[arr.length - 1]` is used to access the last element of an array."
    },
    {
        type: "mcq",
        question: "What is the time complexity of searching for an element in an unsorted array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        answer: "O(n)",
        explanation: "In an unsorted array, searching requires scanning all elements in the worst case, making it O(n)."
    },
    {
        type: "mcq",
        question: "Which of the following best describes an array?",
        options: [
            "A collection of elements stored in non-contiguous memory locations",
            "A collection of elements stored in contiguous memory locations",
            "A collection of dynamically allocated objects",
            "A linked list structure"
        ],
        answer: "A collection of elements stored in contiguous memory locations",
        explanation: "Arrays store elements in contiguous memory, allowing constant-time access via indexing."
    },
    {
        type: "mcq",
        question: "What happens if you try to access an index that is out of bounds in JavaScript?",
        options: [
            "It throws an error",
            "It returns undefined",
            "It returns null",
            "It loops back to the first element"
        ],
        answer: "It returns undefined",
        explanation: "Accessing an out-of-bounds index in JavaScript does not throw an error but returns `undefined`."
    },
    {
        type: "mcq",
        question: "Which of the following operations has the fastest time complexity in an array?",
        options: [
            "Accessing an element using its index",
            "Inserting an element at the beginning",
            "Deleting an element from the middle",
            "Searching for an element in an unsorted array"
        ],
        answer: "Accessing an element using its index",
        explanation: "Array indexing allows direct access in O(1) time complexity."
    },
    {
        type: "mcq",
        question: "What is the default value of an uninitialized array element in JavaScript?",
        options: [
            "0",
            "null",
            "undefined",
            "Depends on the data type"
        ],
        answer: "undefined",
        explanation: "In JavaScript, uninitialized array elements are `undefined`."
    },

    {
        type: "mcq",
        question: "What is the time complexity of the append method in an array (on average)?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        answer: "O(1)",
        explanation: "In dynamic arrays, `push()` runs in O(1) amortized time since resizing occurs occasionally."
    },

    {
        type: "mcq",
        question: "What does the `length` property of an array represent?",
        options: [
            "The total memory allocated to the array",
            "The index of the last element",
            "The number of elements in the array",
            "The maximum number of elements the array can hold"
        ],
        answer: "The number of elements in the array",
        explanation: "The `length` property gives the total number of elements present in an array."
    },

    {
        type: "mcq",
        question: "What is the index of the first element in an array?",
        options: ["0", "1", "-1", "Depends on the programming language"],
        answer: "0",
        explanation: "In most programming languages like C, Java, and Python, arrays are zero-indexed, meaning the first element is at index 0."
    },

    {
        type: "mcq",
        question: "What is the maximum number of elements an array of size 'n' can hold?",
        options: ["n", "n-1", "n+1", "Depends on the indexing"],
        answer: "n",
        explanation: "An array declared with size 'n' can hold exactly 'n' elements, as the size represents the total number of available slots."
    },

    {
        type: "mcq",
        question: "Which of the following is a disadvantage of an array?",
        options: [
            "Random access is not possible",
            "Insertion and deletion are expensive",
            "Indexing is not allowed",
            "Uses pointers for memory allocation"
        ],
        answer: "Insertion and deletion are expensive",
        explanation: "In arrays, inserting or deleting an element requires shifting elements, making these operations costly in terms of time complexity (O(n) in most cases)."
    },

    // Operations on Arrays

    {
        type: "mcq",
        question: "Which of the following is true about deleting an element from an array?",
        options: [
            "It takes O(1) time complexity always",
            "It requires shifting elements in most cases",
            "It does not require shifting in any case",
            "Deletion is not possible in arrays"
        ],
        answer: "It requires shifting elements in most cases",
        explanation: "When an element is deleted from an array, the remaining elements must be shifted to maintain continuity, making deletion an O(n) operation."
    },

    {
        type: "mcq",
        question: "What happens when you try to access an index out of bounds in an array?",
        options: [
            "Returns a default value",
            "Throws an error or exception",
            "Allocates new memory for that index",
            "Returns NULL"
        ],
        answer: "Throws an error or exception",
        explanation: "Accessing an out-of-bounds index in an array often results in an error or an exception, depending on the language. In C, it may lead to undefined behavior."
    },

    {
        type: "mcq",
        question: "If an array stores elements of size 4 bytes, and its base address is 1000, what is the address of the element at index 3?",
        options: ["1012", "1003", "1006", "1014"],
        answer: "1012",
        explanation: "Address of an element is calculated as `base_address + (index * size)`. So, `1000 + (3 * 4) = 1012`."
    },

    // Multi-Dimensional Arrays

    {
        type: "mcq",
        question: "How do you declare a 2D array in C?",
        options: [
            "int arr[2,3];",
            "int arr[2][3];",
            "int arr[3][2];",
            "int arr(2,3);"
        ],
        answer: "int arr[2][3];",
        explanation: "In C, multi-dimensional arrays are declared using square brackets: `int arr[rows][columns]`."
    },

    {
        type: "mcq",
        question: "How is a 2D array stored in memory?",
        options: [
            "Row-Major Order",
            "Column-Major Order",
            "Both Row-Major and Column-Major",
            "None of the above"
        ],
        answer: "Both Row-Major and Column-Major",
        explanation: "Different systems use different methods. C/C++ use row-major order, while Fortran uses column-major order."
    },

    {
        type: "mcq",
        question: "How do you access the element at row index 2 and column index 3 of a 2D array in C?",
        options: [
            "arr[2,3]",
            "arr[3][2]",
            "arr[2][3]",
            "arr(2,3)"
        ],
        answer: "arr[2][3]",
        explanation: "In C, the correct syntax for accessing a 2D array element is `arr[row][column]`."
    },

    // Miscellaneous

    {
        type: "mcq",
        question: "Which of the following statements is true about dynamic arrays?",
        options: [
            "They cannot grow beyond their initial size",
            "They are allocated on the heap",
            "They use linked lists internally",
            "They do not support random access"
        ],
        answer: "They are allocated on the heap",
        explanation: "Dynamic arrays are stored in heap memory and can resize dynamically as needed, unlike static arrays."
    }

];



const interactiveQuestions = [
    generateInsertQuestion(),
    generateDeleteQuestion(),
    generateUpdateQuestion(),
    // generateSearchQuestion()
];

// Combine and shuffle questions
const allQuestions = [...mcqQuestions, ...interactiveQuestions];

export default allQuestions.sort(() => Math.random() - 0.5);  // Shuffle questions

