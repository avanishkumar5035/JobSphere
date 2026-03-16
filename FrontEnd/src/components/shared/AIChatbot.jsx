import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Hi there! I'm the JobSphere AI. How can I help you accelerate your career today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userText = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setInput('');
        setIsTyping(true);

        try {
            const { data } = await axios.post(`${API_BASE_URL}/api/ai/chat`, { message: userText });
            const aiText = data.reply;
            setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="mb-4 w-[350px] sm:w-[400px] h-[550px] bg-white dark:bg-gray-900 rounded-[32px] shadow-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between shadow-md relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-white dark:bg-gray-900/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 text-white shadow-inner">
                                    <Bot className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-black text-white text-lg tracking-tight">JobSphere AI</h3>
                                    <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest flex items-center gap-1">
                                        <Sparkles className="h-3 w-3" /> Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="h-8 w-8 bg-white dark:bg-gray-900/10 hover:bg-white dark:bg-gray-900/20 rounded-xl flex items-center justify-center text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-black/20">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-3xl shadow-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-br-sm' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-sm'}`}>
                                        <div className="flex items-center gap-2 mb-1.5 opacity-70">
                                            {msg.role === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                                            <span className="text-[9px] font-black uppercase tracking-wider">{msg.role === 'user' ? 'You' : 'AI Assistant'}</span>
                                        </div>
                                        <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-3xl rounded-bl-sm shadow-sm flex gap-1.5 items-center justify-center h-[60px] w-[80px]">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your question..."
                                    className="w-full bg-gray-50 dark:bg-gray-800 rounded-2xl pl-5 pr-14 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 border border-gray-100 dark:border-gray-700 focus:border-primary/30 transition-all shadow-inner text-gray-900 dark:text-white"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-primary hover:bg-primary-dark rounded-xl flex items-center justify-center text-white shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                                >
                                    <Send className="h-4 w-4 ml-0.5" />
                                </button>
                            </div>
                            <div className="text-center mt-3">
                                <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noreferrer" className="text-[9px] text-gray-400 font-bold tracking-widest uppercase hover:text-primary transition-colors">Powered by Google Gemini</a>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="h-16 w-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/30 premium-button border border-white/20 relative group overflow-hidden focus:outline-none"
                    style={{ zIndex: 60 }}
                >
                    <Bot className="h-7 w-7 relative z-10 group-hover:scale-110 transition-transform duration-300" />

                    {/* Notification Dot Pulse */}
                    <div className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 shadow-sm overflow-hidden flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    </div>
                </motion.button>
            )}
        </div>
    );
};

export default AIChatbot;
