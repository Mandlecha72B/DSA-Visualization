
import React, { useState } from 'react';

import CircularMenuExample from './CircularMenuExample';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Profile from './Profile';
import CardsGrid from './CardsGrid';

const HomePage = ({ handleLogout }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const topics = [
        { title: "Array", description: "An array is a data structure used to store multiple elements in a single variable." },
        { title: "Stack", description: "A stack is a LIFO data structure used for managing function calls and more." },
        { title: "Queue", description: "A queue is a FIFO data structure used in scheduling and buffering tasks." },
        { title: "Linked List", description: "A linked list is a linear data structure where elements are linked using pointers." },
        { title: "Graph", description: "A graph is a collection of nodes connected by edges, useful for modeling networks." },
        { title: "Tree", description: "A tree is a hierarchical data structure used in searching and sorting algorithms." },
        { title: "Binary Tree", description: "A binary tree is a type of tree where each node has at most two children." },
        { title: "BST", description: "A Binary Search Tree is a binary tree that maintains sorted order for efficient searching." },
        { title: "Trie", description: "A trie is a tree-like structure used for storing strings and performing searches efficiently." },
        { title: "Hashmap", description: "A hashmap is a key-value pair data structure providing fast lookups." },
        { title: "Prim's Algorithm", description: "An algorithm used to find the Minimum Spanning Tree of a graph." },
        { title: "Dijkstra's Algorithm", description: "An algorithm for finding the shortest paths between nodes in a graph." },
        { title: "Kruskal's Algorithm", description: "An algorithm used to find the Minimum Spanning Tree of a graph using edges." },
        { title: "Kosaraju's Algorithm", description: "A graph algorithm used for finding Strongly Connected Components." },
        { title: "String", description: "A string is a sequence of characters used for text processing." },
        { title: "Bellman-Ford Algorithm", description: "An algorithm used for finding shortest paths in a weighted graph." },
        { title: "Floyd-Warshall Algorithm", description: "An algorithm for finding all pairs shortest paths in a graph." },
        { title: "Heap", description: "A heap is a specialized tree-based data structure used in priority queues." },
        { title: "Recursion", description: "Recursion is a programming technique where a function calls itself to solve problems." },
        { title: "Backtracking", description: "Backtracking is an algorithmic technique used for solving constraint satisfaction problems." },
    ];

    

    

    return (
        <div className="relative min-h-screen">
            {/* Header with Proper Layout*/ }
            <header className="w-full flex justify-between items-center px-4 sm:px-6 lg:px-10 py-4 shadow-md fixed top-0 left-0 z-50 ">
                <Logo />
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <Profile handleLogout={handleLogout} />
            </header>

            {/* Spacing for Fixed Header*/ }
            <div className="pt-20 sm:pt-24"></div>

            {/* Main Content*/ }
            <main className="flex justify-center items-center px-4 py-6">
                <CardsGrid topics={topics} searchQuery={searchQuery} />
            </main>

            {/* 🔹 Floating Circular Menu (Bottom-Right)*/ }
            <footer className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
                <CircularMenuExample />
            </footer>
        </div>
    
    );


};

export default HomePage;



