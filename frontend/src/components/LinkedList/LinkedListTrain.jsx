/*import React, { useEffect, useRef, useState } from "react";

const CirclesWithArrows = () => {
    const [circles, setCircles] = useState([1, 2, 3, 4]); // Initial circles
    const [newNumber, setNewNumber] = useState(""); // Number for new circle
    const [position, setPosition] = useState(""); // Position for new circle
    const [newCirclePos, setNewCirclePos] = useState(null); // Store position for the circle below
    const [relativeLeft, setRelativeLeft] = useState(0); // Store dynamic relative left position

    const lineRef = useRef(null); // Reference to the main line container

    // Calculate correct positioning (circle width and gap)
    useEffect(() => {
        const topCircles = lineRef.current.children; // Get all top circles
        let calculatedLeft;
        if (topCircles[newCirclePos]) {
            const circleWidth = topCircles[0].offsetWidth; // Circle width (64px)
            const gap = parseInt(getComputedStyle(lineRef.current).gap) || 24; // CSS gap between circles
            const svgWidth = 40; // Width of SVG arrow between circles

            // Calculate left position with accurate adjustments to center the new circle
            //const calculatedLeft =newCirclePos * (circleWidth + gap + svgWidth) + (circleWidth + 2 * gap + svgWidth) / 2;
            if (newCirclePos == 0) {
                calculatedLeft = 32;
            }
            calculatedLeft = newCirclePos * (circleWidth + 2 * gap + svgWidth);

            console.log(`New Circle Left Position: ${calculatedLeft}px`);
            setRelativeLeft(calculatedLeft); // Set calculated left position
        }
    }, [newCirclePos]); // Recalculate when `newCirclePos` changes


    // Handle Adding New Circle
    const handleAddCircle = () => {
        const pos = parseInt(position, 10);
        const num = parseInt(newNumber, 10);

        if (isNaN(pos) || pos < 1 || pos > circles.length || isNaN(num)) {
            alert("Please enter a valid position (1 to 4) and a valid number!");
            return;
        }

        setNewCirclePos(pos - 1); // Store the position to place the new circle below
        setNewNumber(num); // Store the new circle's number for rendering
        setPosition(""); // Reset input
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Input Form }
            <div className="flex gap-4 mb-6">
                <input
                    type="number"
                    placeholder="Position"
                    className="input input-bordered w-24"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Number"
                    className="input input-bordered w-24"
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddCircle}>
                    Add Circle
                </button>
            </div>

            {/* Main Line of Circles }
            <div className="relative">
                <div className="flex items-center gap-6" ref={lineRef}>
                    {circles.map((num, index) => (
                        <React.Fragment key={index}>
                            <div className="bg-blue-500 w-16 h-16 rounded-full flex justify-center items-center text-white text-lg shadow-lg">
                                {num}
                            </div>
                            {index < circles.length - 1 && (
                                <svg width="40" height="20">
                                    <line x1="0" y1="10" x2="40" y2="10" stroke="#333" strokeWidth="2" />
                                    <polygon points="30,5 40,10 30,15" fill="#333" />
                                </svg>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* New Circle Below the Line at Specified Position }
                {newCirclePos !== null && (
                    <div
                        className="absolute flex flex-col items-center"
                        style={{
                            position: "absolute",
                            left: `${relativeLeft}px`, // Dynamically calculated accurate left position
                            top: "120px", // Below the line
                        }}
                    >
                        

                        {/* New upward arrow SVG pointing to the top circle }
                        <svg
                            width="64"
                            height="40"
                            style={{
                                position: "absolute",
                                top: "-50px", // Adjust the vertical placement above the current line
                            }}
                        >
                            <line
                                x1="32" // Centering arrow base
                                y1="40"
                                x2="32" // Centering the line
                                y2="10"
                                stroke="#333"
                                strokeWidth="2"
                            />
                            <polygon
                                points="28,10 36,10 32,0"
                                fill="#333" // Upward pointing arrowhead
                            />
                        </svg>

                        <div className="bg-green-500 w-16 h-16 rounded-full flex justify-center items-center text-white text-lg shadow-lg">
                            {newNumber}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default CirclesWithArrows;*/

//arrow to below circle animation

