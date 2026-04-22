import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'


//React injects the entire application into the index.html
//! is a TypeScript "non-null assertion". It tells the TypeScript that an ID of root exists in the HTML, so it should not throw an error thinking it might be null
createRoot(document.getElementById('root')!).render(
  // React.StrictMode is a special wrapper provided by React specifically for development purposes
  // It is completely invisible on the screen and gets automatically stripped out when the app is built for production, so it does not affect your live users at all.
  // Its main job is to act like a strict code inspector to help catch bugs early. It does two big things
  // 1. Double render: When the app is ran in development mode, <React.StrictMode> intentionally renders all of the components twice in a row.
  // It mounts the component, immediately unmounts it, and mounts it again
  //This is done to expose hidden bugs. If there is poorly written codes inside useEffect(for example, a code that mutates data when it shouldn't or a timer that was not cleaned up), rendering it twice makes that bug obvious so it can be immediately fixed before it gets to production
  // 2. Warning About Old Code: React is constantly evolving. If an older third-party library was installed or if the React methods that are outdated and are scheduled to be removed in future versions.
  // <StrictMode> will through warnings in the browser console, informing that the methods need to be updated.
  <React.StrictMode>
    {/* The umbrella context avoids prop drilling. React data flows downwards, from parent to child.
  If there was a Toggle Button sitting deep inside the sidebar, which is inside the Layout, which is inside our App
  If Context was not used, we would have to pass it down as a prop: <Layout theme={theme} /> -> <Sidebar theme={theme} /> -> <ToggleButton theme={theme} /> */}
    {/* This is called "Prop Drilling" and it gets extremely messy as the app grows */}
    {/* <App /> is wrapped inside the  <ThemeProvider< which is at the very top level of the application tree */}
    {/* The ThemeProvider acts like the giant umbrella covering the entire application */}
    {/* Now every single component can grab the theme and toggleTheme function instantly using a hook */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
