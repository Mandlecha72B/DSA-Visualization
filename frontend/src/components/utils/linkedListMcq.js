
const mcqQuestions = [
    {
        "type": "mcq",
        "question": "Which approach is correct to delete a node with a given key in a singly linked list?",
        "options": [
            "Traverse the list and update the previous node's next pointer",
            "Set the current node to null without updating pointers",
            "Reverse the list and delete the first occurrence",
            "Always delete the head node first"
        ],
        "answer": "Traverse the list and update the previous node's next pointer",
        "explanation": "To delete a node, the previous node's `next` should be updated to skip the node to be deleted."
    },
    {
        "type": "mcq",
        "question": "Which line should replace `/* missing line */` to correctly insert a node at the end of a singly linked list?\n\n```javascript\nclass Node {\n    constructor(data) {\n        this.data = data;\n        this.next = null;\n    }\n}\n\nclass LinkedList {\n    constructor() {\n        this.head = null;\n    }\n    insertEnd(data) {\n        let newNode = new Node(data);\n        if (!this.head) {\n            this.head = newNode;\n            return;\n        }\n        let temp = this.head;\n        while (temp.next) {\n            temp = temp.next;\n        }\n        /* missing line */\n    }\n}\n```\n",
        "options": [
            "temp = newNode;",
            "temp.next = newNode;",
            "newNode.next = temp;",
            "temp.next = null;"
        ],
        "answer": "temp.next = newNode;",
        "explanation": "To insert at the end, the last node's `next` should point to the new node."
    },
    {
        "type": "mcq",
        "question": "What will be the output of the following JavaScript code snippet?\n\n```javascript\nclass Node {\n    constructor(data) {\n        this.data = data;\n        this.next = null;\n    }\n}\n\nlet head = new Node(10);\nhead.next = new Node(20);\nhead.next.next = new Node(30);\nconsole.log(head.next.data);\n```\n",
        "options": [
            "10",
            "20",
            "30",
            "null"
        ],
        "answer": "20",
        "explanation": "The second node's data value is 20, which is accessed using `head.next.data`."
    },
    {
        "type": "mcq",
        "question": "Which of the following is true about a singly linked list?",
        "options": [
            "Each node contains a data field and two pointers",
            "The last node of the linked list points to the first node",
            "Each node contains a data field and a pointer to the next node",
            "The size of a linked list must be defined at initialization"
        ],
        "answer": "Each node contains a data field and a pointer to the next node",
        "explanation": "A singly linked list consists of nodes where each node has a data part and a pointer to the next node."
    },
    {
        "type": "mcq",
        "question": "What is the time complexity for searching an element in an unsorted singly linked list with `n` nodes?",
        "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)"
        ],
        "answer": "O(n)",
        "explanation": "In an unsorted singly linked list, searching requires traversing the list node by node, leading to O(n) time complexity."
    },
    {
        "type": "mcq",
        "question": "Which approach is correct to delete a node with a given key in a singly linked list?",
        "options": [
            "Traverse the list and update the previous node's next pointer",
            "Set the current node to null without updating pointers",
            "Reverse the list and delete the first occurrence",
            "Always delete the head node first"
        ],
        "answer": "Traverse the list and update the previous node's next pointer",
        "explanation": "To delete a node, the previous node's `next` should be updated to skip the node to be deleted."
    },
    {
        "type": "mcq",
        "question": "What will be the output of the following JavaScript code snippet?\n\n```javascript\nclass Node {\n    constructor(data) {\n        this.data = data;\n        this.next = null;\n    }\n}\n\nclass LinkedList {\n    constructor() {\n        this.head = null;\n    }\n    add(data) {\n        let newNode = new Node(data);\n        newNode.next = this.head;\n        this.head = newNode;\n    }\n    print() {\n        let temp = this.head;\n        while (temp) {\n            console.log(temp.data);\n            temp = temp.next;\n        }\n    }\n}\n\nlet list = new LinkedList();\nlist.add(10);\nlist.add(20);\nlist.add(30);\nlist.print();\n```\n",
        "options": [
            "10 20 30",
            "30 20 10",
            "30 10 20",
            "20 30 10"
        ],
        "answer": "30 20 10",
        "explanation": "Since new nodes are added at the head, the order of insertion is reversed when printed."
    },
    {
        "type": "mcq",
        "question": "Which algorithm is commonly used to detect a cycle in a linked list?",
        "options": [
            "Dijkstra’s Algorithm",
            "Floyd’s Cycle Detection Algorithm",
            "Prim’s Algorithm",
            "Kruskal’s Algorithm"
        ],
        "answer": "Floyd’s Cycle Detection Algorithm",
        "explanation": "Floyd’s Cycle Detection Algorithm (Tortoise and Hare) uses two pointers moving at different speeds to detect a cycle."
    },
    {
        "type": "mcq",
        "question": "Which line should replace `/* missing line */` to correctly reverse a singly linked list?\n\n```javascript\nclass Node {\n    constructor(data) {\n        this.data = data;\n        this.next = null;\n    }\n}\n\nclass LinkedList {\n    constructor() {\n        this.head = null;\n    }\n    reverse() {\n        let prev = null;\n        let current = this.head;\n        let next = null;\n        while (current) {\n            next = current.next;\n            /* missing line */\n            prev = current;\n            current = next;\n        }\n        this.head = prev;\n    }\n}\n```\n",
        "options": [
            "current.next = next;",
            "next.next = prev;",
            "current.next = prev;",
            "prev = next;"
        ],
        "answer": "current.next = prev;",
        "explanation": "To reverse a linked list, each node’s `next` pointer must be set to the previous node."
    },
    {
        "type": "mcq",
        "question": "Which of the following is an advantage of a doubly linked list over a singly linked list?",
        "options": [
            "Requires less memory per node",
            "Can be traversed in both forward and backward directions",
            "Insertion and deletion take constant time",
            "More efficient searching"
        ],
        "answer": "Can be traversed in both forward and backward directions",
        "explanation": "A doubly linked list allows traversal in both directions due to its extra pointer to the previous node."
    },
    {
        "type": "mcq",
        "question": "Which of the following is true about a circular linked list?",
        "options": [
            "The last node always points to null",
            "It does not require a head pointer",
            "It can be singly or doubly linked",
            "It cannot have more than two nodes"
        ],
        "answer": "It can be singly or doubly linked",
        "explanation": "A circular linked list can be singly linked (last node points to head) or doubly linked (last node points to head, and head points to last node)."
    },
    {
        "type": "mcq",
        "question": "What is the space complexity of reversing a linked list iteratively versus recursively?",
        "options": [
            "Both iterative and recursive approaches take O(n) space",
            "Iterative approach takes O(1) space, while recursive approach takes O(n) space",
            "Iterative approach takes O(n) space, while recursive approach takes O(1) space",
            "Both iterative and recursive approaches take O(1) space"
        ],
        "answer": "Iterative approach takes O(1) space, while recursive approach takes O(n) space",
        "explanation": "The iterative approach uses a constant number of pointers (O(1)), while the recursive approach uses O(n) space for the call stack."
    },
    {
        "type": "mcq",
        "question": "What is the time complexity of reversing a singly linked list iteratively?",
        "options": [
            "O(1)",
            "O(n)",
            "O(n log n)",
            "O(n^2)"
        ],
        "answer": "O(n)",
        "explanation": "Each node is visited once and updated, making the operation O(n)."
    },
    {
        "type": "mcq",
        "question": "What is the worst-case time complexity of deleting a node with a given value from a singly linked list?",
        "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)"
        ],
        "answer": "O(n)",
        "explanation": "In the worst case, the node to be deleted may be at the end of the list, requiring a full traversal."
    },
    {
        "type": "mcq",
        "question": "What is the time complexity of inserting a new node at the end of a singly linked list when only the head pointer is given?",
        "options": [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n log n)"
        ],
        "answer": "O(n)",
        "explanation": "Inserting at the end requires traversing the entire list to find the last node, leading to O(n) time complexity."
    },
    {
        "type": "mcq",
        "question": "What is the time complexity of inserting a new node at the head of a singly linked list?",
        "options": [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n log n)"
        ],
        "answer": "O(1)",
        "explanation": "Insertion at the head requires only updating one pointer, making it a constant time O(1) operation."
    },
    {
        "type": "mcq",
        "question": "What is the worst-case time complexity of searching for an element in a singly linked list?",
        "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)"
        ],
        "answer": "O(n)",
        "explanation": "In the worst case, the entire linked list must be traversed to find an element, leading to O(n) time complexity."
    },
    {
        "type": "mcq",
        "question": "What is the space complexity of a linked list with `n` nodes?",
        "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
        ],
        "answer": "O(n)",
        "explanation": "Each node in a linked list requires separate memory allocation, leading to O(n) space complexity."
    },
    {
        "type": "mcq",
        "question": "How does a circular linked list differ from a singly linked list?",
        "options": [
            "A circular linked list does not have a head node",
            "The last node points back to the first node instead of null",
            "Each node points to itself",
            "A circular linked list can only be doubly linked"
        ],
        "answer": "The last node points back to the first node instead of null",
        "explanation": "In a circular linked list, the last node’s next pointer references the head instead of being null."
    },
    {
        "type": "mcq",
        "question": "What additional pointer does a doubly linked list node contain compared to a singly linked list node?",
        "options": [
            "Pointer to the next node",
            "Pointer to the previous node",
            "Pointer to both next and previous nodes",
            "Pointer to the last node"
        ],
        "answer": "Pointer to both next and previous nodes",
        "explanation": "A doubly linked list node contains two pointers: one to the next node and another to the previous node."
    },
    {
        "type": "mcq",
        "question": "Which of the following is NOT a characteristic of a singly linked list?",
        "options": [
            "Each node has a pointer to the next node",
            "The last node points to null",
            "It can be traversed in both directions",
            "Insertion and deletion are efficient compared to arrays"
        ],
        "answer": "It can be traversed in both directions",
        "explanation": "A singly linked list allows traversal only in one direction, unlike a doubly linked list."
    },

    {
        "type": "mcq",
        "question": "What is the time complexity of deleting the last node in a singly linked list when only the head pointer is given?",
        "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)"
        ],
        "answer": "O(n)",
        "explanation": "To delete the last node, the entire list must be traversed to find the second-to-last node, leading to O(n) time complexity."
    },
    {
        "type": "mcq",
        "question": "What is the space complexity of a doubly linked list with `n` nodes?",
        "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
        ],
        "answer": "O(n)",
        "explanation": "Each node in a doubly linked list requires additional space for two pointers, leading to O(n) space complexity."
    }
];

export default mcqQuestions.sort(() => Math.random() - 0.5);  // Shuffle questions