/*import React, { useEffect, useRef, useState } from "react";

const CirclesWithArrows = () => {
    const [circles, setCircles] = useState([1, 2, 3, 4]); // Initial circles
    const [newNumber, setNewNumber] = useState(""); // Number for new circle
    const [position, setPosition] = useState(""); // Position for new circle
    const [newCirclePos, setNewCirclePos] = useState(null); // Store position for the circle below
    const [relativeLeft, setRelativeLeft] = useState(0); // Store dynamic relative left position
    const [showArrow, setShowArrow] = useState(false); // State to toggle arrow visibility after delay

    const lineRef = useRef(null); // Reference to the main line container

    // Calculate correct positioning (circle width and gap)
    useEffect(() => {
        const topCircles = lineRef.current.children; // Get all top circles
        let calculatedLeft;
        if (topCircles[newCirclePos]) {
            const circleWidth = topCircles[0].offsetWidth; // Circle width (64px)
            const gap = parseInt(getComputedStyle(lineRef.current).gap) || 24; // CSS gap between circles
            const svgWidth = 40; // Width of SVG arrow between circles

            if (newCirclePos == 0) {
                calculatedLeft = 32;
            }
            calculatedLeft = newCirclePos * (circleWidth + 2 * gap + svgWidth);

            console.log(`New Circle Left Position: ${calculatedLeft}px`);
            setRelativeLeft(calculatedLeft); // Set calculated left position

            // Delay to toggle arrow visibility after circle is placed
            setShowArrow(false); // Initially hide arrow
            setTimeout(() => setShowArrow(true), 500); // Show arrow after 500ms
        }
    }, [newCirclePos]); // Recalculate when `newCirclePos` changes

    // Handle Adding New Circle
    const handleAddCircle = () => {
        const pos = parseInt(position, 10);
        const num = parseInt(newNumber, 10);

        if (isNaN(pos) || pos < 1 || pos > circles.length || isNaN(num)) {
            alert("Please enter a valid position (1 to 4) and a valid number!");
            return;
        }

        setNewCirclePos(pos - 1); // Store the position to place the new circle below
        setNewNumber(num); // Store the new circle's number for rendering
        setPosition(""); // Reset input
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Input Form *}
            <div className="flex gap-4 mb-6">
                <input
                    type="number"
                    placeholder="Position"
                    className="input input-bordered w-24"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Number"
                    className="input input-bordered w-24"
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddCircle}>
                    Add Circle
                </button>
            </div>

            {/* Main Line of Circles *}
            <div className="relative">
                <div className="flex items-center gap-6" ref={lineRef}>
                    {circles.map((num, index) => (
                        <React.Fragment key={index}>
                            <div className="bg-blue-500 w-16 h-16 rounded-full flex justify-center items-center text-white text-lg shadow-lg">
                                {num}
                            </div>
                            {index < circles.length - 1 && (
                                <svg width="40" height="20">
                                    <line x1="0" y1="10" x2="40" y2="10" stroke="#333" strokeWidth="2" />
                                    <polygon points="30,5 40,10 30,15" fill="#333" />
                                </svg>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* New Circle Below the Line at Specified Position *}
                {newCirclePos !== null && (
                    <div
                        className="absolute flex flex-col items-center"
                        style={{
                            position: "absolute",
                            left: `${relativeLeft}px`,
                            top: "120px",
                        }}
                    >
                        {/* Display only after animation delay *}
                        {showArrow && (
                            <svg
                                width="64"
                                height="40"
                                style={{
                                    position: "absolute",
                                    top: "-50px",
                                }}
                            >
                                <line x1="32" y1="40" x2="32" y2="10" stroke="#333" strokeWidth="2" />
                                <polygon points="28,10 36,10 32,0" fill="#333" />
                            </svg>
                        )}

                        <div className="bg-green-500 w-16 h-16 rounded-full flex justify-center items-center text-white text-lg shadow-lg">
                            {newNumber}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CirclesWithArrows;*/

