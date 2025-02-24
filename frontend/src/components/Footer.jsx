import React from "react";
import { Play, Pause, StepForward, StepBack, ChevronsLeft, ChevronsRight, RotateCw } from "lucide-react";
import Slider from "./Slider";
import Tooltip from "./Tooltip";

const Footer = ({ isPlaying,
    handlePlayPause,
    onRewind,
    onForward,
    changeSpeed,
    onReset,
    speed,
    setSpeed,
    handleGoToBegining,
    handleGoToEnd
}) => {

    const handleSpeedChange = (newSpeed) => {
        setSpeed(newSpeed); // Update local state
        changeSpeed(newSpeed); // Call parent-provided function to update speed
        console.log(speed);
    };

    return (
        <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white px-2 py-1 flex flex-col sm:flex-row justify-between items-center shadow-lg z-50 h-auto min-h-[50px] sm:min-h-[45px]">
            {/* Speed Control Slider */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-1/4 justify-center sm:justify-center">
                <span className="text-xs sm:text-sm">Speed:</span>
                <Slider
                    value={speed}
                    onChange={handleSpeedChange}
                    min={0.5}
                    max={3}
                    step={0.1}
                    className="w-24 sm:w-32 h-2"
                />
                <span className="text-xs sm:text-sm">{speed.toFixed(1)}x</span>
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center">
                <Tooltip content="Go to Beginning">
                    <button onClick={handleGoToBegining} className="p-1 rounded hover:bg-gray-700">
                        <ChevronsLeft size={20} />
                    </button>
                </Tooltip>

                <Tooltip content="Step Backward">
                    <button onClick={onRewind} className="p-1 rounded hover:bg-gray-700">
                        <StepBack size={20} />
                    </button>
                </Tooltip>

                <Tooltip content={isPlaying ? "Pause" : "Play"}>
                    <button onClick={handlePlayPause} className="p-1 rounded hover:bg-gray-700">
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                </Tooltip>

                <Tooltip content="Step Forward">
                    <button onClick={onForward} className="p-1 rounded hover:bg-gray-700">
                        <StepForward size={20} />
                    </button>
                </Tooltip>

                <Tooltip content="Go to End">
                    <button onClick={handleGoToEnd} className="p-1 rounded hover:bg-gray-700">
                        <ChevronsRight size={20} />
                    </button>
                </Tooltip>

                {/* 🔄 Reset Button (Newly Added) */}
                <Tooltip content="Reset">
                    <button onClick={onReset} className="p-1 rounded hover:bg-gray-700">
                        <RotateCw size={20} />
                    </button>
                </Tooltip>
            </div>

            
        </footer>
    );
};

export default Footer;






/*import React from "react";
import { Play, Pause, StepForward, StepBack, ChevronsLeft, ChevronsRight, RotateCw } from "lucide-react";
import Slider from "./Slider";
import Tooltip from "./Tooltip";

const Footer = ({ isPlaying, 
    handlePlayPause,
    onRewind,
    onForward,
    changeSpeed,
    onReset,
    speed,
    setSpeed,
    progress,
    setProgress,
    handleGoToBegining,
    handleGoToEnd
 }) => {
    
    const handleSpeedChange = (newSpeed) => {
        setSpeed(newSpeed); // Update local state
        changeSpeed(newSpeed); // Call parent-provided function to update speed
        console.log(speed);
    };


   

    return (
        <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white px-2 py-1 flex flex-col sm:flex-row justify-between items-center shadow-lg z-50 h-auto min-h-[50px] sm:min-h-[45px]">
            {/* Speed Control Slider }
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-1/4 justify-center sm:justify-start">
                <span className="text-xs sm:text-sm">Speed:</span>
                <Slider
                    value={speed}
                    onChange={handleSpeedChange}
                    min={0.5}
                    max={3}
                    step={0.1}
                    className="w-24 sm:w-32 h-2"
                />
                <span className="text-xs sm:text-sm">{speed.toFixed(1)}x</span>
            </div>

            {/* Control Buttons }
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center">
                <Tooltip content="Go to Beginning">
                    <button onClick={handleGoToBegining} className="p-1 rounded hover:bg-gray-700">
                        <ChevronsLeft size={20} />
                    </button>
                </Tooltip>

                <Tooltip content="Step Backward">
                    <button onClick={onRewind} className="p-1 rounded hover:bg-gray-700">
                        <StepBack size={20} />
                    </button>
                </Tooltip>

                <Tooltip content={isPlaying ? "Pause" : "Play"}>
                    <button onClick={handlePlayPause} className="p-1 rounded hover:bg-gray-700">
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                </Tooltip>

                <Tooltip content="Step Forward">
                    <button onClick={onForward} className="p-1 rounded hover:bg-gray-700">
                        <StepForward size={20} />
                    </button>
                </Tooltip>

                <Tooltip content="Go to End">
                    <button onClick={handleGoToEnd} className="p-1 rounded hover:bg-gray-700">
                        <ChevronsRight size={20} />
                    </button>
                </Tooltip>

                {/* 🔄 Reset Button (Newly Added) }
                <Tooltip content="Reset">
                    <button onClick={onReset} className="p-1 rounded hover:bg-gray-700">
                        <RotateCw size={20} />
                    </button>
                </Tooltip>
            </div>

            {/* Progress Bar }
            <div className="w-full sm:w-1/4 mt-2 sm:mt-0">
                <Slider value={progress} onChange={setProgress} min={0} max={100} className="w-full h-2" />
            </div>
        </footer>
    );
};

export default Footer;*/




