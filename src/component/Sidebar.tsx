// This is a React hook that allows the use of the context in set in the main.tsx
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// The code below is to import the a Moon and Sun icon from lucide-react library
// lucide-react is a clean icon library
import { Moon, Sun } from "lucide-react";

const Sidebar: React.FC = () => {
    // The code below is the use of the ThemeContext
    // The Sidebar component uses ThemeContext in the the highest parent component, through the aid of the useContext() react hook
    const themeContext = useContext(ThemeContext);

    // The code below is a safety check if the context is not wrapped properly or undefined
    if (!themeContext) return null;

    // Destructure the value of the context
    // This cracks open the context object and extracts the exact string('light' or 'dark')
    const { theme, toggleTheme } = themeContext;

    return (
        // JavaScript object is used to style the component instead of using raw CSS
        // The HTML elements is mapped to a specific styles inside the styles object
        <aside style={styles.sidebar}>
            {/* App Logo Placeholder */}
            <div style={styles.logoContainer}>
                <div style={styles.logo}></div>
            </div>

            {/* Bottom section (Theme Toggle and Avatar) */}
            <div style={styles.bottomSection}>
                {/* The Button calls toggleTheme() when clicked
                It asks: Is the theme 'light'? If yes, show the Moon icon. If no show the Sun icon */}

                <button onClick={toggleTheme} style={styles.themeButton}>
                    {theme === 'light' ? (
                        <Moon size={24} color="#888eb0" />
                    ) : (
                        <Sun size={24} color="#888eb0" />
                    )}
                </button>

                <div style={styles.avatar}></div>
            </div>
        </aside>
    );
}

const styles = {
    sidebar: {
        backgroundColor: 'var(--bg-sidebar)',
        width: '100px',
        height: '100vh',
        // as const stands for constant assertion
        // This ensures the value passed to assertion is 'fixed' and not just a generic string  
        position: 'fixed' as const,
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'space-between',
        borderRadius: '0 20px 20px 0',
        zIndex: 50,
    },

    logoContainer: {
        backgroundColor: 'var(--primary)',
        height: '100px',
        width: '100%',
        borderRadius: '0 20px 20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: '40px',
        height: '40px',
        backgroundColor: 'white',
        borderRadius: '50%',
    },
    bottomSection: {
        display: 'flex',
        // As const is used 
        flexDirection: 'column' as const,
        alignItems: 'center',
        paddingBottom: '24px',
    },
    themeButton: {
        marginBottom: '24px',
        transition: 'transform 0.2s',
    },
    divider: {
        width: '100%',
        height: '1px',
        backgroundColor: '#494e6e',
        marginBottom: '24px',
    },
    avatar: {
        width: '40px',
        height: '40px',
        backgroundColor: '#dfe3fa',
        borderRadius: '50%',
    }
}

export default Sidebar;