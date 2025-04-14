const stackMCQQuestions = [
    {
        type: "mcq",
        question: "What is the fundamental principle of stack data structure?",
        options: [
            "First-In-First-Out (FIFO)",
            "Last-In-First-Out (LIFO)",
            "Random Access",
            "Priority-Based",
        ],
        answer: "Last-In-First-Out (LIFO)",
        explanation:
            "Stacks follow the LIFO principle where the last element pushed is the first to be popped.",
    },
    {
        type: "mcq",
        question: "Which of the following is NOT a standard stack operation?",
        options: ["push()", "pop()", "peek()", "shift()"],
        answer: "shift()",
        explanation:
            "shift() is a queue operation that removes from the front, not a stack operation.",
    },
    {
        type: "mcq",
        question: "What is the time complexity of push operation in a stack?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(1)",
        explanation:
            "Push operation in stacks takes constant time as it only adds to the top.",
    },
    {
        type: "mcq",
        question: "What happens when you try to pop from an empty stack?",
        options: [
            "Returns null",
            "Returns undefined",
            "Throws an underflow error",
            "Returns -1",
        ],
        answer: "Throws an underflow error",
        explanation:
            "Popping from an empty stack results in stack underflow error.",
    },
    {
        type: "mcq",
        question: "Which operation returns the top element without removing it?",
        options: ["push()", "pop()", "peek()", "top()"],
        answer: "peek()",
        explanation:
            "peek() (or top()) lets you examine the top element without modification.",
    },
    {
        type: "mcq",
        question: "What is the space complexity of a stack storing n elements?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(n)",
        explanation:
            "A stack requires linear space proportional to number of elements.",
    },
    {
        type: "mcq",
        question: "Which real-world scenario best represents stack behavior?",
        options: [
            "People waiting in a ticket line",
            "Plates stacked in a cafeteria",
            "Cars in a parking lot",
            "Students in a classroom",
        ],
        answer: "Plates stacked in a cafeteria",
        explanation:
            "You take the top plate first (LIFO), just like stack operations.",
    },
    {
        type: "mcq",
        question:
            "What is the minimum number of stacks needed to implement a queue?",
        options: ["1", "2", "3", "4"],
        answer: "2",
        explanation: "You need two stacks to simulate FIFO queue behavior.",
    },
    {
        type: "mcq",
        question: "Which algorithm typically uses a stack for implementation?",
        options: [
            "Breadth-First Search",
            "Depth-First Search",
            "Dijkstra's Algorithm",
            "Binary Search",
        ],
        answer: "Depth-First Search",
        explanation:
            "DFS uses stack (either implicitly via recursion or explicitly).",
    },
    {
        type: "mcq",
        question: "What is the result of pushing 5, 3, 7 and then popping twice?",
        options: ["[5]", "[5,3]", "[7,3]", "[3,5]"],
        answer: "[5]",
        explanation:
            "After push(5), push(3), push(7), pop() removes 7, pop() removes 3.",
    },
    {
        type: "mcq",
        question: "Which data structure is commonly used to implement call stack?",
        options: ["Array", "Linked List", "Hash Table", "Binary Tree"],
        answer: "Array",
        explanation:
            "Call stacks are typically implemented using arrays for efficiency.",
    },
    {
        type: "mcq",
        question: "What is stack overflow?",
        options: [
            "Popping from empty stack",
            "Pushing when stack is full",
            "Accessing middle element",
            "Reversing stack order",
        ],
        answer: "Pushing when stack is full",
        explanation: "Stack overflow occurs when pushing beyond capacity.",
    },
    {
        type: "mcq",
        question: "Which application doesn't typically use stacks?",
        options: [
            "Undo functionality in editors",
            "Function call management",
            "CPU task scheduling",
            "Balancing parentheses",
        ],
        answer: "CPU task scheduling",
        explanation: "CPU scheduling typically uses queues (FIFO), not stacks.",
    },
    {
        type: "mcq",
        question:
            "What is the maximum number of pops needed to empty a stack of size n?",
        options: ["n", "n-1", "n+1", "log n"],
        answer: "n",
        explanation: "You need exactly n pop operations to empty the stack.",
    },
    {
        type: "mcq",
        question: "Which problem can be solved using stacks?",
        options: [
            "Reversing a string",
            "Finding shortest path",
            "Matrix multiplication",
            "Binary search",
        ],
        answer: "Reversing a string",
        explanation:
            "Strings can be reversed by pushing chars onto stack and popping them.",
    },
    {
        type: "mcq",
        question:
            "What is the result of evaluating postfix expression: 5 3 + 2 * ?",
        options: ["10", "16", "13", "21"],
        answer: "16",
        explanation: "5+3=8, 8*2=16 (stacks are used in postfix evaluation).",
    },
    {
        type: "mcq",
        question: "Which operation is not O(1) in stack implementation?",
        options: ["push()", "pop()", "peek()", "search()"],
        answer: "search()",
        explanation:
            "Searching requires O(n) time as you may need to traverse all elements.",
    },
    {
        type: "mcq",
        question: "What is the minimum stack size needed to evaluate: (a+b)*(c-d)?",
        options: ["2", "3", "4", "5"],
        answer: "2",
        explanation: "You need at most 2 operands on stack during evaluation.",
    },
    {
        type: "mcq",
        question: "Which browser feature uses stack behavior?",
        options: ["Bookmarks", "Back button", "Download manager", "Settings menu"],
        answer: "Back button",
        explanation: "Back button uses stack to track visited pages (LIFO).",
    },
    {
        type: "mcq",
        question: "What is the recursion depth limit primarily determined by?",
        options: ["Heap size", "Stack size", "CPU cache", "Disk space"],
        answer: "Stack size",
        explanation: "Each recursive call uses stack space, limited by stack size.",
    },
];

export default stackMCQQuestions.sort(() => Math.random() - 0.5); // Shuffle questions
