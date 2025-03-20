
import React, { useState, useEffect } from "react";
import {
    BotMessageSquare,
    MessageCircleMore,
    Trophy,
    BarChart2,
    BookOpen,
    SquareTerminal,
} from "lucide-react";
import {
    CircleMenu,
    CircleMenuItem,
    TooltipPlacement,
} from "react-circular-menu";

export default function CircularMenuExample({ iconSizeOverride, itemSizeOverride, radiusOverride }) {
    const [iconSize, setIconSize] = useState(iconSizeOverride ?? 20);
    const [itemSize, setItemSize] = useState(itemSizeOverride ?? 2);
    const [radius, setRadius] = useState(radiusOverride ?? 3);
    const [bottomSpacing, setBottomSpacing] = useState("bottom-[calc(4rem+5vh)]"); // Dynamic spacing

    useEffect(() => {
        const updateResponsiveSettings = () => {
            if (window.innerWidth < 640) {  // Small screens
                setItemSize(itemSizeOverride ?? 1);
                setRadius(radiusOverride ?? 2);
                setIconSize(iconSizeOverride ?? 16);
                setBottomSpacing("bottom-[calc(3rem+7vh)]"); // More spacing for mobile
            } else if (window.innerWidth < 1024) {  // Medium screens
                setItemSize(itemSizeOverride ?? 2);
                setRadius(radiusOverride ?? 3);
                setIconSize(iconSizeOverride ?? 20);
                setBottomSpacing("bottom-[calc(3rem+4vh)]");
            } else {  // Large screens
                setItemSize(itemSizeOverride ?? 2);
                setRadius(radiusOverride ?? 3);
                setIconSize(iconSizeOverride ?? 20);
                setBottomSpacing("bottom-[calc(3rem+5vh)]");
            }
        };

        updateResponsiveSettings(); // Run initially
        window.addEventListener("resize", updateResponsiveSettings);

        return () => window.removeEventListener("resize", updateResponsiveSettings);
    }, [itemSizeOverride, radiusOverride, iconSizeOverride]);

    return (
        <div className={`fixed ${bottomSpacing} right-6 flex flex-col items-center md:right-10 lg:right-12 z-40`}>
            <CircleMenu
                startAngle={-90}
                rotationAngle={360}
                itemSize={itemSize}
                radius={radius}
                rotationAngleInclusive={false}
            >
                <CircleMenuItem tooltip="Chatbot" tooltipPlacement={TooltipPlacement.Left}>
                    <div className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600">
                        <BotMessageSquare size={iconSize} />
                    </div>
                </CircleMenuItem>
                <CircleMenuItem tooltip="Discussion-Forum" tooltipPlacement={TooltipPlacement.Left} onClick={() => window.open("/discussion-forum", "_blank")}>
                    <div className="p-2 bg-green-500 rounded-full text-white hover:bg-green-600">
                        <MessageCircleMore size={iconSize} />
                    </div>
                </CircleMenuItem>
                <CircleMenuItem tooltip="Leaderboard" tooltipPlacement={TooltipPlacement.Left}>
                    <div className="p-2 bg-orange-500 rounded-full text-white hover:bg-orange-600">
                        <Trophy size={iconSize} />
                    </div>
                </CircleMenuItem>
                <CircleMenuItem tooltip="Algorithm Comparison" tooltipPlacement={TooltipPlacement.Left}>
                    <div className="p-2 bg-purple-500 rounded-full text-white hover:bg-purple-600">
                        <BarChart2 size={iconSize} />
                    </div>
                </CircleMenuItem>
                <CircleMenuItem
                    tooltip="Notes"
                    tooltipPlacement={TooltipPlacement.Left}
                    onClick={() => window.open("/notes", "_blank")}  // Opens NotesPage in a new tab
                >
                    <div className="p-2 bg-indigo-500 rounded-full text-white hover:bg-indigo-600">
                        <BookOpen size={iconSize} />
                    </div>
                </CircleMenuItem>

                <CircleMenuItem tooltip="Coding" tooltipPlacement={TooltipPlacement.Left}>
                    <div className="p-2 bg-gray-500 rounded-full text-white hover:bg-gray-600">
                        <SquareTerminal size={iconSize} />
                    </div>
                </CircleMenuItem>
            </CircleMenu>
        </div>
    );
}







/*import React, { useState } from "react";
import { BotMessageSquare, MessageCircleMore, Trophy, BarChart2, BookOpen, SquareTerminal, ChevronUp, ChevronDown } from "lucide-react";
import { CircleMenu, CircleMenuItem, TooltipPlacement } from "react-circular-menu";

export default function CircularMenuCarousel() {
    const [startIndex, setStartIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(true); // Keep menu always open

    const menuItems = [
        { icon: <BotMessageSquare size={iconSize} />, tooltip: "Chatbot", bg: "bg-blue-500" },
        { icon: <MessageCircleMore size={iconSize} />, tooltip: "Discussion-Forum", bg: "bg-green-500" },
        { icon: <Trophy size={iconSize} />, tooltip: "Leaderboard", bg: "bg-orange-500" },
        { icon: <BarChart2 size={iconSize} />, tooltip: "Algorithm Comparison", bg: "bg-purple-500" },
        { icon: <BookOpen size={iconSize} />, tooltip: "Notes", bg: "bg-indigo-500" },
        { icon: <SquareTerminal size={iconSize} />, tooltip: "Coding", bg: "bg-gray-500" }
    ];

    const visibleItemsCount = 4; // Number of items to display at a time

    // Function to shift menu items (next)
    const nextItem = (e) => {
        e.stopPropagation();
        setStartIndex((prevIndex) => (prevIndex + visibleItemsCount) % menuItems.length);
        setIsMenuOpen(true); // Keep menu open
    };

    // Function to shift menu items (prev)
    const prevItem = (e) => {
        e.stopPropagation();
        setStartIndex((prevIndex) => (prevIndex - visibleItemsCount + menuItems.length) % menuItems.length);
        setIsMenuOpen(true); // Keep menu open
    };

    // Get the items to display based on startIndex
    const visibleItems = [...menuItems, ...menuItems].slice(startIndex, startIndex + visibleItemsCount);

    return (
        <div className="fixed bottom-10 right-6 flex flex-col items-center">
            {/* Up Button for Sliding }
            <button onClick={prevItem} className="mb-2 p-2 bg-gray-700 rounded-full text-white hover:bg-gray-800">
                <ChevronUp size={iconSize} />
            </button>

            {/* Circular Menu (Fixed) }
            <CircleMenu
                open={isMenuOpen}
                onMenuToggle={() => setIsMenuOpen(true)} // Prevent closing
                startAngle={-90}
                rotationAngle={-180} // Pass it only here
                itemSize={2}
                radius={5}
                rotationAngleInclusive={false}
            >
                {visibleItems.map((item, index) => (
                    <CircleMenuItem key={index} tooltip={item.tooltip} tooltipPlacement={TooltipPlacement.Left}>
                        <div className={`p-2 ${item.bg} rounded-full text-white hover:opacity-80`}>
                            {item.icon}
                        </div>
                    </CircleMenuItem>
                ))}
            </CircleMenu>

            {/* Down Button for Sliding }
            <button onClick={nextItem} className="mt-2 p-2 bg-gray-700 rounded-full text-white hover:bg-gray-800">
                <ChevronDown size={iconSize} />
            </button>
        </div>
    );
}*/

