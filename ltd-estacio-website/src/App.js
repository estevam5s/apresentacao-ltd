import React from 'react';
import './App.css';
import SlideShow from './components/SlideShow';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <div className="App">
        <SlideShow />
      </div>
    </>
  );
}

export default App;