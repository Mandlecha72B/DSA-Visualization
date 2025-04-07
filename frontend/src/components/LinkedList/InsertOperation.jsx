/*import React, { forwardRef } from "react";

const InsertOperation = forwardRef((props, ref) => {
    const { lineRef, compartments, compartmentRefs, arrowStates, searchIndex, newCompartmentPos, showArrow, relativeLeft, newCompartmentNumber } = props;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="relative">
                <div className="flex items-center gap-6" ref={lineRef}>
                    {compartments.map((compartment, index) => (
                        <React.Fragment key={index}   >
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
                                className={`bg-blue-500 w-32 h-24 rounded-md flex flex-col justify-between items-center text-white text-lg shadow-lg p-2 ${searchIndex === index ? "ring-4 ring-pink-500" : ""
                                    }`}
                                ref={el => (compartmentRefs.current[index] = el)} // Attach divref to specific compartment
                            >
                                {/* Image inside the rectangle *}
                                <img
                                    src={compartment.image} // Replace with a dynamic image URL if needed
                                    alt="icon"
                                    className="w-28 h-14 mb-1"
                                />
                                <div className="text-center text-sm font-bold">{compartment.number}</div> {/* Displaying the number *}
                            </div>

                            {index === compartments.length - 1 && (
                                <div className="absolute top-[-50px] right-4 flex flex-col items-center">
                                    <span className="bg-red-500 text-white px-2 py-1 rounded">Tail/{index}</span>
                                    <svg width="24" height="24">
                                        <line x1="12" y1="0" x2="12" y2="24" stroke="red" strokeWidth="2" />
                                        <polygon points="6,18 12,24 18,18" fill="red" />
                                    </svg>
                                </div>
                            )}
                            {index < compartments.length - 1 && (
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
                                        stroke="blue"
                                        strokeWidth="2"
                                    />
                                    <polygon
                                        points={`30,${arrowStates[index].height / 2 - 5} 40,${arrowStates[index].height / 2} 30,${arrowStates[index].height / 2 + 5}`}
                                        fill="blue"
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

                {newCompartmentPos !== null && (
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
                                <line x1="32" y1="40" x2="32" y2="10" stroke="blue" strokeWidth="2" />
                                <polygon points="28,10 36,10 32,0" fill="blue" />
                            </svg>
                        )}

                        <div
                            className={`bg-purple-600 w-32 h-24 rounded-md flex flex-col justify-between items-center text-white text-lg shadow-lg p-2 
                                                   }`}
                        >
                            {/* Image inside the rectangle *}
                            <img
                                src="/TrainCompartment.png" // Replace with a dynamic image URL if needed
                                alt="icon"
                                className="w-28 h-14 mb-1"
                            />
                            <div className="text-center text-sm font-bold">{newCompartmentNumber}</div> {/* Displaying the number *}
                        </div>
                    </div>
                )}
            </div>
        </div>);
})

export default InsertOperation;*/

import React, { forwardRef } from "react";

