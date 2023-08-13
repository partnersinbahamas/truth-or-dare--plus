import React, { useState, useMemo } from "react"

export const LangContext = React.createContext({
    lang: 'en',
    setLang: (value) => {},
});

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const contextValues = useMemo(() => ({ lang, setLang }), [lang]);

  return (
    <LangContext.Provider value={contextValues}>
      {children}
    </LangContext.Provider>
  )
}
