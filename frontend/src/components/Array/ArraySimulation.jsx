import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import CircularMenuExample from "../CircularMenuExample";
import PseudoCode from "../PseudoCode";
import ExplanationCollapse from "../ExplanationCollapse";
import CarForm from "./CarForm";
import ParkingLot from "./ParkingLot";
import toast from "react-hot-toast";

const ArraySimulation = ({ handleLogout }) => {
    const [parkingSlots, setParkingSlots] = useState([]);
    const [maxSize, setMaxSize] = useState(10);
    const [operationType, setOperationType] = useState("append");
    const [explanation, setExplanation] = useState("");
    const [highlightedLine, setHighlightedLine] = useState(-1);
    const [newCarNumber, setNewCarNumber] = useState("");
    const [position, setPosition] = useState("");
    const [isPlaying, setIsPlaying] = useState(true);
    const [history, setHistory] = useState([]); // Store history for undo/redo
    const [simulationSpeed, setSimulationSpeed] = useState(1000); // Start with normal speed
    const [speed, setSpeed] = useState(1); // Local state to manage slider value

    const carImages = [
        "/car1.png",
        "/car2.png",
        "/car3.png",
        "/car4.png",
        "/car5.png",

    ];
    const pseudoCode = {
        append: [
            "if (lenFilled === lenArray)",
            "   double size of A",
            "A[lenFilled] = element",
            "lenFilled++"
        ],
        insertion: [
            "if (lenFilled === lenArray)",
            "   double size of A",
            "for (j = lenFilled - 1; j >= position; j--)",
            "   A[j + 1] = A[j]",
            "A[position] = element",
            "lenFilled++"
        ],
        remove: [
            "if empty, do nothing",
            "remove A[position]",
            "for (j = position+1; j < lenfilled ; j++)",
            "   A[j-1] = A[j]",
            "lenfilled--",
        ],
        update: [
            "A[position]=element"
        ]
    };

    useEffect(() => {
        setHighlightedLine(-1); // Reset highlighted line when operation type changes
        setExplanation(""); // Clear explanation when operation type changes
    }, [operationType]);


    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };


    const handleReset = () => {
        setParkingSlots(Array.from({ length: maxSize }, () => null)); // Reset parking slots
        setHistory([]); // Clear history
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
            setParkingSlots(lastState);
            //setHistory(history.slice(0, history.length - 1));
        }

    };

    const handleGoToBegining = () => {
        if (history.length > 0) {
            setParkingSlots(history[0]); // Move to the first recorded state

        }
    };

    const handleGoToEnd = () => {
        if (history.length > 0) {
            setParkingSlots(history[history.length - 1]); // Move to the last recorded state

        }
    };

    const addHistory = (newState) => {
        setHistory([...history, newState]);
    };

    const handleAddCar = async () => {
        if (!isPlaying) {
            toast.error("Simulation is paused. Press Play to continue.")
            return;
        }

        if (newCarNumber === "") {
            alert("Enter a car number!");
            return;
        }

        const isDuplicate = parkingSlots.some(slot => slot?.number === newCarNumber);

        if (isDuplicate) {
            toast.success(
                `Car number ${newCarNumber} already exists. However, in an actual array, duplicates are allowed.`,
                { duration: 5000 } // Toast stays visible for 5 seconds
            );
        }



        const newSlots = [...parkingSlots];
        let filledSlots = newSlots.filter(slot => slot !== null).length;

        if (filledSlots === maxSize) {
            setHighlightedLine(0);
            setExplanation("Parking lot is full; resizing is needed.");
            await new Promise(resolve => setTimeout(resolve, simulationSpeed));
            setHighlightedLine(1);
            setExplanation("Doubling the parking lot size.");
            newSlots.push(...Array(maxSize).fill(null));
            setMaxSize(maxSize * 2);
            setParkingSlots(newSlots);
            addHistory(newSlots);
            await new Promise(resolve => setTimeout(resolve, simulationSpeed));

        }

        if (operationType === "append") {
            setHighlightedLine(2);
            setExplanation("Appending the new car at the first available slot.");
            const emptySlotIndex = newSlots.findIndex(slot => slot === null);
            const randomImage = carImages[Math.floor(Math.random() * carImages.length)];
            newSlots[emptySlotIndex] = { number: newCarNumber, image: randomImage };
            setParkingSlots(newSlots);
            addHistory(newSlots);
            await new Promise(resolve => setTimeout(resolve, simulationSpeed));
            setHighlightedLine(3);

            setExplanation(`Incrementing the filled slots count from ${filledSlots} to ${filledSlots += 1}.`);
            setNewCarNumber("");

            return;
        }

        if (operationType === "insertion") {
            if (position > filledSlots || position < 0) {
                alert("Sorry!!! enter the position such that 0<=position<=lenFilled ");
            }
            else {
                setHighlightedLine(2);
                setExplanation("Starting to shift cars to make space.");
                await new Promise(resolve => setTimeout(resolve, simulationSpeed));
                for (let j = filledSlots - 1; j >= position; j--) {
                    setHighlightedLine(3);
                    setExplanation(
                        `Car ${newSlots[j]?.number || "null"} is shifted from A[${j}] to A[${j + 1}]. 
  In a parking system, we cannot overwrite cars while shifting. 
  However, in an actual array data structure, shifting overwrites the A[${j}] to A[${j + 1}] values in memory.`
                    );

                    newSlots[j + 1] = newSlots[j];
                    newSlots[j] = null;
                    setParkingSlots([...newSlots]);
                    addHistory([...newSlots]);
                    await new Promise(resolve => setTimeout(resolve, simulationSpeed));
                }

                setHighlightedLine(4);
                setExplanation("Inserting the new car at the specified position.");
                const randomImage = carImages[Math.floor(Math.random() * carImages.length)];
                newSlots[position] = { number: newCarNumber, image: randomImage };
                setParkingSlots(newSlots);
                addHistory(newSlots);
                await new Promise(resolve => setTimeout(resolve, simulationSpeed));
                setHighlightedLine(5);
                setExplanation(`Incrementing the filled slots count from ${filledSlots} to ${filledSlots += 1}.`);

            }
            setNewCarNumber("");
            setPosition("");

        }

    };

    const handleRemoveCar = async () => {
        if (!isPlaying) {
            alert("Simulation is paused. Press Play to continue.")
            return;
        }

        if (position < 0 || position >= parkingSlots.length) {
            alert("Invalid position! Enter a valid position within the parking lot range.");
            return;
        }

        const newSlots = [...parkingSlots];
        const lenfilled = newSlots.filter((slot) => slot !== null).length;

        if (position >= lenfilled) {
            alert("No car exists at the specified position!")
            return;
        }

        // Check if the entered car number matches the car at the specified position
        if (!newSlots[position] || newSlots[position].number !== newCarNumber) {
            alert(`Car number ${newCarNumber} does not match the car at position ${position}.`);
            return;
        }

        setHighlightedLine(0);
        await new Promise((resolve) => setTimeout(resolve, simulationSpeed));
        setHighlightedLine(1);
        newSlots[position] = null
        setParkingSlots([...newSlots]);
        addHistory(newSlots);
        await new Promise((resolve) => setTimeout(resolve, simulationSpeed));

        for (let j = position + 1; j < lenfilled; j++) {
            setHighlightedLine(3);
            setExplanation(`Car ${newSlots[j]?.number || "null"} is shifted from A[${j}] to A[${j - 1}].`);
            newSlots[j - 1] = newSlots[j];
            newSlots[j] = null;
            setParkingSlots([...newSlots]);
            addHistory(newSlots);
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));
        }
        setHighlightedLine(4);
        setPosition("");
        setNewCarNumber("");


    }

    const handleUpdateCar = async () => {
        if (!isPlaying) {
            alert("Simulation is paused. Press Play to continue.");
            return;
        }

        if (position < 0 || position >= parkingSlots.length) {
            alert("Invalid position! Enter a valid position within the parking lot range.");
            return;
        }

        const newSlots = [...parkingSlots];
        const lenfilled = newSlots.filter((slot) => slot !== null).length;

        if (position > lenfilled) {
            setOperationType("append");
            handleAddCar();
            return;
        }


        setHighlightedLine(0);
        setExplanation(`New Car ${newSlots[position]?.number || "null"} is parked at A[${position}] .`);
        const randomImage = carImages[Math.floor(Math.random() * carImages.length)];
        newSlots[position] = { number: newCarNumber, image: randomImage };
        setParkingSlots(newSlots);
        addHistory(newSlots);
        await new Promise(resolve => setTimeout(resolve, simulationSpeed));
        setNewCarNumber("");
        setPosition("");


    }

    // Update parkingSlots when maxSize changes
    useEffect(() => {
        setParkingSlots(Array.from({ length: maxSize }, () => null));
    }, [maxSize]);

    return (
        <div className=" flex flex-col items-center  min-h-screen">
            {/* Fixed Header */}
            <Header handleLogout={handleLogout} text={"Car Parking System"} />

            {/* Car Form Section - Stays at the top with margin-bottom */}
            <div className="w-full max-w-5xl px-4 sticky top-16 z-10">
                <CarForm
                    maxSize={maxSize}
                    setMaxSize={setMaxSize}
                    parkingSlots={parkingSlots}
                    setParkingSlots={setParkingSlots}
                    operationType={operationType}
                    setOperationType={setOperationType}
                    position={position}
                    setPosition={setPosition}
                    newCarNumber={newCarNumber}
                    setNewCarNumber={setNewCarNumber}
                    handleAddCar={handleAddCar}
                    handleRemoveCar={handleRemoveCar}
                    handleUpdateCar={handleUpdateCar}

                />
            </div>

            {/* Spacing below CarForm to separate it from ParkingLot */}
            <div className=" mt-20 w-full flex items-center overflow-y-auto max-h-[500px] pr-4 ">

                <ParkingLot parkingSlots={parkingSlots} simulationSpeed={simulationSpeed} />

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

export default ArraySimulation;




/*import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import CircularMenuExample from "../CircularMenuExample";
import PseudoCode from "../PseudoCode";
import ExplanationCollapse from "../ExplanationCollapse";
import CarForm from "./CarForm";
import ParkingLot from "./ParkingLot";

const ArraySimulation = ({ handleLogout }) => {
    const [parkingSlots, setParkingSlots] = useState([]);
    const [maxSize, setMaxSize] = useState(10);
    const [operationType, setOperationType] = useState("append");
    const [explanation, setExplanation] = useState("");
    const [highlightedLine, setHighlightedLine] = useState(-1);
    const [newCarNumber, setNewCarNumber] = useState("");
    const [position, setPosition] = useState("");
    const [isPlaying, setIsPlaying] = useState(true);
    const [history, setHistory] = useState([]); // Store history for undo/redo
    const [simulationSpeed, setSimulationSpeed] = useState(1000); // Start with normal speed
    // Handles Play/Pause Toggle
    const [progress, setProgress] = useState(0);
    const [speed, setSpeed] = useState(1); // Local state to manage slider value
    const [operationInProgress, setOperationInProgress] = useState(false);



    // Simulate progress bar movement when playing
    useEffect(() => {
        let interval;
        if (isPlaying && operationInProgress) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100; // Ensure it stops at 100%
                    }
                    return prev + speed * 0.5;
                });
            }, 100);
        }

        return () => clearInterval(interval);
    }, [isPlaying, speed, operationInProgress]);




    const carImages = [
        "/car1.png",
        "/car2.png",
        "/car3.png",
        "/car4.png",
        "/car5.png",
    ];
    const pseudoCode = {
        append: [
            "if (lenFilled === lenArray)",
            "   double size of A",
            "A[lenFilled] = element",
            "lenFilled++"
        ],
        insertion: [
            "if (lenFilled === lenArray)",
            "   double size of A",
            "for (j = lenFilled - 1; j >= position; j--)",
            "   A[j + 1] = A[j]",
            "A[position] = element",
            "lenFilled++"
        ],
        remove: [
            "if empty, do nothing",
            "remove A[position]",
            "for (j = position+1; j < lenfilled ; j++)",
            "   A[j-1] = A[j]",
            "lenfilled--",
        ],
        update: [
            "A[position]=element"
        ]
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };


    const handleReset = () => {
        setParkingSlots(Array.from({ length: maxSize }, () => null)); // Reset parking slots
        setHistory([]); // Clear history
        setIsPlaying(false); // Stop playing if active
        setProgress(0);
        //showTemporaryExplanation("Simulation reset!");

    };

    const handleForward = () => {
        // showTemporaryExplanation("Fast-forwarding simulation...");
        setProgress((prev) => Math.min(prev + 10, 100));
        setTimeout(() => setExplanation("Simulation completed!"), 1000);
    };

    const changeSpeed = (newSpeed) => {
        setSimulationSpeed(1000 / newSpeed); // Adjust speed (higher value = faster)
        console.log(simulationSpeed);
    };

    const handleRewind = () => {
        //showTemporaryExplanation("Rewinding simulation...");
        if (history.length > 1) {
            const lastState = history[history.length - 2];
            setParkingSlots(lastState);
            setHistory(history.slice(0, history.length - 1));
        }
        setProgress((prev) => Math.max(prev - 10, 0));
    };

    const handleGoToBegining = () => {
        if (history.length > 0) {
            setParkingSlots(history[0]); // Move to the first recorded state
            setProgress(0); // Reset progress bar
        }
    };

    const handleGoToEnd = () => {
        if (history.length > 0) {
            setParkingSlots(history[history.length - 1]); // Move to the last recorded state
            setProgress(100); // Move progress bar to 100%
        }
    };



    const addHistory = (newState) => {
        setHistory([...history, newState]);
    };



    const handleAddCar = async () => {
        if (!isPlaying) {
            alert("Simulation is paused. Press Play to continue.")
            //showTemporaryExplanation("Simulation is paused. Press Play to continue.");
            return;
        }

        if (newCarNumber === "") {
            alert("Enter a car number!");
            return;
        }
        setOperationInProgress(true); // Start operation

        const newSlots = [...parkingSlots];
        const filledSlots = newSlots.filter(slot => slot !== null).length;

        if (filledSlots === maxSize) {
            setHighlightedLine(0);
            setExplanation("Parking lot is full; resizing is needed.");
            await new Promise(resolve => setTimeout(resolve, simulationSpeed));
            //await new Promise(resolve => setTimeout(resolve));

            setHighlightedLine(1);
            setExplanation("Doubling the parking lot size.");
            newSlots.push(...Array(maxSize).fill(null));
            setMaxSize(maxSize * 2);
            setParkingSlots(newSlots);
            addHistory(newSlots);
            await new Promise(resolve => setTimeout(resolve, simulationSpeed));
            //await new Promise(resolve => setTimeout(resolve));
        }

        if (operationType === "append") {
            setHighlightedLine(2);
            setExplanation("Appending the new car at the first available slot.");
            const emptySlotIndex = newSlots.findIndex(slot => slot === null);
            const randomImage = carImages[Math.floor(Math.random() * carImages.length)];
            newSlots[emptySlotIndex] = { number: newCarNumber, image: randomImage };
            setParkingSlots(newSlots);
            addHistory(newSlots);

            await new Promise(resolve => setTimeout(resolve, simulationSpeed));
            //await new Promise(resolve => setTimeout(resolve));

            setHighlightedLine(3);
            setExplanation("Incrementing the filled slots count.");
            setNewCarNumber("");
            return;
        }

        if (operationType === "insertion") {
            setHighlightedLine(2);
            setExplanation("Starting to shift cars to make space.");
            await new Promise(resolve => setTimeout(resolve, simulationSpeed));
            //await new Promise(resolve => setTimeout(resolve));
            for (let j = filledSlots - 1; j >= position; j--) {
                setHighlightedLine(3);
                setExplanation(`Car ${newSlots[j]?.number || "null"} is shifted from A[${j}] to A[${j + 1}].`);
                newSlots[j + 1] = newSlots[j];
                newSlots[j] = null;
                setParkingSlots([...newSlots]);
                addHistory([...newSlots]);
                await new Promise(resolve => setTimeout(resolve, simulationSpeed));
                //await new Promise(resolve => setTimeout(resolve));
            }

            setHighlightedLine(4);
            setExplanation("Inserting the new car at the specified position.");
            const randomImage = carImages[Math.floor(Math.random() * carImages.length)];
            newSlots[position] = { number: newCarNumber, image: randomImage };
            setParkingSlots(newSlots);
            addHistory(newSlots);

            await new Promise(resolve => setTimeout(resolve, simulationSpeed));
            //await new Promise(resolve => setTimeout(resolve));

            setHighlightedLine(5);
            setExplanation("Incrementing the filled slots count.");
            setNewCarNumber("");
            setPosition("");
        }
        setOperationInProgress(false); // End operation
    };

    const handleRemoveCar = async () => {
        if (!isPlaying) {
            //showTemporaryExplanation("Simulation is paused. Press Play to continue.");
            alert("Simulation is paused. Press Play to continue.")
            return;
        }

        if (position < 0 || position >= parkingSlots.length) {
            alert("Invalid position! Enter a valid position within the parking lot range.");
            return;
        }
        setOperationInProgress(true); // End operation

        const newSlots = [...parkingSlots];
        const lenfilled = newSlots.filter((slot) => slot !== null).length;

        if (position >= lenfilled) {
            //showTemporaryExplanation("No car exists at the specified position!");
            alert("No car exists at the specified position!")
            return;
        }

        setHighlightedLine(0);
        await new Promise((resolve) => setTimeout(resolve, simulationSpeed));
        //await new Promise(resolve => setTimeout(resolve));
        setHighlightedLine(1);
        newSlots[position] = null
        setParkingSlots([...newSlots]);
        addHistory(newSlots);
        await new Promise((resolve) => setTimeout(resolve, simulationSpeed));
        //await new Promise(resolve => setTimeout(resolve));


        for (let j = position + 1; j < lenfilled; j++) {
            setHighlightedLine(3);
            setExplanation(`Car ${newSlots[j]?.number || "null"} is shifted from A[${j}] to A[${j - 1}].`);
            newSlots[j - 1] = newSlots[j];
            newSlots[j] = null;
            setParkingSlots([...newSlots]);
            addHistory(newSlots);
            await new Promise((resolve) => setTimeout(resolve, simulationSpeed));
            //await new Promise(resolve => setTimeout(resolve));
        }
        setHighlightedLine(4);
        setPosition("");
        setOperationInProgress(false); // End operation

    }

    const handleUpdateCar = async () => {
        if (!isPlaying) {
            //showTemporaryExplanation("Simulation is paused. Press Play to continue.");
            alert("Simulation is paused. Press Play to continue.");
            return;
        }

        if (position < 0 || position >= parkingSlots.length) {
            alert("Invalid position! Enter a valid position within the parking lot range.");
            return;
        }
        setOperationInProgress(true); // Start operation

        const newSlots = [...parkingSlots];
        const lenfilled = newSlots.filter((slot) => slot !== null).length;

        if (position > lenfilled) {
            //showTemporaryExplanation("Appending the new car at the first available slot. ");
            setOperationType("append");
            handleAddCar();
            return;
        }
        setHighlightedLine(0);
        setExplanation(`New Car ${newSlots[position]?.number || "null"} is parked at A[${position}] .`);
        const randomImage = carImages[Math.floor(Math.random() * carImages.length)];
        newSlots[position] = { number: newCarNumber, image: randomImage };
        setParkingSlots(newSlots);
        addHistory(newSlots);

        await new Promise(resolve => setTimeout(resolve, simulationSpeed));
        setOperationInProgress(false); // End operation

    }

    // Update parkingSlots when maxSize changes
    useEffect(() => {
        setParkingSlots(Array.from({ length: maxSize }, () => null));
    }, [maxSize]);

    return (
        <div className=" flex flex-col items-center  min-h-screen">
            {/* Fixed Header }
            <Header handleLogout={handleLogout} />

            {/* Car Form Section - Stays at the top with margin-bottom }
            <div className="w-full max-w-5xl px-4 sticky top-16 z-10">
                <CarForm
                    maxSize={maxSize}
                    setMaxSize={setMaxSize}
                    parkingSlots={parkingSlots}
                    setParkingSlots={setParkingSlots}
                    operationType={operationType}
                    setOperationType={setOperationType}
                    position={position}
                    setPosition={setPosition}
                    newCarNumber={newCarNumber}
                    setNewCarNumber={setNewCarNumber}
                    handleAddCar={handleAddCar}
                    handleRemoveCar={handleRemoveCar}
                    handleUpdateCar={handleUpdateCar}

                />
            </div>

            {/* Spacing below CarForm to separate it from ParkingLot }
            <div className=" mt-20 w-full flex items-center overflow-y-auto max-h-[500px] pr-4 ">

                <ParkingLot parkingSlots={parkingSlots} />

            </div>

            {/* Collapsible Components }
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

            {/* Circular Menu }
            <CircularMenuExample iconSizeOverride={14} itemSizeOverride={1} radiusOverride={2} />

            {/* Fixed Footer }
            <Footer isPlaying={isPlaying}
                handlePlayPause={handlePlayPause}
                speed={speed}
                setSpeed={setSpeed}
                progress={progress}
                setProgress={setProgress}
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

export default ArraySimulation;*/

