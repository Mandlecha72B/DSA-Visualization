/*import React from "react";
import ParkingSlot from "./ParkingSlot";

const ParkingLot = ({ parkingSlots }) => {
    return (
        <div className="flex flex-wrap justify-around gap-5 p-5 bg-gray-100 rounded-xl shadow-lg">
            {parkingSlots.map((car, index) => (
                <ParkingSlot key={index} car={car} speed={speed} index={index} />
            ))}
        </div>
    );
};

export default ParkingLot;*/

/*import React from "react";
import ParkingSlot from "./ParkingSlot";

const ParkingLot = ({ parkingSlots }) => {
    return (
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl shadow-lg">
            {parkingSlots.map((car, index) => (
                <ParkingSlot key={index} car={car} index={index} />
            ))}
        </div>
    );
};

export default ParkingLot;*/


/*import React from "react";
import ParkingSlot from "./ParkingSlot";

const ParkingLot = ({ parkingSlots }) => {
    // Calculate number of columns dynamically
    const columns = Math.min(Math.ceil(parkingSlots.length / 2), 8); // Max columns capped at 8
    const slotSize = Math.max(80, 200 - columns * 15); // Adjust slot size based on columns

    return (
        <div
            className="overflow-y-auto flex justify-start p-4 bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl shadow-lg"
            style={{
                maxWidth: "90vw", // Prevents overlapping with PseudoCode & ExplanationCollapse
                maxHeight: "500px", // Prevents it from overflowing
            }}
        >
            <div
                className="grid gap-4"
                style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(${slotSize}px, 1fr))`,
                }}
            >
                {parkingSlots.map((car, index) => (
                    <ParkingSlot key={index} car={car} index={index} slotSize={slotSize} />
                ))}
            </div>
        </div>
    );
};

export default ParkingLot;*/

/*import React from "react";
import ParkingSlot from "./ParkingSlot";

const ParkingLot = ({ parkingSlots }) => {
    // Check screen width to adjust layout dynamically
    const isSmallScreen = window.innerWidth < 640; // Galaxy A51 and similar devices

    // Adjust the number of columns dynamically
    const columns = isSmallScreen
        ? Math.min(Math.ceil(parkingSlots.length / 2), 6)  // More columns for small screens
        : Math.min(Math.ceil(parkingSlots.length / 2), 8); // Max columns capped at 8 for larger screens

    // Adjust slot size dynamically based on screen size
    const slotSize = isSmallScreen
        ? Math.max(60, 150 - columns * 10)  // Smaller slots for small screens
        : Math.max(80, 200 - columns * 15); // Standard size for larger screens

    return (
        <div
            className="overflow-y-auto flex justify-start items-center p-4 bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl shadow-lg"
            style={{
                maxWidth: isSmallScreen ? "100vw" : "90vw", // Increase width for small screens
                maxHeight: isSmallScreen ? "420px" : "500px", // Decrease height for small screens
            }}
        >
            <div
                className="grid gap-3 sm:gap-4" // Reduce gap between slots for small screens
                style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(${slotSize}px, 1fr))`,
                }}
            >
                {parkingSlots.map((car, index) => (
                    <ParkingSlot key={index} car={car} index={index} slotSize={slotSize} />
                ))}
            </div>
        </div>
    );
};

export default ParkingLot;*/

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParkingSlot from "./ParkingSlot";

const ParkingLot = ({ parkingSlots, simulationSpeed }) => {
    const isSmallScreen = window.innerWidth < 640;
    const columns = isSmallScreen
        ? Math.min(Math.ceil(parkingSlots.length / 2), 6)
        : Math.min(Math.ceil(parkingSlots.length / 2), 8);

    const slotSize = isSmallScreen
        ? Math.max(60, 150 - columns * 10)
        : Math.max(80, 200 - columns * 15);

    return (
        <motion.div
            className="overflow-hidden flex justify-start items-center p-4 bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl shadow-lg"
            style={{
                maxWidth: isSmallScreen ? "100vw" : "90vw",
                maxHeight: isSmallScreen ? "420px" : "500px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="grid gap-3 sm:gap-4 overflow-y-auto"
                style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(${slotSize}px, 1fr))`,
                    maxHeight: isSmallScreen ? "400px" : "480px", // Adjust height for better scrolling
                    paddingBottom: "10px", // Prevent clipping of top slots
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >

                <AnimatePresence>
                    {parkingSlots.map((car, index) => (
                        <ParkingSlot key={index} car={car} index={index} slotSize={slotSize} simulationSpeed={simulationSpeed} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default ParkingLot;
