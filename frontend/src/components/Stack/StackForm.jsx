/* eslint-disable react/prop-types */
// // StackForm.js
// import { PlusCircle, Trash2, Search, Eye, X } from "lucide-react";

// const StackForm = ({
//     maxSize,
//     bookNumber,
//     setBookNumber,
//     operationType,
//     setOperationType,
//     position,
//     setPosition,
//     searchQuery,
//     setSearchQuery,
//     handlePush,
//     handlePop,
//     handlePeek,
//     handleSearch,
//     handleClear,
// }) => {
//     return (
//         <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 rounded-lg shadow-lg flex flex-wrap gap-3 items-center justify-between">
//             {/* Operation Selection */}
//             <select
//                 value={operationType}
//                 onChange={(e) => {
//                     setOperationType(e.target.value);
//                     setBookNumber("");
//                     setSearchQuery("");
//                 }}
//                 className="select select-sm bg-gray-700 text-white flex-1"
//             >
//                 <option value="push">Push</option>
//                 <option value="pop">Pop</option>
//                 <option value="peek">Peek</option>
//                 <option value="size">Size</option>
//                 <option value="search">Search</option>
//                 <option value="clear">Clear</option>
//             </select>

//             {/* Input Fields */}
//             {['push', 'search'].includes(operationType) && (
//                 <input
//                     type="text"
//                     placeholder={operationType === 'push'
//                         ? "Book number"
//                         : "Search book"}
//                     value={operationType === 'push' ? bookNumber : searchQuery}
//                     onChange={(e) => operationType === 'push'
//                         ? setBookNumber(e.target.value)
//                         : setSearchQuery(e.target.value)}
//                     className="input input-sm bg-gray-700 text-white w-32"
//                 />
//             )}

//             {/* Action Buttons */}
//             <div className="flex gap-2">
//                 {operationType === 'push' && (
//                     <button
//                         onClick={handlePush}
//                         className="btn btn-sm bg-green-600 hover:bg-green-500 text-white"
//                     >
//                         <PlusCircle size={16} /> Push
//                     </button>
//                 )}

//                 {operationType === 'pop' && (
//                     <button
//                         onClick={handlePop}
//                         className="btn btn-sm bg-red-600 hover:bg-red-500 text-white"
//                     >
//                         <Trash2 size={16} /> Pop
//                     </button>
//                 )}

//                 {operationType === 'peek' && (
//                     <button
//                         onClick={handlePeek}
//                         className="btn btn-sm bg-yellow-600 hover:bg-yellow-500 text-white"
//                     >
//                         <Eye size={16} /> Peek
//                     </button>
//                 )}

//                 {operationType === 'search' && (
//                     <button
//                         onClick={handleSearch}
//                         className="btn btn-sm bg-blue-600 hover:bg-blue-500 text-white"
//                     >
//                         <Search size={16} /> Search
//                     </button>
//                 )}

//                 {operationType === 'clear' && (
//                     <button
//                         onClick={handleClear}
//                         className="btn btn-sm bg-purple-600 hover:bg-purple-500 text-white"
//                     >
//                         <X size={16} /> Clear
//                     </button>
//                 )}
//             </div>

//             {/* Additional Info */}
//             <div className="flex gap-2 text-sm">
//                 <span className="badge badge-info">
//                     Capacity: {maxSize}
//                 </span>
//                 <span className="badge badge-success">
//                     Size: {maxSize}
//                 </span>
//             </div>
//         </div>
//     );
// };

// export default StackForm;

// StackForm.js
import { PlusCircle, Trash2, Search, Eye, X } from "lucide-react";

const StackForm = ({
    maxSize,
    bookNumber,
    setBookNumber,
    operationType,
    setOperationType,
    searchQuery,
    setSearchQuery,
    handlePush,
    handlePop,
    handlePeek,
    handleSearch,
    handleClear,
    size,
}) => {
    return (
        <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 rounded-lg shadow-lg flex flex-wrap gap-3 items-center justify-between">
            {/* Operation Selection */}
            <select
                value={operationType}
                onChange={(e) => {
                    setOperationType(e.target.value);
                    setBookNumber("");
                    setSearchQuery("");
                }}
                className="select select-sm bg-gray-700 text-white flex-1"
            >
                <option value="push">Push</option>
                <option value="pop">Pop</option>
                <option value="peek">Peek</option>
                <option value="search">Search</option>
            </select>

            {/* Input Fields */}
            {["push", "search"].includes(operationType) && (
                <input
                    type="text"
                    placeholder={operationType === "push" ? "Book number" : "Search book"}
                    value={operationType === "push" ? bookNumber : searchQuery}
                    onChange={(e) =>
                        operationType === "push"
                            ? setBookNumber(e.target.value)
                            : setSearchQuery(e.target.value)
                    }
                    className="input input-sm bg-gray-700 text-white w-32"
                />
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
                {operationType === "push" && (
                    <button
                        onClick={handlePush}
                        className="btn btn-sm bg-green-600 hover:bg-green-500 text-white"
                    >
                        <PlusCircle size={16} /> Push
                    </button>
                )}

                {operationType === "pop" && (
                    <button
                        onClick={handlePop}
                        className="btn btn-sm bg-red-600 hover:bg-red-500 text-white"
                    >
                        <Trash2 size={16} /> Pop
                    </button>
                )}

                {operationType === "peek" && (
                    <button
                        onClick={handlePeek}
                        className="btn btn-sm bg-yellow-600 hover:bg-yellow-500 text-white"
                    >
                        <Eye size={16} /> Peek
                    </button>
                )}

                {operationType === "search" && (
                    <button
                        onClick={handleSearch}
                        className="btn btn-sm bg-blue-600 hover:bg-blue-500 text-white"
                    >
                        <Search size={16} /> Search
                    </button>
                )}

                {/* Clear button */}
                <button
                    onClick={handleClear}
                    className="btn btn-sm bg-purple-600 hover:bg-purple-500 text-white"
                >
                    <X size={16} /> Clear
                </button>
            </div>

            {/* Stack Info */}
            <div className="flex gap-2 text-sm">
                <span className="badge badge-info">Capacity: {maxSize}</span>
                <span className="badge badge-success">Size: {size}</span>
            </div>
        </div>
    );
};

export default StackForm;
