/*import React from "react";
import { motion } from "framer-motion";

const ParkingSlot = ({ car,  index }) => {
    return (
        <div className="w-30 h-30 border-2 border-gray-300 flex flex-col items-center justify-center bg-white rounded-md shadow-md relative transition-transform duration-200 hover:scale-105 hover:bg-teal-100">
            {car ? (
                <>
                    <motion.img
                        src={car.image}
                        alt="Car"
                        className="w-24 h-20 object-cover rounded-md mb-1"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 / speed }}
                    />
                    <p className="text-sm font-bold text-gray-800 text-center">{car.number}</p>
                </>
            ) : (
                <div className="text-gray-400 text-sm">Empty</div>
            )}
            <p className="text-xs font-bold text-gray-600 absolute -bottom-7">Slot {index}</p>
        </div>
    );
};

export default ParkingSlot;*/

/*import React from "react";
import { motion } from "framer-motion";

const ParkingSlot = ({ car, index }) => {
    return (
        <motion.div
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-2 border-gray-300 flex flex-col items-center 
            justify-center bg-white rounded-lg shadow-lg relative transition-all duration-300 ease-in-out hover:scale-105 
            hover:bg-teal-100"
            whileHover={{ scale: 1.08 }}
        >
            {car ? (
                <>
                    <motion.img
                        src={car.image}
                        alt="Car"
                        className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-md mb-1"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <p className="text-xs sm:text-sm font-bold text-gray-800 text-center">{car.number}</p>
                </>
            ) : (
                <div className="text-gray-400 text-sm">Empty</div>
            )}
            <p className="text-xs font-semibold text-gray-600 absolute -bottom-5">Slot {index + 1}</p>
        </motion.div>
    );
};

export default ParkingSlot;*/

/*import React from "react";
import { motion } from "framer-motion";

const ParkingSlot = ({ car, index, slotSize }) => {
    return (
        <motion.div
            className="border-2 border-gray-300 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg 
            relative transition-all duration-300 ease-in-out hover:scale-105 hover:bg-teal-100"
            whileHover={{ scale: 1.08 }}
            style={{
                width: `${slotSize}px`,  // Slot width dynamically adjusts
                height: `${slotSize}px`, // Slot height dynamically adjusts
            }}
        >
            {car ? (
                <>
                    <motion.img
                        src={car.image}
                        alt="Car"
                        className="object-cover rounded-md mb-1"
                        style={{
                            width: `${Math.max(50, slotSize * 0.8)}px`,  
                            height: `${Math.max(40, slotSize * 0.6)}px`,  
                        }}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <p className="text-xs sm:text-sm font-bold text-gray-800 text-center">{car.number}</p>
                </>
            ) : (
                <div className="text-gray-400 text-sm">Empty</div>
            )}
            <p className="text-xs font-semibold text-gray-600 absolute -bottom-5">Slot {index + 1}</p>
        </motion.div>
    );
};

export default ParkingSlot;*/

/*import React from "react";
import { motion } from "framer-motion";

const ParkingSlot = ({ car, index, slotSize }) => {
    // Detect small screens (Galaxy A51 and similar)
    const isSmallScreen = window.innerWidth < 640;

    // Adjust slot dimensions dynamically
    const adjustedSlotSize = isSmallScreen ? slotSize * 0.85 : slotSize; // Reduce size for small screens

    return (
        <motion.div
            className="border-2 border-gray-300 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg 
            relative transition-all duration-300 ease-in-out hover:scale-105 hover:bg-teal-100"
            whileHover={{ scale: 1.08 }}
            style={{
                width: `${adjustedSlotSize}px`,  // Adjusted slot width
                height: `${adjustedSlotSize}px`, // Adjusted slot height
            }}
        >
            {car ? (
                <>
                    <motion.img
                        src={car.image}
                        alt="Car"
                        className="object-cover rounded-md mb-1"
                        style={{
                            width: `${Math.max(40, adjustedSlotSize * 0.75)}px`, // Adjusted for better fit
                            height: `${Math.max(30, adjustedSlotSize * 0.55)}px`, // Adjusted for better fit
                        }}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <p className="text-xs sm:text-sm font-bold text-gray-800 text-center">{car.number}</p>
                </>
            ) : (
                <div className="text-gray-400 text-sm">Empty</div>
            )}
            <p className="text-sm font-semibold text-gray-600 absolute -bottom-5">Slot {index }</p>
        </motion.div>
    );
};

export default ParkingSlot;*/

import React from "react";
import { motion } from "framer-motion";

const ParkingSlot = ({ car, index, slotSize, simulationSpeed }) => {
    const isSmallScreen = window.innerWidth < 640;
    const adjustedSlotSize = isSmallScreen ? slotSize * 0.85 : slotSize;

    return (
        <motion.div
            className={`border-2 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg 
            relative transition-all duration-300 ease-in-out hover:scale-105 ${car ? "bg-gradient-to-br from-purple-400 via-pink-400 to-red-400" : "bg-white"
                }`} // Highlight moving cars
            whileHover={{ scale: 1.08, boxShadow: "0px 0px 10px rgba(0, 255, 150, 0.4)" }}
            style={{
                width: `${adjustedSlotSize}px`,
                height: `${adjustedSlotSize}px`,
            }}
            initial={{ opacity: 0, scale: 0.8, backgroundColor: "#D1FAE5" }} // Light green on entry
            animate={{ opacity: 1, scale: 1, backgroundColor: car ? "#F87171" : "#FFFFFF" }}
            exit={{ x: 50, opacity: 0, scale: 0.5, backgroundColor: "#F87171" }} // Red on removal
            transition={{ duration: 0.5 }}
        >
            {car ? (
                <>
                    <motion.img
                        src={car.image}
                        alt="Car"
                        className="object-cover rounded-md mb-1"
                        style={{
                            width: `${Math.max(40, adjustedSlotSize * 0.75)}px`,
                            height: `${Math.max(30, adjustedSlotSize * 0.55)}px`,
                        }}
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 / simulationSpeed }}
                        exit={{ x: 50, opacity: 0, scale: 0.5 }}
                    />
                    <motion.p
                        className="text-xs sm:text-sm font-bold text-gray-800 text-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {car.number}
                    </motion.p>
                </>
            ) : (
                <motion.div
                    className="text-gray-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    Empty
                </motion.div>
            )}
            <p className="text-sm font-semibold text-gray-600 absolute -bottom-5">Slot {index}</p>
        </motion.div>
    );
};

export default ParkingSlot;





