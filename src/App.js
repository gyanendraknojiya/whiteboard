import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import { Stage } from 'react-konva';

function App() {
  const [layers, setLayers] = useState([])
  return (
    <div >
      <Stage width={window.innerWidth} height={window.innerHeight}></Stage>
      <Header />
      <Toolbar />
    </div>
  );
}

export default App;
