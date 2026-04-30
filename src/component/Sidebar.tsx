import logo from '../assets/invoice-logo.svg';
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Sidebar: React.FC = () => {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) return null;
    const { theme, toggleTheme } = themeContext;

    return (
        <aside className="fixed left-0 top-0 z-[1000] flex h-20 w-full items-center justify-between bg-[#373b53] md:h-screen md:w-[103px] md:flex-col md:rounded-r-[20px]">
            <div className="flex h-20 w-20 items-center justify-center rounded-r-[20px] bg-[#7c5dfa] md:h-[103px] md:w-[103px]">
                <img src={logo} alt="Invoice Logo" className="h-10 w-10" />
            </div>

            <div className="flex h-full items-center md:h-auto md:w-full md:flex-col">
                <button onClick={toggleTheme} className="flex h-20 w-20 items-center justify-center md:h-auto md:w-full md:pb-6">
                    {theme === 'light' ? (
                        <Moon size={24} color="#888eb0" />
                    ) : (
                        <Sun size={24} color="#888eb0" />
                    )}
                </button>

                <div className="h-full w-[1px] bg-[#494e6e] opacity-30 md:mb-6 md:h-[1px] md:w-full"></div>

                <div className="mx-6 h-10 w-10 overflow-hidden rounded-full md:mx-0 md:mb-6">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="rounded-full" />
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
