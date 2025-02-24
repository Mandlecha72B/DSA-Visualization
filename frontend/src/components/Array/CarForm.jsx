//import React, { useState } from "react";
import { PlusCircle, Trash2, Edit } from "lucide-react"; // Elegant icons

const CarForm = ({
    maxSize,
    setMaxSize,
    parkingSlots,
    setParkingSlots,
    operationType,
    setOperationType,
    position,
    setPosition,
    newCarNumber,
    setNewCarNumber,
    handleAddCar,
    handleRemoveCar,
    handleUpdateCar,
}) => {
    return (
        <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white p-3 rounded-lg shadow-lg flex flex-wrap items-center gap-3 sm:gap-4 justify-between">
            {/* Max Parking Slots */}
            <label className="flex items-center text-sm sm:text-base">
                <span className="mr-2">Max Slots:</span>
                <input
                    type="number"
                    value={maxSize}
                    onChange={(e) => {
                        const newSize = Number(e.target.value);
                        if (newSize >= parkingSlots.length) {
                            setParkingSlots([
                                ...parkingSlots,
                                ...Array(newSize - parkingSlots.length).fill(null),
                            ]);
                        } else {
                            setParkingSlots(parkingSlots.slice(0, newSize));
                        }
                        setMaxSize(newSize);
                    }}
                    min="1"
                    className="input input-sm input-bordered w-20 bg-gray-700 text-white"
                />
            </label>

            {/* Car Number (Only show when not in update mode) */}
            {operationType !== "update" && (
                <label className="flex items-center text-sm sm:text-base">
                    <span className="mr-2">Car Number:</span>
                    <input
                        type="text"
                        value={newCarNumber}
                        onChange={(e) => setNewCarNumber(e.target.value)}
                        className="input input-sm input-bordered w-28 sm:w-32 bg-gray-700 text-white"
                    />
                </label>
            )}

            {/* Operation Type */}
            <label className="flex items-center text-sm sm:text-base">
                <span className="mr-2">Operation:</span>
                <select
                    value={operationType}
                    onChange={(e) => {
                        setOperationType(e.target.value);
                        setNewCarNumber(""); // Reset the car number field when changing operation
                        setPosition(""); // Reset position when changing operation
                    }}
                    className="select select-sm select-bordered bg-gray-700 text-white"
                >
                    <option value="append">Append</option>
                    <option value="insertion">Insertion</option>
                    <option value="remove">Remove</option>
                    <option value="update">Update</option>
                </select>
            </label>

            {/* Position Input (Shown for insertion, remove, and update operations) */}
            {(operationType === "insertion" || operationType === "remove" || operationType === "update") && (
                <label className="flex items-center text-sm sm:text-base">
                    <span className="mr-2">Position:</span>
                    <input
                        type="number"
                        value={position}
                        onChange={(e) => setPosition(Number(e.target.value))}
                        className="input input-sm input-bordered w-16 sm:w-20 bg-gray-700 text-white"
                    />
                </label>
            )}

            {/* New Car Number (Only show when in update mode) */}
            {operationType === "update" && (
                <label className="flex items-center text-sm sm:text-base">
                    <span className="mr-2">New Car No:</span>
                    <input
                        type="text"
                        value={newCarNumber}
                        onChange={(e) => setNewCarNumber(e.target.value)}
                        className="input input-sm input-bordered w-28 sm:w-32 bg-gray-700 text-white"
                    />
                </label>
            )}

            {/* Buttons */}
            <div className="flex gap-2 sm:gap-3">
                {(operationType === "append" || operationType === "insertion") && (
                    <button
                        onClick={handleAddCar}
                        className="btn btn-sm bg-green-600 hover:bg-green-500 text-white px-3 py-1 flex items-center gap-1"
                    >
                        <PlusCircle size={16} />
                        Add
                    </button>
                )}
                {operationType === "remove" && (
                    <button
                        onClick={handleRemoveCar}
                        className="btn btn-sm bg-red-600 hover:bg-red-500 text-white px-3 py-1 flex items-center gap-1"
                    >
                        <Trash2 size={16} />
                        Remove
                    </button>
                )}
                {operationType === "update" && (
                    <button
                        onClick={handleUpdateCar}
                        className="btn btn-sm bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 flex items-center gap-1"
                    >
                        <Edit size={16} />
                        Update
                    </button>
                )}
            </div>
        </div>
    );
};

export default CarForm;