/*import React, { useEffect, useRef, useState } from "react";

const CirclesWithArrows = () => {
    const [circles, setCircles] = useState([1, 2, 3, 4]); // Initial circles
    const [newNumber, setNewNumber] = useState(""); // Number for new circle
    const [position, setPosition] = useState(""); // Position for new circle
    const [newCirclePos, setNewCirclePos] = useState(null); // Store position for the circle below
    const [relativeLeft, setRelativeLeft] = useState(0); // Store dynamic relative left position
    const [showArrow, setShowArrow] = useState(false); // State to toggle arrow after animation
    const [arrowStates, setArrowStates] = useState(
        Array(circles.length - 1).fill({ height: 20, transform: "none" })
    ); // Store arrow states dynamically

    const lineRef = useRef(null);
    let calculatedLeft;

    useEffect(() => {
        const topCircles = lineRef.current.children;

        if (topCircles[newCirclePos]) {
            const circleWidth = topCircles[0].offsetWidth;
            const gap = parseInt(getComputedStyle(lineRef.current).gap) || 24;
            const svgWidth = 40;

            if (newCirclePos === 0) {
                calculatedLeft = 32;
            }
            calculatedLeft = newCirclePos * (circleWidth + 2 * gap + svgWidth);

            setRelativeLeft(calculatedLeft);
            setShowArrow(false);

            setTimeout(() => {
                setShowArrow(true);
                adjustArrowToNewCircle(); // Adjust previous arrow after animation
            }, 500);
        }
    }, [newCirclePos]);

    const adjustArrowToNewCircle = () => {
        const newArrowStates = [...arrowStates];

        if (newCirclePos > 0) {
            // Increase length by 80 pixels diagonally (this can be dynamic based on distance)
            const increaseBy = 80;
            const diagonalIncrease = increaseBy / Math.sqrt(2); // To extend in both x and y directions

            // Calculate new coordinates for the end of the arrow
            const newX2 = 40 + diagonalIncrease; // Extend horizontally
            const newY2 = 40 + diagonalIncrease; // Extend vertically

            // Update the arrow's SVG line and arrowhead dynamically
            newArrowStates[newCirclePos - 1] = {
                height: 80, // The SVG height can remain the same since we are modifying the internal line
                transform: `rotate(45deg) translateY(80px)`,
                lineX2: newX2,
                lineY2: newY2,
            };
            setArrowStates(newArrowStates);
        }
    };


    const handleAddCircle = () => {
        const pos = parseInt(position, 10);
        const num = parseInt(newNumber, 10);

        if (isNaN(pos) || pos < 1 || pos > circles.length || isNaN(num)) {
            alert("Please enter a valid position (1 to 4) and a valid number!");
            return;
        }

        setNewCirclePos(pos - 1);
        setNewNumber(num);
        setPosition("");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex gap-4 mb-6">
                <input
                    type="number"
                    placeholder="Position"
                    className="input input-bordered w-24"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Number"
                    className="input input-bordered w-24"
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddCircle}>
                    Add Circle
                </button>
            </div>

            <div className="relative">
                <div className="flex items-center gap-6" ref={lineRef}>
                    {circles.map((num, index) => (
                        <React.Fragment key={index}>
                            <div className="bg-blue-500 w-16 h-16 rounded-full flex justify-center items-center text-white text-lg shadow-lg">
                                {num}
                            </div>
                            {index < circles.length - 1 && (
                                <svg
                                    width="40"
                                    height={arrowStates[index].height}
                                    style={{
                                        transition: "transform 0.5s, height 0.5s",
                                        transform: arrowStates[index].transform,
                                    }}
                                >
                                    <line
                                        x1="0"
                                        y1={arrowStates[index].height / 2}
                                        x2="40"
                                        y2={arrowStates[index].height / 2}
                                        stroke="#333"
                                        strokeWidth="2"
                                    />
                                    <polygon
                                        points={`30,${arrowStates[index].height / 2 - 5} 40,${arrowStates[index].height / 2} 30,${arrowStates[index].height / 2 + 5}`}
                                        fill="#333"
                                    />
                                </svg>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {newCirclePos !== null && (
                    <div
                        className="absolute flex flex-col items-center"
                        style={{
                            position: "absolute",
                            left: `${relativeLeft}px`,
                            top: "120px",
                        }}
                    >
                        {showArrow && (
                            <svg
                                width="64"
                                height="40"
                                style={{
                                    position: "absolute",
                                    top: "-50px",
                                }}
                            >
                                <line x1="32" y1="40" x2="32" y2="10" stroke="#333" strokeWidth="2" />
                                <polygon points="28,10 36,10 32,0" fill="#333" />
                            </svg>
                        )}

                        <div className="bg-green-500 w-16 h-16 rounded-full flex justify-center items-center text-white text-lg shadow-lg">
                            {newNumber}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CirclesWithArrows;*/


