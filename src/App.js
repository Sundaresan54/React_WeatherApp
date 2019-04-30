import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from './components/Weather'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faMapMarkerAlt)

function App() {
  return (
    <div className="App" style = {{backgroundColor:"#D3D3D3",height:"auto"}}>
      <Weather />
     
    </div>
  );
}

export default App;
