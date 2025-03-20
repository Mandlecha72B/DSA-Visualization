
import { MessageSquare } from "lucide-react";
import { Moon, Sun } from "lucide-react";

const Navbar = ({ theme, setToggleTheme }) => {
    
    
    return (
        <header data-theme={theme === "dark" ? "" : "light"} className="bg-base-100 border-b border-base-300 z-40 backdrop-blur-lg bg-base-100/80 w-full max-w-6xl mx-auto rounded-lg">
            <div className="px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                        <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-primary" />
                        </div>
                        <h1 className="text-lg font-bold">Chatty</h1>
                    </div>
                </div>

                {/* Theme Toggle Button */}
                <button onClick={() => setToggleTheme(theme === "light" ? "dark" : "light")} className="btn btn-sm btn-circle">
                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
        </header>
    );
};
export default Navbar;

/*return (
        <header
            className="bg-base-100 border-b border-base-300  z-40 
    backdrop-blur-lg bg-base-100/80"
        >
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-lg font-bold">Chatty</h1>
                        </div>
                    </div>

                    
                </div>
            </div>
        </header>
    );*/