/*import React, { useEffect, useRef, useState } from "react";

const CirclesWithArrows = () => {
    const [circles, setCircles] = useState([1, 2, 3, 4]); // Initial circles
    const [newNumber, setNewNumber] = useState(""); // Number for new circle
    const [position, setPosition] = useState(""); // Position for new circle
    const [newCirclePos, setNewCirclePos] = useState(null); // Store position for the circle below
    const [relativeLeft, setRelativeLeft] = useState(0); // Store dynamic relative left position
    const [showArrow, setShowArrow] = useState(false); // State to toggle arrow after animation
    const [arrowStates, setArrowStates] = useState(
        Array(circles.length - 1).fill({ height: 20, transform: "none" })
    ); // Store arrow states dynamically

    const lineRef = useRef(null);
    let calculatedLeft;

    useEffect(() => {
        const topCircles = lineRef.current.children;

        if (topCircles[newCirclePos]) {
            const circleWidth = topCircles[0].offsetWidth;
            const gap = parseInt(getComputedStyle(lineRef.current).gap) || 24;
            const svgWidth = 40;

            if (newCirclePos === 0) {
                calculatedLeft = 32;
            }
            calculatedLeft = newCirclePos * (circleWidth + 2 * gap + svgWidth);

            setRelativeLeft(calculatedLeft);
            setShowArrow(false);

            setTimeout(() => {
                setShowArrow(true);
                adjustArrowToNewCircle(); // Adjust previous arrow after animation
            }, 500);
        }
    }, [newCirclePos]);

    const adjustArrowToNewCircle = () => {
        const newArrowStates = [...arrowStates];

        if (newCirclePos > 0) {
            newArrowStates[newCirclePos - 1] = {
                height: 80,
                transform: `rotate(45deg) translateY(70px)`,
            };
            setArrowStates(newArrowStates); // Update the arrow states dynamically
        }
    };

    const handleAddCircle = () => {
        const pos = parseInt(position, 10);
        const num = parseInt(newNumber, 10);

        if (isNaN(pos) || pos < 1 || pos > circles.length || isNaN(num)) {
            alert("Please enter a valid position (1 to 4) and a valid number!");
            return;
        }

        setNewCirclePos(pos - 1);
        setNewNumber(num);
        setPosition("");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex gap-4 mb-6">
                <input
                    type="number"
                    placeholder="Position"
                    className="input input-bordered w-24"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Number"
                    className="input input-bordered w-24"
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddCircle}>
                    Add Circle
                </button>
            </div>

            <div className="relative">
                <div className="flex items-center gap-6" ref={lineRef}>
                    {circles.map((num, index) => (
                        <React.Fragment key={index}>
                            <div className="bg-blue-500 w-16 h-16 rounded-full flex justify-center items-center text-white text-lg shadow-lg">
                                {num}
                            </div>
                            {index < circles.length - 1 && (
                                <svg
                                    width="40"
                                    height={arrowStates[index].height}
                                    style={{
                                        transition: "transform 0.5s, height 0.5s",
                                        transform: arrowStates[index].transform,
                                    }}
                                >
                                    <line
                                        x1="0"
                                        y1={arrowStates[index].height / 2}
                                        x2="40"
                                        y2={arrowStates[index].height / 2}
                                        stroke="#333"
                                        strokeWidth="2"
                                    />
                                    <polygon
                                        points={`30,${arrowStates[index].height / 2 - 5} 40,${arrowStates[index].height / 2} 30,${arrowStates[index].height / 2 + 5}`}
                                        fill="#333"
                                    />
                                </svg>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {newCirclePos !== null && (
                    <div
                        className="absolute flex flex-col items-center"
                        style={{
                            position: "absolute",
                            left: `${relativeLeft}px`,
                            top: "120px",
                        }}
                    >
                        {showArrow && (
                            <svg
                                width="64"
                                height="40"
                                style={{
                                    position: "absolute",
                                    top: "-50px",
                                }}
                            >
                                <line x1="32" y1="40" x2="32" y2="10" stroke="#333" strokeWidth="2" />
                                <polygon points="28,10 36,10 32,0" fill="#333" />
                            </svg>
                        )}

                        <div className="bg-green-500 w-16 h-16 rounded-full flex justify-center items-center text-white text-lg shadow-lg">
                            {newNumber}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CirclesWithArrows;*/

