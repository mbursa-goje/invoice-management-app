import React, { createContext, useState, useEffect, ReactNode } from 'react';

//This defines the TypeScript for our context
interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

//Creates the actual contexts with undefined as the initial value before it mounts
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem('invoice-theme');
        return (savedTheme === 'dark' || savedTheme === 'light')
            ? savedTheme : 'light';
    });

    // Whenever 'theme' state changes, update the DOM and localstorage
    useEffect(() => {
        //Save to localStorage so the user's preference is remembered on refresh
        localStorage.setItem('invoice-theme', theme);

        //Physically add or remove the 'data-theme' attribute on the HTML body
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }

    }, [theme]);

    //The funciton that will be called when the user clicks the moon/sun icon
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
