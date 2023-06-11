import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import p from '../data/plus.png'
import '../styles/App.css';

    const [a, setA] = useState('lala');
  
    function handleClick() {
      setA('lo');
    }

function Plus2() {
  return (
    <div>
         <img className="plus" src={p} onClick={handleClick} />
    <p>{a}</p>
    </div>
   
  );
}

export default Plus2;