/*import React, { useEffect, useRef, useState } from "react";

const CirclesWithArrows = () => {
    const [circles, setCircles] = useState([1, 2, 3, 4]); // Initial circles
    const [newNumber, setNewNumber] = useState(""); // Number for new circle
    const [position, setPosition] = useState(""); // Position for new circle
    const [newCirclePos, setNewCirclePos] = useState(null); // Store position for the circle below
    const [relativeLeft, setRelativeLeft] = useState(0); // Store dynamic relative left position
    const [showArrow, setShowArrow] = useState(false); // State to toggle arrow after animation
    const [arrowStates, setArrowStates] = useState(
        Array(circles.length).fill({ height: 20, transform: "none" })
    ); // Store arrow states dynamically

    let calculatedLeft;
    const lineRef = useRef(null);

    useEffect(() => {
        const topCircles = lineRef.current.children;

        if (topCircles[newCirclePos]) {
            const circleWidth = topCircles[0].offsetWidth;
            const gap = parseInt(getComputedStyle(lineRef.current).gap) || 24;
            const svgWidth = 40;

            if (newCirclePos === 0) {
                calculatedLeft = 32;
            }
            calculatedLeft = newCirclePos * (circleWidth + 2 * gap + svgWidth);

            setRelativeLeft(calculatedLeft);
            setShowArrow(false);

            setTimeout(() => {
                setShowArrow(true);
                adjustArrowToNewCircle(); // Adjust previous arrow after animation
            }, 500);
        }
    }, [newCirclePos]);

    useEffect(() => {
        if (circles.length !== arrowStates.length) {
            const updatedArrowStates = Array(circles.length).fill({ height: 20, transform: "none" });
            setArrowStates(updatedArrowStates);
        }
    }, [circles]);

    const adjustArrowToNewCircle = () => {
        const newArrowStates = [...arrowStates];

        if (newCirclePos > 0) {
            // Update the arrow of the previous circle to transform upward and diagonal
            newArrowStates[newCirclePos - 1] = {
                height: 80,
                transform: `rotate(45deg) translateY(70px)`,
            };
            setArrowStates(newArrowStates);
        }

        // After arrow animation, insert the new circle and reset the arrow to horizontal
        setTimeout(() => {
            insertCircleInLine();
            resetArrowStates(); // Reset the arrow states to horizontal position
        }, 500);
    };

    const insertCircleInLine = () => {
        const newCircles = [...circles];
        newCircles.splice(newCirclePos, 0, parseInt(newNumber, 10)); // Insert new circle at the desired position

        // Update arrowStates length to match the new circles array length
        const newArrowStates = Array(newCircles.length).fill({ height: 20, transform: "none" });
        setArrowStates(newArrowStates); // Synchronize arrow states length

        setCircles(newCircles); // Update the circles array
        setNewCirclePos(null); // Reset the position for the next addition
    };


    const resetArrowStates = () => {
        // Reset all arrows to their original horizontal state
        const resetStates = arrowStates.map(() => ({
            height: 20,
            transform: "none",
        }));
        setArrowStates(resetStates);
    };

    const handleAddCircle = () => {
        const pos = parseInt(position, 10);
        const num = parseInt(newNumber, 10);

        if (isNaN(pos) || pos < 1 || pos > circles.length || isNaN(num)) {
            alert("Please enter a valid position (1 to 4) and a valid number!");
            return;
        }

        setNewCirclePos(pos - 1); // Set the new circle position (0-indexed)
        setNewNumber(num);
        setPosition("");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex gap-4 mb-6">
                <input
                    type="number"
                    placeholder="Position"
                    className="input input-bordered w-24"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Number"
                    className="input input-bordered w-24"
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddCircle}>
                    Add Circle
                </button>
            </div>

            <div className="relative">
                <div className="flex items-center gap-6" ref={lineRef}>
                    {circles.map((num, index) => (
                        <React.Fragment key={index}>
                            <div className="bg-blue-500 w-16 h-16 rounded-full flex justify-center items-center text-white text-lg shadow-lg">
                                {num}
                            </div>
                            {index < circles.length - 1 && (
                                <svg
                                    width="40"
                                    height={arrowStates[index].height}
                                    style={{
                                        transition: "transform 0.5s, height 0.5s",
                                        transform: arrowStates[index].transform,
                                    }}
                                >
                                    <line
                                        x1="0"
                                        y1={arrowStates[index].height / 2}
                                        x2="40"
                                        y2={arrowStates[index].height / 2}
                                        stroke="#333"
                                        strokeWidth="2"
                                    />
                                    <polygon
                                        points={`30,${arrowStates[index].height / 2 - 5} 40,${arrowStates[index].height / 2} 30,${arrowStates[index].height / 2 + 5}`}
                                        fill="#333"
                                    />
                                </svg>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {newCirclePos !== null && (
                    <div
                        className="absolute flex flex-col items-center"
                        style={{
                            position: "absolute",
                            left: `${relativeLeft}px`,
                            top: "120px",
                        }}
                    >
                        {showArrow && (
                            <svg
                                width="64"
                                height="40"
                                style={{
                                    position: "absolute",
                                    top: "-50px",
                                }}
                            >
                                <line x1="32" y1="40" x2="32" y2="10" stroke="#333" strokeWidth="2" />
                                <polygon points="28,10 36,10 32,0" fill="#333" />
                            </svg>
                        )}

                        <div className="bg-green-500 w-16 h-16 rounded-full flex justify-center items-center text-white text-lg shadow-lg">
                            {newNumber}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CirclesWithArrows;*/