const InsertOperation = forwardRef((props, ref) => {  // Destructure props correctly
    const { compartments, compartmentRef, arrowStates, searchIndex, newCompartmentPos, showArrow, relativeLeft, newCompartmentNumber, operationType, shiftHead, shiftTail, position, shiftNode, tempIndex, increaseArrowWidth } = props;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="relative">
                <div className="flex items-center gap-6" ref={ref}>
                    {compartments.map((compartment, index) => (
                        <React.Fragment key={index}>
                            {(index === 0 || (shiftHead)) && (
                                <div
                                    className="absolute top-[-50px] flex flex-col items-center transition-all duration-500 ease-in-out"
                                    style={{
                                        left: shiftHead ? `${128 + 2 * 24 + 40}px` : "0px",
                                    }}
                                >
                                    <span className="bg-purple-500 text-white px-2 py-1 rounded">Head/{shiftHead?1:index}</span>
                                    <svg width="24" height="24">
                                        <line x1="12" y1="0" x2="12" y2="24" stroke="purple" strokeWidth="2" />
                                        <polygon points="6,18 12,24 18,18" fill="purple" />
                                    </svg>
                                </div>
                            )}

                            <div
                                className={`bg-blue-500 w-32 h-24 rounded-md flex flex-col justify-between items-center text-white text-lg shadow-lg p-2 ${searchIndex === index ? "ring-4 ring-pink-500" : ""
                                    }`}
                                ref={compartmentRef} // Attach ref to each compartment
                                style={{
                                    transition: "transform 0.5s ease-in-out",
                                    transform: shiftNode && index === position-1 ? "translateY(-120px)" : "none", // Move only selected compartment
                                }}
                            >
                                <img
                                    src={compartment.image}
                                    alt="icon"
                                    className="w-28 h-14 mb-1"
                                />
                                <div className="text-center text-sm font-bold">{compartment.number}</div>
                            </div>

                            {(index === compartments.length - 1 || (shiftTail)) && (
                                <div className="absolute top-[-50px] flex flex-col items-center transition-all duration-500 ease-out"
                                    style={{
                                        right: shiftTail ? `${128 + 2 * 24 + 40}px` : "0px",

                                    }}
                                >
                                    <span className="bg-red-500 text-white px-2 py-1 rounded">Tail/{ shiftTail?compartments.length-2: index }</span>
                                    <svg width="24" height="24">
                                        <line x1="12" y1="0" x2="12" y2="24" stroke="red" strokeWidth="2" />
                                        <polygon points="6,18 12,24 18,18" fill="red" />
                                    </svg>
                                </div>
                            )}
                            {index < compartments.length - 1 && arrowStates[index] && (
                                <svg
                                    width={increaseArrowWidth && index===position-2 ? 60 : 40} // Adjust width based on increaseArrowWidth prop
                                    height={arrowStates[index].height}
                                    style={{
                                        transition: "transform 0.5s, height 0.5s",
                                        transform: arrowStates[index].transform,
                                    }}
                                >
                                    <line
                                        x1="0"
                                        y1={arrowStates[index].height / 2}
                                        x2={increaseArrowWidth && index === position - 2 ? 60 : 40}
                                        y2={arrowStates[index].height / 2}
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                    <polygon
                                        points={increaseArrowWidth && index === position - 2 ? `50,${arrowStates[index].height / 2 - 5} 60,${arrowStates[index].height / 2} 50,${arrowStates[index].height / 2 + 5}` :`30,${arrowStates[index].height / 2 - 5} 40,${arrowStates[index].height / 2} 30,${arrowStates[index].height / 2 + 5}`}
                                        fill="white"
                                    />
                                </svg>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                {tempIndex >= 0 && (operationType === "deleteFront"|| operationType==="deletePosition") && (
                    <div
                        className="absolute flex flex-col items-center transition-all duration-500 ease-in-out"
                        style={{
                            top: "95px",
                            left: `${tempIndex === 0 ? 32 : tempIndex * (128 + 2 * 24 + 40)}px`,
                            transition: "transform 0.5s ease-in-out",
                            transform: shiftNode  ? "translateY(-120px)" : "none", // Move only selected compartment
                        }}
                    >
                        <svg width="24" height="24">
                            <line x1="12" y1="24" x2="12" y2="0" stroke="green" strokeWidth="2" />
                            <polygon points="6,6 12,0 18,6" fill="green" />
                        </svg>
                        <span className="bg-green-500 text-white px-2 py-1 rounded">temp</span>
                    </div>
                )}



                {searchIndex >= 0  && (
                    <div
                        className="absolute flex flex-col items-center transition-all duration-500 ease-in-out"
                        style={{
                            top: "95px",
                            left: `${searchIndex === 0 ? 32 : searchIndex * (128 + 2 * 24 + 40)}px`,
                        }}
                    >
                        <svg width="24" height="24">
                            <line x1="12" y1="24" x2="12" y2="0" stroke="green" strokeWidth="2" />
                            <polygon points="6,6 12,0 18,6" fill="green" />
                        </svg>
                        <span className="bg-green-500 text-white px-2 py-1 rounded">Curr/{searchIndex}</span>
                    </div>
                )}




                {newCompartmentPos !== null && (
                    <div
                        className="absolute flex flex-col items-center"
                        style={{
                            position: "absolute",
                            left: `${relativeLeft}px`,
                            top: "125px",
                        }}
                    >
                        {showArrow && operationType === "end" && (
                            <svg width="64" height="40" style={{ position: "absolute", top: "-40px" }}>
                                <line x1="32" y1="0" x2="32" y2="30" stroke="white" strokeWidth="2" /> {/* Line pointing downward */}
                                <polygon points="28,30 36,30 32,40" fill="white" /> {/* Triangle at the bottom to reverse the arrow */}
                            </svg>
                        )}

                        {showArrow && (operationType === "front" || operationType === "position") && (
                            <svg width="64" height="40" style={{ position: "absolute", top: "-40px" }}>
                                <line x1="32" y1="40" x2="32" y2="10" stroke="white" strokeWidth="2" />
                                <polygon points="28,10 36,10 32,0" fill="white" />
                            </svg>
                        )}

                        <div className="bg-purple-600 w-32 h-24 rounded-md flex flex-col justify-between items-center text-white text-lg shadow-lg p-2">
                            <img src="/TrainCompartment.png" alt="icon" className="w-28 h-14 mb-1" />
                            <div className="text-center text-sm font-bold">{newCompartmentNumber}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default InsertOperation;

