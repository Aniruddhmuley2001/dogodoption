import { createContext } from "react";

// The hook has a state and an updater
const ThemeContext = createContext(["green", () => {}])

export default ThemeContext;