import { PlusCircle, Trash2, Edit, Search } from "lucide-react"; // Elegant icons

const TrainForm = ({


    operationType,
    setOperationType,
    position,
    setPosition,
    newCompartmentNumber,
    setnewCompartmentNumber,
    handleAddCompartment,
    handleRemoveCompartment,
    handleUpdateCompartment,
    handleSearchCompartment,
}) => {
    return (
        <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white p-3 rounded-lg shadow-lg flex flex-wrap items-center gap-3 sm:gap-4 justify-between">


            {/* Car Number (Only show when not in update mode) */}
            {operationType !== "update" && operationType !== "deleteFront" && operationType !== "deleteEnd" && (
                <label className="flex items-center text-sm sm:text-base">
                    <span className="mr-2">Compartment Number:</span>
                    <input
                        type="text"
                        value={newCompartmentNumber}
                        onChange={(e) => setnewCompartmentNumber(e.target.value)}
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
                        setnewCompartmentNumber(""); // Reset the car number field when changing operation
                        setPosition(""); // Reset position when changing operation
                    }}
                    className="select select-sm select-bordered bg-gray-700 text-white"
                >
                    <option value="front">Insert at Front</option>
                    <option value="end">Insert at end</option>
                    <option value="position">Insert at any Position</option>
                    <option value="deleteFront">Delete From front</option>
                    <option value="deleteEnd">Delete From End</option>
                    <option value="deletePosition">Delete From any Position</option>
                    <option value="search">Search</option>
                    <option value="update">Update</option>
                </select>
            </label>

            {/* Position Input (Shown for insertion, remove, and update operations) */}
            {(operationType === "position" || operationType === "deletePosition" || operationType === "update") && (
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
                    <span className="mr-2">New Compartment No:</span>
                    <input
                        type="text"
                        value={newCompartmentNumber}
                        onChange={(e) => setnewCompartmentNumber(e.target.value)}
                        className="input input-sm input-bordered w-28 sm:w-32 bg-gray-700 text-white"
                    />
                </label>
            )}



            {/* Buttons */}
            <div className="flex gap-2 sm:gap-3">
                {(operationType === "front" || operationType === "end" || operationType === "position") && (
                    <button
                        onClick={handleAddCompartment}
                        className="btn btn-sm bg-green-600 hover:bg-green-500 text-white px-3 py-1 flex items-center gap-1"
                    >
                        <PlusCircle size={16} />
                        Add
                    </button>
                )}
                {(operationType === "deletePosition" || operationType === "deleteFront" || operationType === "deleteEnd") && (
                    <button
                        onClick={handleRemoveCompartment}
                        className="btn btn-sm bg-red-600 hover:bg-red-500 text-white px-3 py-1 flex items-center gap-1"
                    >
                        <Trash2 size={16} />
                        Remove
                    </button>
                )}
                {operationType === "search" && (
                    <button
                        onClick={handleSearchCompartment}
                        className="btn btn-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 flex items-center gap-1"
                    >
                        <Search size={16} />
                        Search
                    </button>
                )}
                {operationType === "update" && (
                    <button
                        onClick={handleUpdateCompartment}
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

export default TrainForm;

