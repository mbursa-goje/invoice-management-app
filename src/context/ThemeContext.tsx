import React, { createContext, useState, useEffect, ReactNode } from 'react';

//This defines the TypeScript for the context
//This is TypeScript ensuring that any component consuming this context that it
//gets: a theme string that is strictly "light" or "dark", and toggleTheme function
interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

//Creates the actual contexts with undefined as the initial value before it mounts
//This creates a global "radio tower" thag connects our theme data to the rest of the app.
//export const ThemeContext this is a variable that holds the new contexts objects, other files in the app can use this.
//createContext() is a function built into react that creates the context object, it requires an initial default value to be passed into the parentheses
// <ThemeContextType | undefined> is pure TypeScript. The angle brackets <> are called Generics
//TypeSript wants to know the kind the context is going to hold.
//It will hold either an object matching the ThemeContextType interface(which has theme and toggleTheme), OR(|) undefined
//(undefined) is passed as the starting default value before the app fully boots up
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

//export const ThemeProvider: A new React component called ThemeProvider is being created and made available for other files to import
// React.FC<{ children: ReactNode }>: This is TypeScript. The variable is a functional React component
// FC<{ children: ReactNode }> this part tells TypeScript that the component must accept a prop called children, and those children can be any valid React element
// ({ children }) => { is an arrow function. The props object is received, and it is instantly destructured, to pluck out exactly the children variable so it can be used inside the component
// An arrow function is passed into useState as the initial value, this is known as lazy initialization
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        // by putting this as the initialization, const savedTheme = localStorage.getItem('invoice-theme');
        //     return (savedTheme === 'dark' || savedTheme === 'light')
        //         ? savedTheme : 'light';
        // }
        // We tell React to go into the localStorage and retrieve the theme saved in the localStorage, doing this is a very slow process
        // So it is ran only once on when the app loads
        // localStorage.getItem('invoice-theme'); the browser is being checked whether a th euser saved a theme preference the last time the website was visited
        // If the user has never entered the the site before the savedTheme variable will be empty
        const savedTheme = localStorage.getItem('invoice-theme');
        // This ensures the savedTheme is strictly either 'light' or 'dark'
        return (savedTheme === 'dark' || savedTheme === 'light')
            // If the savedTheme is set return it, if not return 'light'
            ? savedTheme : 'light';
    });

    // Whenever 'theme' state changes, update the DOM and localstorage
    // An effect is anything that reaches outisde of React to do something in the real world.
    //Examples of side effects include talking to a database, starting  a timer.
    //In the case of this project the effect manipulates the raw browser DOM and LocalStorage.
    //If this is not done, every time the user hits the "Refresh" button on the browser, the app would forget their prefrence and render the default light mode
    //But because it was saved, the useState initialization code from earlier can read it when the app boots back up
    useEffect(() => {
        //Save to localStorage so the user's preference is remembered on refresh
        //syntax -> setItem(key, value)
        localStorage.setItem('invoice-theme', theme);

        //Physically add or remove the 'data-theme' attribute on the HTML body
        //this if/else block switches the attribute of the body from light to dark when the toggle is clicked.
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }

        //the dependency array [theme] is the most crucial part of the useEffect.
        //It is an array of variables the React watches. It tells React to ignore the block of code before it completely, unless the theme variable changes
        //When the user clicks the toggle button, theme changes from 'light' to 'dark'. React notices this change, and the, and then executes the code inside the useEffect
    }, [theme]);

    //The funciton that will be called when the user clicks the moon/sun icon
    const toggleTheme = () => {
        // Passing it as a function instead of a variable, ensures React updates state immediately
        // It ensures React retuns the up to date state value which is the argument prevTheme
        // If prevTheme is 'light' return 'dark', if anything else('dark') return light
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
