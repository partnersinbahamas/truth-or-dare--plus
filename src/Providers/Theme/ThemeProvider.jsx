import React, {useState ,useMemo} from "react";

export const ThemeContext = React.createContext({isLight: false, setIsLight: (value) => {}});

export const ThemeProvider = ({children}) =>  {
  const [isLight, setIsLight] = useState(false);
  const contextValues = useMemo(() => ({isLight, setIsLight}), [isLight]);

  return (
    <ThemeContext.Provider value={contextValues}>
      {children}
    </ThemeContext.Provider>
  )
}
