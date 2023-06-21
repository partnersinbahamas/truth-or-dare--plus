import './App.scss';
import React from 'react';

// import {WelcomePage} from './Pages/WelcomePage/WelcomePage.tsx'
// import { SelectBar } from './Components/SelectBar/SelectBar.tsx';
import { LangProvider } from './Providers/Language/LangProvider';
// import { Tag } from './Components/Tag/Tag.tsx';
import { ThemeProvider } from './Providers/Theme/ThemeProvider.jsx';
import AppWrapper from './Components/AppWrapper/AppWrapperIndex';

export const App = () => {


  return (
    <LangProvider>
      <ThemeProvider>
        <AppWrapper/>
      </ThemeProvider>
    </LangProvider>
  )
}

export default App;

