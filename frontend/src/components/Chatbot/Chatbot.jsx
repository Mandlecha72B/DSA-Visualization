
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Bot, User, Download, Moon, Sun, Send } from "lucide-react";
import { motion } from "framer-motion";
import Toggle from "react-toggle";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "react-toggle/style.css";

export default function ChatApp() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [typingText, setTypingText] = useState("");
    const chatRef = useRef(null);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);
        setTypingText("");

        try {
            const res = await axios.post("http://127.0.0.1:5000/ask", {
                message: input,
            });

            const botText = res.data.reply;
            let currentText = "";

            for (let i = 0; i < botText.length; i++) {
                await new Promise((resolve) => setTimeout(resolve, 10));
                currentText += botText[i];
                setTypingText(currentText);
            }

            setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "❌ Something went wrong!" },
            ]);
        } finally {
            setTypingText("");
            setLoading(false);
        }
    };

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typingText]);

    const downloadChat = () => {
        const text = messages
            .map((msg) => `${msg.sender === "user" ? "You" : "Bot"}: ${msg.text}`)
            .join("\n\n");
        const blob = new Blob([text], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "chat_history.txt";
        a.click();
    };

    const themeClass = darkMode
        ? "bg-gray-900 text-gray-100"
        : "bg-gradient-to-br from-sky-100 to-indigo-200 text-gray-900";

    return (
        <div className={`min-h-80 p-4 flex flex-col items-center ${themeClass}`}>
            {/* Header */}
            <motion.header
                className={`w-full max-w-5xl mb-6 px-6 py-4 rounded-xl shadow-md transition-all 
    flex flex-wrap justify-between items-center gap-4 
    ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                {/* Left: Icon & Title */}
                <div className="flex items-center gap-3">
                    <Bot size={32} className="text-indigo-600" />
                    <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">DSA Chatbot</h1>
                </div>

                {/* Right: Theme Toggle + Download Button */}
                <div className="flex items-center gap-6">
                    {/* Toggle */}
                    <div className="flex items-center gap-2">
                        <Sun
                            size={18}
                            className={`transition-colors ${darkMode ? "text-gray-400" : "text-yellow-500"}`}
                        />
                        <Toggle
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                            icons={false}
                            aria-label="Toggle dark mode"
                        />
                        <Moon
                            size={18}
                            className={`transition-colors ${darkMode ? "text-yellow-400" : "text-gray-400"}`}
                        />
                    </div>

                    {/* Download Button */}
                    <button
                        onClick={downloadChat}
                        className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
        bg-indigo-100 hover:bg-indigo-200 text-indigo-800
        dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:text-white"
                    >
                        <Download size={16} />
                        Download Chat
                    </button>
                </div>
            </motion.header>



            {/* Chat Container */}
            <motion.div
                className={`w-full max-w-3xl rounded-2xl p-6 flex flex-col space-y-4 shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Messages */}
                <div className="overflow-y-auto max-h-[65vh] space-y-4">
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            initial={{ opacity: 0, x: msg.sender === "user" ? 40 : -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div
                                className={`chat-bubble px-4 py-3 rounded-lg max-w-[75%] leading-relaxed whitespace-pre-wrap ${msg.sender === "user"
                                    ? "bg-indigo-500 text-white"
                                    : darkMode
                                        ? "bg-gray-700 text-gray-100"
                                        : "bg-gray-100 text-gray-900"
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    {msg.sender === "user" ? <User size={18} /> : <Bot size={18} />}
                                    <span className="font-semibold text-sm">
                                        {msg.sender === "user" ? "You" : "DSA Bot"}
                                    </span>
                                </div>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeHighlight]}
                                >
                                    {msg.text}
                                </ReactMarkdown>

                            </div>
                        </motion.div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <motion.div
                                className="chat-bubble bg-gray-100 text-gray-800 px-4 py-3 rounded-lg max-w-[75%] leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <Bot size={18} />
                                    <span className="font-semibold">DSA Bot</span>
                                </div>
                                <div className="animate-pulse text-sm text-gray-500">Thinking...</div>
                            </motion.div>
                        </div>
                    )}

                    {/* Typing Animation */}
                    {typingText && (
                        <div className="flex justify-start">
                            <div
                                className={`chat-bubble px-4 py-3 rounded-lg max-w-[75%] ${darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <Bot size={18} />
                                    <span className="font-semibold text-sm">DSA Bot</span>
                                </div>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeHighlight]}>
                                    {typingText}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )}


                    <div ref={chatRef} />
                </div>

                {/* Input */}
                <div className="flex items-center gap-2 mt-4">
                    <input
                        className={`w-full px-4 py-2 rounded-md border outline-none transition-all duration-200 
        ${darkMode
                                ? "bg-gray-900 text-white placeholder-gray-400 border-gray-700 focus:border-indigo-400"
                                : "bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:border-indigo-600"
                            }`}
                        placeholder="Ask anything about DSA..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button className="btn btn-primary flex items-center gap-2" onClick={sendMessage}>
                        <Send size={16} />
                        Send
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
