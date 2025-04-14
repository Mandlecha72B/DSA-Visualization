import { useState, useEffect, useRef } from "react";
import Header from "../Header";
import Footer from "../Footer";
import CircularMenuExample from "../CircularMenuExample";
import PseudoCode from "../PseudoCode";
import ExplanationCollapse from "../ExplanationCollapse";
import StackForm from "./StackForm";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const StackSimulation = ({ handleLogout }) => {
    const [stack, setStack] = useState([]);
    const [maxSize, setMaxSize] = useState(5);
    const [operationType, setOperationType] = useState("push");
    const [explanation, setExplanation] = useState("");
    const [highlightedLine, setHighlightedLine] = useState(-1);
    const [bookNumber, setBookNumber] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isPlaying, setIsPlaying] = useState(true);
    const [history, setHistory] = useState([]);
    const [simulationSpeed, setSimulationSpeed] = useState(1000);
    const [speed, setSpeed] = useState(1);
    const [highlightedBooks, setHighlightedBooks] = useState([]);
    const stackContainerRef = useRef(null);

    // Book images (replace with your actual paths)
    const bookImages = [
        "/assets/books/book1.png",
        "/assets/books/book2.png",
        "/assets/books/book3.png",
        "/assets/books/book4.png",
    ];

    const pseudoCode = {
        push: [
            "if (top === capacity - 1)",
            "   double stack capacity",
            "top++",
            "stack[top] = element",
        ],
        pop: [
            "if (top === -1)",
            "   throw underflow error",
            "temp = stack[top]",
            "top--",
            "return temp",
        ],
        peek: ["return stack[top]"],
        search: [
            "for (i = top; i >= 0; i--)",
            "   if (stack[i] === query)",
            "       mark occurrence",
        ],
    };

    useEffect(() => {
        setHighlightedLine(-1);
        setExplanation("");
    }, [operationType]);

    useEffect(() => {
        if (stackContainerRef.current) {
            // Scroll to bottom (showing table and latest books) when stack updates
            // stackContainerRef.current.scrollTop =
            //   stackContainerRef.current.scrollHeight;
            stackContainerRef.current.scrollTop = 0;
        }
    }, [stack]);

    const animateSearch = async (indices) => {
        setHighlightedBooks(indices);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setHighlightedBooks([]);
    };

    const handlePush = async () => {
        if (!isPlaying) {
            toast.error("Simulation is paused. Press Play to continue.");
            return;
        }

        if (!bookNumber) {
            toast.error("Please enter a book number!");
            return;
        }

        const newStack = [...stack];
        let currentSize = newStack.length;

        // Dynamic resizing
        if (currentSize >= maxSize) {
            setHighlightedLine(0);
            setExplanation("Stack is full! Resizing capacity...");
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));

            setMaxSize(maxSize * 2);
            setHighlightedLine(1);
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));
        }

        setHighlightedLine(2);
        setExplanation(`Adding book ${bookNumber} to top`);

        newStack.push({
            number: bookNumber,
            image: bookImages[Math.floor(Math.random() * bookImages.length)],
        });

        setStack(newStack);
        setHistory([...history, newStack]);
        setHighlightedLine(3);
        await new Promise((resolve) => setTimeout(resolve, simulationSpeed));
        setBookNumber("");

        // Auto-scroll to bottom
        if (stackContainerRef.current) {
            stackContainerRef.current.scrollTop =
                stackContainerRef.current.scrollHeight;
        }
    };

    const handlePop = async () => {
        if (!isPlaying) {
            toast.error("Simulation is paused. Press Play to continue.");
            return;
        }

        if (stack.length === 0) {
            toast.error("Stack is empty!");
            return;
        }

        setHighlightedLine(0);
        setExplanation("Removing top element...");
        await new Promise((resolve) => setTimeout(resolve, simulationSpeed));

        const newStack = [...stack];
        newStack.pop();
        setStack(newStack);
        setHistory([...history, newStack]);

        setHighlightedLine(3);
        await new Promise((resolve) => setTimeout(resolve, simulationSpeed));
    };

    const handleSearch = async () => {
        if (!searchQuery) {
            toast.error("Enter search query!");
            return;
        }

        const indices = stack
            .map((book, idx) => (book.number === searchQuery ? idx : -1))
            .filter((idx) => idx !== -1);

        if (indices.length === 0) {
            toast.error("Book not found!");
            return;
        }

        setHighlightedLine(0);
        setExplanation(`Searching for "${searchQuery}"...`);
        await animateSearch(indices);
        setSearchQuery("");
    };

    const handlePeek = async () => {
        if (stack.length === 0) {
            toast.error("Stack is empty!");
            return;
        }

        setHighlightedBooks([stack.length - 1]);
        setExplanation(`Top element: ${stack[stack.length - 1].number}`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setHighlightedBooks([]);
    };

    const handleClear = () => {
        setStack([]);
        setHistory([]);
        setExplanation("Stack cleared");
    };

    const handlePlayPause = () => setIsPlaying(!isPlaying);
    const handleReset = () => {
        setStack([]);
        setHistory([]);
    };
    const changeSpeed = (newSpeed) => setSimulationSpeed(1000 / newSpeed);

    return (
        <div className="flex flex-col items-center min-h-screen">
            <Header handleLogout={handleLogout} text={"Book Stack System"} />
            <div className="w-full max-w-5xl px-4 sticky top-16 z-10">
                <StackForm
                    maxSize={maxSize}
                    bookNumber={bookNumber}
                    setBookNumber={setBookNumber}
                    operationType={operationType}
                    setOperationType={setOperationType}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handlePush={handlePush}
                    handlePop={handlePop}
                    handlePeek={handlePeek}
                    handleSearch={handleSearch}
                    handleClear={handleClear}
                    size={stack.length}
                />
            </div>

            {/* <div className="relative mt-28 w-full overflow-y-auto flex flex-col items-center bg-red-200">
        <div
          ref={stackContainerRef}
          className="h-96 w-full max-w-2xl  bg-blue-300"
          style={{
            background:
              "url('/assets/wooden-table.png') no-repeat scroll bottom ",
            backgroundSize: "100% 250px", // Full width, fixed height
          }}
        >
          <div className="min-h-full pt-4 pb-32 flex flex-col-reverse justify-end">
            {stack.map((book, index) => (
              <div
                key={index}
                className="relative mx-auto transition-all duration-500 hover:translate-y-2"
                style={{
                  zIndex: index + 1,
                  width: "200px",
                  marginBottom: "10px",
                  transform: `scale(${1 - (stack.length - index - 1) * 0.03})`,
                }}
              >
                <img
                  src={book.image}
                  alt={`Book ${book.number}`}
                  className={`w-full h-auto shadow-xl ${
                    highlightedBooks.includes(index)
                      ? "animate-pulse ring-4 ring-white"
                      : ""
                  }`}
                />
                <div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
            bg-black bg-opacity-50 text-white px-2 rounded"
                >
                  #{book.number}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

            <div className="relative mt-36 w-full flex flex-col items-center">
                <div
                    ref={stackContainerRef}
                    className="h-96 w-full max-w-2xl overflow-y-auto relative"
                >
                    {/* Books container with reverse order */}
                    <div className="min-h-full pb-10 flex flex-col-reverse">
                        <div
                            className="w-full h-40"
                            style={{
                                background: "url('/assets/wooden-table.png') no-repeat bottom",
                                backgroundSize: "100% 125%",
                                zIndex: 0,
                            }}
                        />
                        {stack.map((book, index) => (
                            <div
                                key={index}
                                className="mx-auto mb-1 transition-all duration-500 relative"
                                style={{
                                    width: "200px",
                                    transform: `scale(${1 - index * 0.03})`,
                                    zIndex: stack.length - index + 1,
                                    marginTop: index >= 5 ? "-20px" : "-10px",
                                    // marginTop: "-10px",
                                    marginBottom: index === 0 ? "-125px" : "0",
                                }}
                            >
                                <img
                                    src={book.image}
                                    alt={`Book ${book.number}`}
                                    className={`w-full h-auto shadow-xl ${highlightedBooks.includes(index)
                                            ? "animate-pulse ring-4 ring-white"
                                            : ""
                                        }`}
                                />
                                <div
                                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 
                bg-black bg-opacity-70 text-white px-2 rounded text-sm"
                                >
                                    #{book.number}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <PseudoCode>
                <ul className="space-y-1">
                    {pseudoCode[operationType]?.map((line, index) => (
                        <li
                            key={index}
                            className={`p-1 font-mono ${highlightedLine === index
                                    ? "bg-blue-100 text-blue-900 font-bold border-l-4 border-blue-900"
                                    : ""
                                }`}
                        >
                            {line}
                        </li>
                    ))}
                </ul>
            </PseudoCode>
            <ExplanationCollapse>
                <p className="text-lg">{explanation}</p>
                {operationType === "peek" && stack.length > 0 && (
                    <div className="mt-2 p-2 bg-yellow-100 rounded">
                        Top Element: {stack[stack.length - 1].number}
                    </div>
                )}
            </ExplanationCollapse>
            <CircularMenuExample
                iconSizeOverride={14}
                itemSizeOverride={1}
                radiusOverride={2}
            />
            <Footer
                isPlaying={isPlaying}
                handlePlayPause={handlePlayPause}
                speed={speed}
                setSpeed={setSpeed}
                changeSpeed={changeSpeed}
                onReset={handleReset}
            />
        </div>
    );
};

export default StackSimulation;