/*import React, { useEffect, useRef, useState } from "react";

const CirclesWithArrows = () => {
    const [circles, setCircles] = useState([1, 2, 3, 4]); // Initial circles
    const [newNumber, setNewNumber] = useState(""); // Number for new circle
    const [position, setPosition] = useState(""); // Position for new circle
    const [newCirclePos, setNewCirclePos] = useState(null); // Store position for the circle below
    const [relativeLeft, setRelativeLeft] = useState(0); // Store dynamic relative left position
    const [showArrow, setShowArrow] = useState(false); // State to toggle arrow after animation
    const [arrowStates, setArrowStates] = useState(
        Array(circles.length).fill({ height: 20, transform: "none" })
    ); // Store arrow states dynamically
    const [searchIndex, setSearchIndex] = useState(-1); // State to track search animation index


    let calculatedLeft;
    
    const lineRef = useRef(null);


    useEffect(() => {
        const topCircles = lineRef.current.children;
        if (topCircles[newCirclePos]) {
            const circleWidth = topCircles[0].offsetWidth;
            const gap = parseInt(getComputedStyle(lineRef.current).gap) || 24;
            const svgWidth = 40;
            if (newCirclePos === 0) calculatedLeft = 32;
            calculatedLeft = newCirclePos * (circleWidth + 2 * gap + svgWidth);
            setRelativeLeft(calculatedLeft);
            setShowArrow(false);

            setTimeout(() => {
                setShowArrow(true);
                adjustArrowToNewCircle(); // Adjust previous arrow after animation
            }, 500);
        }
    }, [newCirclePos]);

    useEffect(() => {
        if (circles.length !== arrowStates.length) {
            const updatedArrowStates = Array(circles.length).fill({ height: 20, transform: "none" });
            setArrowStates(updatedArrowStates);
        }
    }, [circles]);

    const adjustArrowToNewCircle = () => {
        const newArrowStates = [...arrowStates];
        if (newCirclePos > 0) {
            newArrowStates[newCirclePos - 1] = {
                height: 80,
                transform: `rotate(45deg) translateY(70px)`,
            };
            setArrowStates(newArrowStates);
        }
        setTimeout(() => {
            insertCircleInLine();
            resetArrowStates();
        }, 3000);
    };

    const insertCircleInLine = () => {
        const newCircles = [...circles];
        newCircles.splice(newCirclePos, 0, parseInt(newNumber, 10));
        const newArrowStates = Array(newCircles.length).fill({ height: 20, transform: "none" });
        setArrowStates(newArrowStates);
        setCircles(newCircles);
        setNewCirclePos(null);
        setSearchIndex(-1); // Reset search index after insertion
    };

    const resetArrowStates = () => {
        const resetStates = arrowStates.map(() => ({
            height: 20,
            transform: "none",
        }));
        setArrowStates(resetStates);
    };

    const handleAddCircle = async () => {
        const pos = parseInt(position, 10);
        const num = parseInt(newNumber, 10);
        if (isNaN(pos) || pos < 1 || pos > circles.length || isNaN(num)) {
            alert("Please enter a valid position (1 to 4) and a valid number!");
            return;
        }

        setNewNumber(num);
        setPosition("");
        startSearchAnimation(pos - 1);
        await new Promise(resolve => setTimeout(resolve, 500 * pos));

        setNewCirclePos(pos); // Set the new circle position (0-indexed)
        //setSearchIndex(0); // Start search animation from the beginning

    };

    const startSearchAnimation = (targetPos) => {
        let index = 0;
        const interval = setInterval(() => {
            setSearchIndex(index); // Highlight the current index during the search
            if (index === targetPos) {
                clearInterval(interval); // Stop the search animation once the target is reached
            }
            index += 1;
        }, 500); // Control the speed of search animation

    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex gap-4 mb-6">
                <input
                    type="number"
                    placeholder="Position"
                    className="input input-bordered w-24"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Number"
                    className="input input-bordered w-24"
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddCircle}>
                    Add Circle
                </button>
            </div>

            <div className="relative">
                <div className="flex items-center gap-6" ref={lineRef}>
                    {circles.map((num, index) => (
                        <React.Fragment key={index}>
                            {index === 0 && (
                                <div className="absolute top-[-50px] left-0 flex flex-col items-center">
                                    <span className="bg-purple-500 text-white px-2 py-1 rounded">Head/{index}</span>
                                    <svg width="24" height="24">
                                        <line x1="12" y1="0" x2="12" y2="24" stroke="purple" strokeWidth="2" />
                                        <polygon points="6,18 12,24 18,18" fill="purple" />
                                    </svg>
                                </div>
                            )}
                            <div
                                className={`bg-blue-500 w-16 h-16 rounded-full flex justify-center items-center text-white text-lg shadow-lg ${searchIndex === index ? "ring-4 ring-yellow-400" : ""
                                    }`}
                            >
                                {num}
                            </div>
                            {index === circles.length - 1 && (
                                <div className="absolute top-[-50px] right-4 flex flex-col items-center">
                                    <span className="bg-red-500 text-white px-2 py-1 rounded">Tail/{index}</span>
                                    <svg width="24" height="24">
                                        <line x1="12" y1="0" x2="12" y2="24" stroke="red" strokeWidth="2" />
                                        <polygon points="6,18 12,24 18,18" fill="red" />
                                    </svg>
                                </div>
                            )}
                            {index < circles.length - 1 && (
                                <svg
                                    width="40"
                                    height={arrowStates[index].height}
                                    style={{
                                        transition: "transform 0.5s, height 0.5s",
                                        transform: arrowStates[index].transform,
                                    }}
                                >
                                    <line
                                        x1="0"
                                        y1={arrowStates[index].height / 2}
                                        x2="40"
                                        y2={arrowStates[index].height / 2}
                                        stroke="#333"
                                        strokeWidth="2"
                                    />
                                    <polygon
                                        points={`30,${arrowStates[index].height / 2 - 5} 40,${arrowStates[index].height / 2} 30,${arrowStates[index].height / 2 + 5}`}
                                        fill="#333"
                                    />
                                </svg>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                {/* Curr Pointer: Positioned below the circles *}

                {searchIndex >= 0 && (<div
                    className="absolute flex flex-col items-center transition-all duration-500 ease-in-out"
                    style={{
                        top: "80px", // Position below the circles
                        left: `${searchIndex === 0 ? 32 : searchIndex * (64 + 2 * 24 + 40)}px`, // Adjust left position dynamically
                    }}
                >
                    <svg width="24" height="24">
                        <line x1="12" y1="24" x2="12" y2="0" stroke="green" strokeWidth="2" />
                        <polygon points="6,6 12,0 18,6" fill="green" />
                    </svg>
                    <span className="bg-green-500 text-white px-2 py-1 rounded">Curr/{searchIndex}</span>
                    
                </div>)}

                {newCirclePos !== null && (
                    <div
                        className="absolute flex flex-col items-center"
                        style={{
                            position: "absolute",
                            left: `${relativeLeft}px`,
                            top: "120px",
                        }}
                    >
                        {showArrow && (
                            <svg
                                width="64"
                                height="40"
                                style={{
                                    position: "absolute",
                                    top: "-50px",
                                }}
                            >
                                <line x1="32" y1="40" x2="32" y2="10" stroke="#333" strokeWidth="2" />
                                <polygon points="28,10 36,10 32,0" fill="#333" />
                            </svg>
                        )}

                        <div className="bg-green-500 w-16 h-16 rounded-full flex justify-center items-center text-white text-lg shadow-lg">
                            {newNumber}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CirclesWithArrows;*/

