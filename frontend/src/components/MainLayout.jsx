import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import CircularMenuExample from "./CircularMenuExample";

const MainLayout = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="relative min-h-screen">
            {/* 🔹 Header (Always Visible) */}
            <header className="w-full flex justify-between items-center px-4 sm:px-6 lg:px-10 py-4 shadow-md fixed top-0 left-0 z-50">
                <Logo />
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <Profile />
            </header>

            {/* Spacing to Avoid Content Overlapping Fixed Header */}
            <div className="pt-20 sm:pt-24"></div>

            {/* 🔹 Dynamic Page Content with searchQuery passed as prop */}
            <main className="flex justify-center items-center px-4 py-6">
                <Outlet context={{ searchQuery }} />
            </main>

            {/* 🔹 Floating Circular Menu (Bottom-Right) */}
            <footer className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
                <CircularMenuExample />
            </footer>
        </div>
    );
};

export default MainLayout;