//SINGLE PAGE APPLICATION
/*import React from "react";
import { useOutletContext } from "react-router-dom";
import CardsGrid from "./CardsGrid";

const HomePage = () => {
    const { searchQuery } = useOutletContext(); // Get searchQuery from MainLayout

    const topics = [
        { title: "Array", description: "An array is a data structure used to store multiple elements in a single variable." },
        { title: "Stack", description: "A stack is a LIFO data structure used for managing function calls and more." },
        { title: "Queue", description: "A queue is a FIFO data structure used in scheduling and buffering tasks." },
        { title: "Linked List", description: "A linked list is a linear data structure where elements are linked using pointers." },
        { title: "Graph", description: "A graph is a collection of nodes connected by edges, useful for modeling networks." },
        { title: "Tree", description: "A tree is a hierarchical data structure used in searching and sorting algorithms." },
        { title: "Binary Tree", description: "A binary tree is a type of tree where each node has at most two children." },
        { title: "BST", description: "A Binary Search Tree is a binary tree that maintains sorted order for efficient searching." },
        { title: "Trie", description: "A trie is a tree-like structure used for storing strings and performing searches efficiently." },
        { title: "Hashmap", description: "A hashmap is a key-value pair data structure providing fast lookups." },
        { title: "Prim's Algorithm", description: "An algorithm used to find the Minimum Spanning Tree of a graph." },
        { title: "Dijkstra's Algorithm", description: "An algorithm for finding the shortest paths between nodes in a graph." },
        { title: "Kruskal's Algorithm", description: "An algorithm used to find the Minimum Spanning Tree of a graph using edges." },
        { title: "Kosaraju's Algorithm", description: "A graph algorithm used for finding Strongly Connected Components." },
        { title: "String", description: "A string is a sequence of characters used for text processing." },
        { title: "Bellman-Ford Algorithm", description: "An algorithm used for finding shortest paths in a weighted graph." },
        { title: "Floyd-Warshall Algorithm", description: "An algorithm for finding all pairs shortest paths in a graph." },
        { title: "Heap", description: "A heap is a specialized tree-based data structure used in priority queues." },
        { title: "Recursion", description: "Recursion is a programming technique where a function calls itself to solve problems." },
        { title: "Backtracking", description: "Backtracking is an algorithmic technique used for solving constraint satisfaction problems." },
    ];

    // 🔍 Filter topics based on search query
    
    return (
        <div className="flex justify-center items-center px-4 py-6">
            <CardsGrid topics={topics} searchQuery={searchQuery} />
        </div>
    );
};

export default HomePage;*/




/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CircularMenuExample from './CircularMenuExample';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Profile from './Profile';
import CardsGrid from './CardsGrid';

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState(""); // 🔹 Add search state

    const topics = [
        { title: "Array", description: "An array is a data structure used to store multiple elements in a single variable." },
        { title: "Stack", description: "A stack is a LIFO data structure used for managing function calls and more." },
        { title: "Queue", description: "A queue is a FIFO data structure used in scheduling and buffering tasks." },
        { title: "Linked List", description: "A linked list is a linear data structure where elements are linked using pointers." },
        { title: "Graph", description: "A graph is a collection of nodes connected by edges, useful for modeling networks." },
        { title: "Tree", description: "A tree is a hierarchical data structure used in searching and sorting algorithms." },
        { title: "Binary Tree", description: "A binary tree is a type of tree where each node has at most two children." },
        { title: "BST", description: "A Binary Search Tree is a binary tree that maintains sorted order for efficient searching." },
        { title: "Trie", description: "A trie is a tree-like structure used for storing strings and performing searches efficiently." },
        { title: "Hashmap", description: "A hashmap is a key-value pair data structure providing fast lookups." },
        { title: "Prim's Algorithm", description: "An algorithm used to find the Minimum Spanning Tree of a graph." },
        { title: "Dijkstra's Algorithm", description: "An algorithm for finding the shortest paths between nodes in a graph." },
        { title: "Kruskal's Algorithm", description: "An algorithm used to find the Minimum Spanning Tree of a graph using edges." },
        { title: "Kosaraju's Algorithm", description: "A graph algorithm used for finding Strongly Connected Components." },
        { title: "String", description: "A string is a sequence of characters used for text processing." },
        { title: "Bellman-Ford Algorithm", description: "An algorithm used for finding shortest paths in a weighted graph." },
        { title: "Floyd-Warshall Algorithm", description: "An algorithm for finding all pairs shortest paths in a graph." },
        { title: "Heap", description: "A heap is a specialized tree-based data structure used in priority queues." },
        { title: "Recursion", description: "Recursion is a programming technique where a function calls itself to solve problems." },
        { title: "Backtracking", description: "Backtracking is an algorithmic technique used for solving constraint satisfaction problems." },
    ];

    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.success('Logged out successfully');
            navigate('/');
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong. Please try again!');
        }
    };

    return (
        <div>
            {/* Header }
            <header>
                <Logo />
                <div>
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </div>
                <Profile handleLogout={handleLogout} />
            </header>

            {/* Main Content }
            <CardsGrid topics={topics} searchQuery={searchQuery} />

            {/* Circular Menu (Bottom-Right Corner) }
            <footer>
                <CircularMenuExample />
            </footer>
        </div>
    );
};

export default HomePage;*/