import React, { useEffect, useRef, useState } from "react";

const CirclesWithArrows = () => {
    const [circles, setCircles] = useState([1, 2, 3, 4]); // Initial circles
    const [newNumber, setNewNumber] = useState(""); // Number for new circle
    const [position, setPosition] = useState(""); // Position for new circle
    const [newCirclePos, setNewCirclePos] = useState(null); // Store position for the circle below
    const [relativeLeft, setRelativeLeft] = useState(0); // Store dynamic relative left position
    const [showArrow, setShowArrow] = useState(false); // State to toggle arrow after animation
    const [arrowStates, setArrowStates] = useState(
        Array(circles.length).fill({ height: 20, transform: "none" })
    ); // Store arrow states dynamically
    const [searchIndex, setSearchIndex] = useState(-1); // State to track search animation index


    let calculatedLeft;

    const lineRef = useRef(null);
    const divref = useRef(null);


    useEffect(() => {
        const topCircles = lineRef.current.children;
        const topRectangle = divref.current
        if (topCircles[newCirclePos]) {
            // Dynamically get full rectangle width
            const element = topRectangle
            const rectangleWidth = element.offsetWidth; // Full width including padding & border

            const computedStyle = getComputedStyle(element);
            const paddingLeft = parseFloat(computedStyle.getPropertyValue('padding-left')) || 0;
            const paddingRight = parseFloat(computedStyle.getPropertyValue('padding-right')) || 0;

            const fullWidth = rectangleWidth + paddingLeft + paddingRight; // Final calculated width

            const gap = parseInt(getComputedStyle(lineRef.current).gap) || 24;
            const svgWidth = 40;


            if (newCirclePos === 0) calculatedLeft = fullWidth / 2;  // Adjust if the first rectangle
            else calculatedLeft = newCirclePos * (fullWidth + 2 * gap + svgWidth);
            console.log('Offset Width:', rectangleWidth);
            console.log('Padding Left:', paddingLeft);
            console.log('Padding Right:', paddingRight);
            console.log('Calculated Full Width:', fullWidth);


            setRelativeLeft(calculatedLeft);
            setShowArrow(false);

            setTimeout(() => {
                setShowArrow(true);
                adjustArrowToNewCircle(); // Adjust arrow after animation
            }, 500);
        }
    }, [newCirclePos]);



    useEffect(() => {
        if (circles.length !== arrowStates.length) {
            const updatedArrowStates = Array(circles.length).fill({ height: 20, transform: "none" });
            setArrowStates(updatedArrowStates);
        }
    }, [circles]);

    const adjustArrowToNewCircle = () => {
        const newArrowStates = [...arrowStates];
        if (newCirclePos > 0) {
            newArrowStates[newCirclePos - 1] = {
                height: 80,
                transform: `rotate(45deg) translateY(80px) `,
            };
            setArrowStates(newArrowStates);
        }
        setTimeout(() => {
            insertCircleInLine();
            resetArrowStates();
        }, 3000);
    };

    const insertCircleInLine = () => {
        const newCircles = [...circles];
        newCircles.splice(newCirclePos, 0, parseInt(newNumber, 10));
        const newArrowStates = Array(newCircles.length).fill({ height: 20, transform: "none" });
        setArrowStates(newArrowStates);
        setCircles(newCircles);
        setNewCirclePos(null);
        setSearchIndex(-1); // Reset search index after insertion
    };

    const resetArrowStates = () => {
        const resetStates = arrowStates.map(() => ({
            height: 20,
            transform: "none",
        }));
        setArrowStates(resetStates);
    };

    const handleAddCircle = async () => {
        const pos = parseInt(position, 10);
        const num = parseInt(newNumber, 10);
        if (isNaN(pos) || pos < 1 || pos > circles.length || isNaN(num)) {
            alert("Please enter a valid position (1 to 4) and a valid number!");
            return;
        }

        setNewNumber(num);
        setPosition("");
        startSearchAnimation(pos - 1);
        await new Promise(resolve => setTimeout(resolve, 500 * pos));

        setNewCirclePos(pos); // Set the new circle position (0-indexed)
        //setSearchIndex(0); // Start search animation from the beginning

    };

    const startSearchAnimation = (targetPos) => {
        let index = 0;
        const interval = setInterval(() => {
            setSearchIndex(index); // Highlight the current index during the search
            if (index === targetPos) {
                clearInterval(interval); // Stop the search animation once the target is reached
            }
            index += 1;
        }, 500); // Control the speed of search animation

    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex gap-4 mb-6">
                <input
                    type="number"
                    placeholder="Position"
                    className="input input-bordered w-24"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Number"
                    className="input input-bordered w-24"
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddCircle}>
                    Add Circle
                </button>
            </div>

            <div className="relative">
                <div className="flex items-center gap-6" ref={lineRef}>
                    {circles.map((num, index) => (
                        <React.Fragment key={index}>
                            {index === 0 && (
                                <div className="absolute top-[-50px] left-0 flex flex-col items-center">
                                    <span className="bg-purple-500 text-white px-2 py-1 rounded">Head/{index}</span>
                                    <svg width="24" height="24">
                                        <line x1="12" y1="0" x2="12" y2="24" stroke="purple" strokeWidth="2" />
                                        <polygon points="6,18 12,24 18,18" fill="purple" />
                                    </svg>
                                </div>
                            )}
                            <div
                                className={`bg-blue-500 w-32 h-24 rounded-md flex flex-col justify-between items-center text-white text-lg shadow-lg p-2 ${searchIndex === index ? "ring-4 ring-yellow-400" : ""
                                    }`}
                                ref={divref}
                            >
                                {/* Image inside the rectangle */}
                                <img
                                    src="/TrainCompartment.png" // Replace with a dynamic image URL if needed
                                    alt="icon"
                                    className="w-28 h-14 mb-1"
                                />
                                <div className="text-center text-sm font-bold">{num}</div> {/* Displaying the number */}
                            </div>

                            {index === circles.length - 1 && (
                                <div className="absolute top-[-50px] right-4 flex flex-col items-center">
                                    <span className="bg-red-500 text-white px-2 py-1 rounded">Tail/{index}</span>
                                    <svg width="24" height="24">
                                        <line x1="12" y1="0" x2="12" y2="24" stroke="red" strokeWidth="2" />
                                        <polygon points="6,18 12,24 18,18" fill="red" />
                                    </svg>
                                </div>
                            )}
                            {index < circles.length - 1 && (
                                <svg
                                    width="40"
                                    height={arrowStates[index].height}
                                    style={{
                                        transition: "transform 0.5s, height 0.5s",
                                        transform: arrowStates[index].transform,
                                    }}
                                >
                                    <line
                                        x1="0"
                                        y1={arrowStates[index].height / 2}
                                        x2="40"
                                        y2={arrowStates[index].height / 2}
                                        stroke="#333"
                                        strokeWidth="2"
                                    />
                                    <polygon
                                        points={`30,${arrowStates[index].height / 2 - 5} 40,${arrowStates[index].height / 2} 30,${arrowStates[index].height / 2 + 5}`}
                                        fill="#333"
                                    />
                                </svg>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                {/* Curr Pointer: Positioned below the circles */}

                {searchIndex >= 0 && (<div
                    className="absolute flex flex-col items-center transition-all duration-500 ease-in-out"
                    style={{
                        top: "85px", // Position below the circles
                        left: `${searchIndex === 0 ? 32 : searchIndex * (128 + 2 * 24 + 40)}px`, // Adjust left position dynamically
                    }}
                >
                    <svg width="24" height="24">
                        <line x1="12" y1="24" x2="12" y2="0" stroke="green" strokeWidth="2" />
                        <polygon points="6,6 12,0 18,6" fill="green" />
                    </svg>
                    <span className="bg-green-500 text-white px-2 py-1 rounded">Curr/{searchIndex}</span>

                </div>)}

                {newCirclePos !== null && (
                    <div
                        className="absolute flex flex-col items-center"
                        style={{
                            position: "absolute",
                            left: `${relativeLeft}px`,
                            top: "125px",
                        }}
                    >
                        {showArrow && (
                            <svg
                                width="64"
                                height="40"
                                style={{
                                    position: "absolute",
                                    top: "-40px",
                                }}
                            >
                                <line x1="32" y1="40" x2="32" y2="10" stroke="#333" strokeWidth="2" />
                                <polygon points="28,10 36,10 32,0" fill="#333" />
                            </svg>
                        )}

                        <div
                            className={`bg-green-500 w-32 h-24 rounded-md flex flex-col justify-between items-center text-white text-lg shadow-lg p-2 
                                }`}
                        >
                            {/* Image inside the rectangle */}
                            <img
                                src="/TrainCompartment.png" // Replace with a dynamic image URL if needed
                                alt="icon"
                                className="w-28 h-14 mb-1"
                            />
                            <div className="text-center text-sm font-bold">{newNumber}</div> {/* Displaying the number */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CirclesWithArrows;







