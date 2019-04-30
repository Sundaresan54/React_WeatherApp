import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from './components/Weather'

function App() {
  return (
    <div className="App" style = {{backgroundColor:"#D3D3D3",height:"auto"}}>
      <Weather />
     
    </div>
  );
}

export default App;
