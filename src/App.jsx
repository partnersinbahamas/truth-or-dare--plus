import './App.scss';
import React from 'react';
import { LangProvider } from './Providers/Language/LangProvider';
import { ThemeProvider } from './Providers/Theme/ThemeProvider.jsx';
import AppWrapper from './Components/AppWrapper/AppWrapperIndex';

export const App = () => {
  return (
    <LangProvider value='en'>
      <ThemeProvider>
        <AppWrapper/>
      </ThemeProvider>
    </LangProvider>
  )
}

export default App;

