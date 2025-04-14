import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";
import Footer from "../Footer";
import CircularMenuExample from "../CircularMenuExample";
import PseudoCode from "../PseudoCode";
import ExplanationCollapse from "../ExplanationCollapse";
import TrainForm from "./TrainForm";
import toast from "react-hot-toast";
import InsertOperation from "./InsertOperation";

const LinkedListSimulation = ({ handleLogout }) => {
    const compartmentImage = '/TrainCompartment.png'
    const [compartments, setNewCompartments] = useState([{ number: 1, image: compartmentImage }, { number: 2, image: compartmentImage }, { number: 3, image: compartmentImage }]); // Initial circles
    const [newCompartmentPos, setNewCompartmentPos] = useState(null); // Store position for the circle below
    const [relativeLeft, setRelativeLeft] = useState(0); // Store dynamic relative left position
    const [showArrow, setShowArrow] = useState(false); // State to toggle arrow after animation
    const [searchIndex, setSearchIndex] = useState(-1); // State to track search animation index
    const [operationType, setOperationType] = useState("front");
    const [explanation, setExplanation] = useState("");
    const [highlightedLine, setHighlightedLine] = useState(-1);
    const [newCompartmentNumber, setnewCompartmentNumber] = useState("");
    const [position, setPosition] = useState("");
    const [isPlaying, setIsPlaying] = useState(true);
    const [history, setHistory] = useState([[{ number: 1, image: compartmentImage }, { number: 2, image: compartmentImage }, { number: 3, image: compartmentImage }]]); // Store history for undo/redo
    const [simulationSpeed, setSimulationSpeed] = useState(1000); // Start with normal speed
    const [speed, setSpeed] = useState(1); // Local state to manage slider value
    const [arrowStates, setArrowStates] = useState(
        Array(compartments.length).fill({ height: 20, transform: "none" })
    ); // Store arrow states dynamically
    const [shiftHead, setShiftHead] = useState(false); // State to track if head is shifted
    const [shiftTail, setShiftTail] = useState(false); // State to track if tail is shifted
    const [shiftNode, setShiftNode] = useState(false); // State to track if node is shifted
    const [tempIndex, setTempIndex] = useState(-1); // State to track temporary index for deletion
    const [increaseArrowWidth , setIncreaseArrowWidth] = useState(false); // State to track if arrow width is increased


    const pseudoCode = {
        front: [
            "Node node = new Node(data)",
            "node.next = head",
            " head = node",
        ],
        end: [
            "Node node = new Node(data)",
            "tail.next = node",
            "tail = node",
        ],
        position: [
            "Node curr = head",
            "for (int i = 0; i < position - 1; i++)",
            "   curr = curr.next",
            "Node node = new Node(data)",
            "node.next = curr.next",
            "curr.next = node",
        ],
        deleteFront: [
            "if empty do nothing",
            "Node temp = head",
            "head = head.next",
            "temp = null",
        ],
        deleteEnd: [
            "if empty do nothing",
            "Node curr = head",
            "while (curr.next.next != null)",
            "   curr = curr.next",
            "curr.next = null",
            "tail = curr",
        ],
        deletePosition: [
            "Node curr = head",
            "for (int i = 0; i < position - 2; i++)",
            "   curr = curr.next",
            "Node temp = curr.next",
            "curr.next = curr.next.next",
            "temp = null",
        ],
        update: [
            "Node curr = head",
            "for (int i = 0; i < position-1; i++)",
            "   curr = curr.next",
            "curr.data = data",
        ],
        search: [
            "Node curr = head",
            "while (curr != null)",
            "   if curr.data == target",
            "       return curr",
            "   curr = curr.next",
        ],

    };

    useEffect(() => {
        setHighlightedLine(-1); // Reset highlighted line when operation type changes
        setExplanation(""); // Clear explanation when operation type changes
        setSearchIndex(-1);
    }, [operationType]);


    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };


    const handleReset = () => {
        setNewCompartments([{ number: 1, image: compartmentImage }, { number: 2, image: compartmentImage }, { number: 3, image: compartmentImage }]);
        setHistory([[{ number: 1, image: compartmentImage }, { number: 2, image: compartmentImage }, { number: 3, image: compartmentImage }]]); // Clear history
        setIsPlaying(false); // Stop playing if active
        setHighlightedLine(-1); // Reset highlighted line when operation type changes
        setExplanation("");
    };

    const handleForward = () => {
        setTimeout(() => setExplanation("Simulation completed!"), 1000);
    };

    const changeSpeed = (newSpeed) => {
        setSimulationSpeed(1000 / newSpeed); // Adjust speed (higher value = faster)
        console.log(simulationSpeed);
    };

    const handleRewind = () => {
        if (history.length > 1) {
            const lastState = history[history.length - 2];
            setNewCompartments(lastState);
            //setHistory(history.slice(0, history.length - 1));
        }

    };

    const handleGoToBegining = () => {
        if (history.length > 0) {
            setNewCompartments(history[0]); // Move to the first recorded state

        }
    };

    const handleGoToEnd = () => {
        if (history.length > 0) {
            setNewCompartments(history[history.length - 1]); // Move to the last recorded state

        }
    };

    const addHistory = (newState) => {
        setHistory((prevHistory) => [...prevHistory, newState]); // Use functional state update to get the latest history
    };


    const lineRef = useRef(null);
    //const divref = useRef(null);
    const compartmentRef = useRef(null); // Dynamic refs for each compartment





    useEffect(() => {
        const fetchData = async () => {
            let calculatedLeft;
            const topCircles = lineRef.current.children;
            const topRectangle = compartmentRef.current;
            console.log(topRectangle);
            if (topCircles[newCompartmentPos]) {
                // Dynamically get full rectangle width
                const element = topRectangle;
                const rectangleWidth = element.offsetWidth; // Full width including padding & border

                const computedStyle = getComputedStyle(element);
                const paddingLeft = parseFloat(computedStyle.getPropertyValue('padding-left')) || 0;
                const paddingRight = parseFloat(computedStyle.getPropertyValue('padding-right')) || 0;

                const fullWidth = rectangleWidth + paddingLeft + paddingRight; // Final calculated width

                const gap = parseInt(getComputedStyle(lineRef.current).gap) || 24;
                const svgWidth = 40;

                if (newCompartmentPos === 0) calculatedLeft = (rectangleWidth - 2 * paddingRight) / 2;  // Adjust if the first rectangle
                else calculatedLeft = newCompartmentPos * (fullWidth + 2 * gap + svgWidth);

                console.log('Offset Width:', rectangleWidth);
                console.log('Padding Left:', paddingLeft);
                console.log('Padding Right:', paddingRight);
                console.log('Calculated Full Width:', fullWidth);
                console.log(calculatedLeft);

                setRelativeLeft(calculatedLeft);
                setShowArrow(false);
                if (operationType === "front" || operationType === "end") {
                    setHighlightedLine(0);
                }
                setExplanation(`New Compartment is created with number : ${newCompartmentNumber}`);
                await new Promise(resolve => setTimeout(resolve, simulationSpeed));
                setShowArrow(true);
                if (operationType === "position") {
                    setHighlightedLine(4);
                    setExplanation(`New Compartment next pointer is pointing to the compartment at position : ${newCompartmentPos}`);
                    await new Promise(resolve => setTimeout(resolve, simulationSpeed));
                    adjustArrowToNewCompartment();
                }
                else if (operationType === "front") {
                    setHighlightedLine(1);
                    setExplanation(`New Compartment next pointer is pointing to the head`);
                    await new Promise(resolve => setTimeout(resolve, simulationSpeed));
                    insertFrontCompartmentInLine();
                    setHighlightedLine(2);
                    setExplanation(`Head is now pointing to the new compartment`);

                }
                else if (operationType === "end") {
                    setHighlightedLine(1);
                    setExplanation(`tail Compartment next pointer is pointing to the new Compartment`);
                    await new Promise(resolve => setTimeout(resolve, simulationSpeed));
                    insertEndCompartmentInLine();
                    setHighlightedLine(2);
                    setExplanation(`Tail is now pointing to the new compartment`);
                }

            }
        };

        fetchData(); // Call the async function
    }, [newCompartmentPos]);




    useEffect(() => {
        if (compartments.length !== arrowStates.length) {
            const updatedArrowStates = Array(compartments.length).fill({ height: 20, transform: "none" });
            setArrowStates(updatedArrowStates);
        }
    }, [compartments]);

    const insertFrontCompartmentInLine = () => {
        let newCompartments = [...compartments];
        newCompartments.unshift({
            number: parseInt(newCompartmentNumber, 10),
            image: compartmentImage,
        });


        const newArrowStates = Array(newCompartments.length).fill({ height: 20, transform: "none" });
        setArrowStates(newArrowStates);
        setNewCompartments(newCompartments);
        addHistory(newCompartments);

        setNewCompartmentPos(null);

    };
    const insertEndCompartmentInLine = () => {
        let newCompartments = [...compartments];
        newCompartments.push({
            number: parseInt(newCompartmentNumber, 10),
            image: compartmentImage,
        });


        const newArrowStates = Array(newCompartments.length).fill({ height: 20, transform: "none" });
        setArrowStates(newArrowStates);
        setNewCompartments(newCompartments);
        addHistory(newCompartments);

        setNewCompartmentPos(null);

    };

    const adjustArrowToNewCompartment = () => {
        const newArrowStates = [...arrowStates];
        if (newCompartmentPos > 0) {
            newArrowStates[newCompartmentPos - 1] = {
                height: 80,
                transform: `rotate(45deg) translateY(90px) `,
            };
            setArrowStates(newArrowStates);
            setHighlightedLine(5);
            setExplanation(`next pointer of Compartent pointed by curr pointer is pointing to the newly created compartment with number : ${newCompartmentNumber}`);
        }
        setTimeout(() => {
            insertCompartmentInLine();
            resetArrowStates();
        }, simulationSpeed);
    };



    const insertCompartmentInLine = () => {
        let newCompartments = [...compartments];
        newCompartments.splice(newCompartmentPos, 0, {
            number: parseInt(newCompartmentNumber, 10),
            image: compartmentImage, // Keep the image consistent with existing compartments
        });

        const newArrowStates = Array(newCompartments.length).fill({ height: 20, transform: "none" });
        setArrowStates(newArrowStates);
        setNewCompartments(newCompartments);
        addHistory(newCompartments);
        console.log(history);
        setNewCompartmentPos(null);
        setSearchIndex(-1); // Reset search index after insertion
    };

    const resetArrowStates = () => {
        const resetStates = arrowStates.map(() => ({
            height: 20,
            transform: "none",
        }));
        setArrowStates(resetStates);
    };



    /*const startSearchAnimation = (targetPos) => {
        let index = 0;
        setExplanation(`Starting the searching for position : ${targetPos}...`);
        const interval = setInterval(() => {

            setSearchIndex(index); // Highlight the current index during the search
            if (index === 0) {
                setHighlightedLine(0);
                setExplanation("curr pointer pointing to head")
            }
            else {
                setHighlightedLine(2);
                setExplanation(`curr pointer move to  ${index + 1}th compartment...`);

            }

            if (index === targetPos) {
                clearInterval(interval); // Stop the search animation once the target is reached
            }
            index += 1;



        }, simulationSpeed); // Control the speed of search animation

    };*/

    const startSearchAnimation = async (targetPos) => {
        let index = 0;
        setExplanation(`Starting the searching for position : ${targetPos}...`);

        while (index <= targetPos) {
            // Step 1: Highlight "curr pointer pointing to head" or "curr pointer moves"

            setSearchIndex(index);
            if (index === 0) {
                setHighlightedLine(0);
                setExplanation("curr pointer pointing to head");
            }
            else if (index === targetPos) {
                setHighlightedLine(2);
                setExplanation(` ${targetPos}th compartment found...`);
            }
            else {
                setHighlightedLine(2);
                setExplanation(`curr pointer moves to the ${index + 1}th compartment...`);
            }
            // Wait for the UI to reflect
            await new Promise(resolve => setTimeout(resolve, simulationSpeed));




            // Move to the next compartment
            index += 1;


            await new Promise(resolve => setTimeout(resolve, simulationSpeed));
        }
    };



    const startSearchAnimationByNumber = async (targetNumber) => {
        let index = 0;
        setExplanation(`Starting the search for compartment number: ${targetNumber}...`);

        while (index < compartments.length) {
            // Step 1: Highlight "curr pointer pointing to head" or "curr pointer moves"

            setSearchIndex(index);
            if (index === 0) {
                setHighlightedLine(0);
                setExplanation("curr pointer pointing to head");
            } else {
                setHighlightedLine(4);
                setExplanation(`curr pointer moves to the ${index + 1}th compartment...`);
            }
            // Wait for the UI to reflect
            await new Promise(resolve => setTimeout(resolve, simulationSpeed));


            // Step 2: Highlight "if curr.data == target"
            setHighlightedLine(2);
            setExplanation(`Checking compartment number: ${compartments[index]?.number}`);
            // Wait for the UI to reflect
            await new Promise(resolve => setTimeout(resolve, simulationSpeed));

            // Step 3: Check if the compartment matches the targetNumber
            if (compartments[index] && compartments[index].number === parseInt(targetNumber, 10)) {
                setHighlightedLine(3); // Highlight "return curr"
                setExplanation(`Compartment with number ${targetNumber} found at position: ${index}`);
                return; // Exit the function once the target is found
            }

            // Move to the next compartment
            index += 1;

            // If no match is found by the end of the compartments
            if (index >= compartments.length) {
                setExplanation(`Compartment number ${targetNumber} not found in the train.`);
                setHighlightedLine(-1); // Clear highlighting
            }

            // Wait before moving to the next iteration
            await new Promise(resolve => setTimeout(resolve, simulationSpeed));
        }
    };

    const startSearchAnimationForDeletionFromEnd = async () => {
        let index = 0;
        setExplanation(`Starting the search for second last compartment...`);

        while (index < compartments.length - 1) {
            // Step 1: Highlight "curr pointer pointing to head" or "curr pointer moves"

            setSearchIndex(index);
            if (index === 0) {
                setHighlightedLine(1);
                setExplanation("curr pointer pointing to head");
            } else {
                setHighlightedLine(3);
                setExplanation(`curr pointer moves to the ${index + 1}th compartment...`);
            }
            // Wait for the UI to reflect
            await new Promise(resolve => setTimeout(resolve, simulationSpeed));

            // Move to the next compartment
            index += 1;

            // If no match is found by the end of the compartments

        }
    };





    const handleAddCompartment = async () => {
        if (!isPlaying) {
            toast.error("Simulation is paused. Press Play to continue.")
            return;
        }

        if (newCompartmentNumber === "") {
            alert("Enter a compartment number!");
            return;
        }

        const isDuplicate = compartments.some(slot => slot?.number === newCompartmentNumber);

        if (isDuplicate) {
            toast.success(
                `Compartment number ${newCompartmentNumber} already exists. However, in an actual linked list, duplicates are allowed.`,
                { duration: 5000 } // Toast stays visible for 5 seconds
            );
        }


        if (operationType === "front") {
            setNewCompartmentPos(0);
        }

        if (operationType === "end") {
            setNewCompartmentPos(compartments.length - 1);
        }



        if (operationType === "position") {
            const pos = parseInt(position, 10);
            const num = parseInt(newCompartmentNumber, 10);
            if (isNaN(pos) || pos < 0 || pos > compartments.length || isNaN(num)) {
                alert("Please enter a valid position  and a valid number!");
                return;
            }

            setnewCompartmentNumber(num);
            setPosition("");
            startSearchAnimation(pos - 2);
            await new Promise(resolve => setTimeout(resolve, simulationSpeed * pos));

            setNewCompartmentPos(pos - 1); // Set the new circle position (0-indexed)
            setHighlightedLine(3);

        }

    };

    const handleRemoveCompartment = async () => {
        if (!isPlaying) {
            alert("Simulation is paused. Press Play to continue.")
            return;
        }

        const pos = parseInt(position, 10);
        if ((pos-1) < 0 || (pos-1) >= compartments.length) {
            alert("Invalid position! Enter a valid position  range.");
            return;
        }

        let newCompartments;

        if (operationType === "deleteFront") {
            if (compartments.length === 0) {
                setExplanation("Train is already empty. No deletion needed.");
                return;
            }

            setHighlightedLine(0);
            setExplanation(`Checking if the train is empty...`);
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));

            setTempIndex(0);
            setHighlightedLine(1);
            setExplanation(`temp pointer pointing to the first compartment...`);
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));

            // **Temporarily hide the head pointer to avoid duplicate rendering**
            setShiftHead(null);
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed / 2)); // Small delay

            // Move Head to the Next Compartment
            setShiftHead(true);
            setHighlightedLine(2);
            setExplanation(`Head is now pointing to the second compartment...`);
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));

            // Wait for the head shift to be visually seen
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));

            // Now actually delete the first compartment
            setShiftHead(false);
            newCompartments = [...compartments];
            newCompartments.shift(); // Remove the first compartment
            setNewCompartments(newCompartments);
            addHistory(newCompartments);

            setHighlightedLine(3);
            setExplanation(`temp pointer is now null, meaning the first compartment is removed...`);
            setTempIndex(-1); // Reset search index after deletion
        }

        if (operationType === "deleteEnd") {
            if (compartments.length === 0) {
                setExplanation("Train is already empty. No deletion needed.");
                return;
            }
            

            setHighlightedLine(0);
            setExplanation(`Checking if the train is empty...`);
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));

            startSearchAnimationForDeletionFromEnd();
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed * (compartments.length - 1)));
            setHighlightedLine(4);
            setExplanation(`next pointer of second last compartment is now pointing to null, meaning not pointing to last compartment.`);


            // **Update Arrow and Compartments Together**
            setArrowStates((prevArrows) => {
                if (prevArrows.length > 1) {
                    const updatedArrows = [...prevArrows];
                    updatedArrows[prevArrows.length - 2] = {
                        height: 0,
                        transform: "none",
                    } // Remove second last arrow
                    return updatedArrows;
                } else {
                    return []; // If only one arrow exists, remove it
                }
            });

            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));

            setShiftTail(true);
            setHighlightedLine(5);
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));

            // **Ensure Compartments Update After ArrowStates**
            setNewCompartments((prevCompartments) => {
                const updatedCompartments = [...prevCompartments];
                updatedCompartments.pop();
                return updatedCompartments;
            });
            addHistory(compartments);
            setShiftTail(false);
            setExplanation(`Last Compartment is removed...`);

        }

        if (operationType === "deletePosition") {

            if (compartments.length === 0) {
                setExplanation("Train is already empty. No deletion needed.");
                return;
            }

           
            if (isNaN(pos-1) || (pos-1) < 0 || (pos-1) >= compartments.length) {
                alert("Please enter a valid position!");
                return;
            }

            if (!compartments[pos - 1] || compartments[pos - 1].number !== parseInt(newCompartmentNumber, 10)) {
                alert(`Compartment number ${newCompartmentNumber} does not match the compartment at position ${pos}.`);
                return;
            }

            setHighlightedLine(0);
            setExplanation(`Checking if the train is empty...`);
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));

            startSearchAnimation(pos - 2);
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed * (pos)));
            setTempIndex(pos - 1);
            setHighlightedLine(3);
            setExplanation(`temp pointer points to the ${pos - 1}th compartment...`);
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));

            setShiftNode(true);
            setArrowStates((prevArrows) => {
                if (prevArrows.length > 1) {
                    const updatedArrows = [...prevArrows];
                    updatedArrows[position-1] = {
                        height: 80,
                        transform: `translateY(-120px) rotate(45deg)`,
                    } // Remove second last arrow
                    return updatedArrows;
                } else {
                    return []; // If only one arrow exists, remove it
                }
            });
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));

            setIncreaseArrowWidth(true);
            setHighlightedLine(4);
            setExplanation(`next pointer of ${pos - 2}th compartment is now pointing to the ${pos + 2}th compartment...`);
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));
            setNewCompartments((prevCompartments) => {
                const updatedCompartments = [...prevCompartments];
                if (pos - 1 >= 0 && pos - 1 < updatedCompartments.length) {
                    updatedCompartments.splice(pos - 1, 1); // Remove compartment at (position-1) index
                }
                return updatedCompartments;
            });
            addHistory(compartments);
            setHighlightedLine(5);
            setExplanation(`Compartment at position ${position} is removed...`);
            setShiftNode(false);
            setIncreaseArrowWidth(false);
            setSearchIndex(-1);
            setTempIndex(-1); // Reset search index after deletion
            // Now actually delete the compartment at the specified position

        }

    }

    const handleUpdateCompartment = async () => {
        if (!isPlaying) {
            alert("Simulation is paused. Press Play to continue.");
            return;
        }

        if (position < 0 || position > compartments.length) {
            alert("Invalid position! Enter a valid position within the range.");
            return;
        }

        if (newCompartmentNumber === "") {
            alert("Enter a compartment number!");
            return;
        }
        startSearchAnimation(position - 1);
        await new Promise(resolve => setTimeout(resolve, simulationSpeed * (position)));
        setHighlightedLine(2);
        setExplanation(`curr pointer move to ${position}th compartment...`);
        await new Promise(resolve => setTimeout(resolve, simulationSpeed));

        let newCompartments = [...compartments];
        newCompartments[position - 1] = {
            number: parseInt(newCompartmentNumber, 10),
            image: compartmentImage, // Keep the image consistent with existing compartments
        };
        setNewCompartments(newCompartments);
        addHistory(newCompartments);
        setHighlightedLine(3);
        setExplanation(`Compartment at position ${position} is updated successfully with number : ${newCompartmentNumber}`);
        await new Promise(resolve => setTimeout(resolve, simulationSpeed));
        setPosition("");
        setnewCompartmentNumber("");
        setSearchIndex(-1); // Reset search index after insertion
    }

    const handleSearchCompartment = async () => {
        if (!isPlaying) {
            alert("Simulation is paused. Press Play to continue.");
            return;
        }

        if (newCompartmentNumber === "") {
            alert("Enter a compartment number!");
            return;
        }
        const targetNumber = parseInt(newCompartmentNumber, 10);
        startSearchAnimationByNumber(targetNumber);



    }



    return (
        <div className=" flex flex-col items-center  min-h-screen">
            {/* Fixed Header */}
            <Header handleLogout={handleLogout} text={"Train Compartment System"} />

            {/* Car Form Section - Stays at the top with margin-bottom */}
            <div className="w-full max-w-5xl px-4 sticky top-16 z-10">
                <TrainForm

                    operationType={operationType}
                    setOperationType={setOperationType}
                    position={position}
                    setPosition={setPosition}
                    newCompartmentNumber={newCompartmentNumber}
                    setnewCompartmentNumber={setnewCompartmentNumber}
                    handleAddCompartment={handleAddCompartment}
                    handleRemoveCompartment={handleRemoveCompartment}
                    handleUpdateCompartment={handleUpdateCompartment}
                    handleSearchCompartment={handleSearchCompartment}

                />
            </div>

            {/* Spacing below CarForm to separate it from ParkingLot */}
            <div className="mt-20 w-full flex items-center overflow-x-auto max-h-[500px] pr-4" style={{ maxWidth: "55vw" }}>

                <InsertOperation ref={lineRef} compartments={compartments} compartmentRef={compartmentRef} arrowStates={arrowStates} searchIndex={searchIndex} newCompartmentPos={newCompartmentPos} showArrow={showArrow} relativeLeft={relativeLeft} newCompartmentNumber={newCompartmentNumber} operationType={operationType} shiftHead={shiftHead} shiftTail={shiftTail} position={position} shiftNode={shiftNode} tempIndex={tempIndex} increaseArrowWidth={increaseArrowWidth}/>

            </div>

            {/* Collapsible Components */}
            <PseudoCode>
                <ul className="space-y-1">
                    {pseudoCode[operationType]?.map((line, index) => (
                        <li
                            key={index}
                            className={`p-1 font-mono ${highlightedLine === index ? "bg-blue-100 text-blue-900 font-bold border-l-4 border-blue-900" : ""}`}
                        >
                            {line}
                        </li>
                    )) || <li>No pseudo code available for this operation.</li>}
                </ul>
            </PseudoCode>

            <ExplanationCollapse>
                <ul className="space-y-1">
                    <li>{explanation}</li>
                </ul>
            </ExplanationCollapse>

            {/* Circular Menu */}
            <CircularMenuExample iconSizeOverride={14} itemSizeOverride={1} radiusOverride={2} />

            {/* Fixed Footer */}
            <Footer isPlaying={isPlaying}
                handlePlayPause={handlePlayPause}
                speed={speed}
                setSpeed={setSpeed}
                onRewind={handleRewind}
                onForward={handleForward}
                changeSpeed={changeSpeed}
                onReset={handleReset}
                handleGoToBegining={handleGoToBegining}
                handleGoToEnd={handleGoToEnd}
            />
        </div>
    );
};

export default LinkedListSimulation;

