import logo from '../assets/invoice-logo.svg';
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Sidebar: React.FC = () => {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) return null;
    const { theme, toggleTheme } = themeContext;

    return (
        <aside style={styles.sidebar}>
            <div style={styles.logoContainer}>
                <img src={logo} alt="Invoice Logo" className='w-10 h-10' />
            </div>

            <div style={styles.bottomSection}>
                <button onClick={toggleTheme} style={styles.themeButton}>
                    {theme === 'light' ? (
                        <Moon size={24} color="#888eb0" />
                    ) : (
                        <Sun size={24} color="#888eb0" />
                    )}
                </button>

                <div className="w-full h-[1px] bg-[#494e6e] mb-6 opacity-30"></div>

                <div style={styles.avatar}>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="rounded-full" />
                </div>
            </div>
        </aside>
    );
}

const styles = {
    sidebar: {
        backgroundColor: '#373b53', 
        width: '103px',
        height: '100vh',
        position: 'fixed' as const,
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'space-between',
        borderRadius: '0 20px 20px 0',
        zIndex: 1000, 
    },
    logoContainer: {
        backgroundColor: '#7c5dfa',
        height: '103px',
        width: '103px',
        borderRadius: '0 20px 20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSection: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        paddingBottom: '24px',
        width: '100%',
    },
    themeButton: {
        marginBottom: '24px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        overflow: 'hidden',
    }
}

export default Sidebar;