import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import p from '../data/plus.png'
import '../styles/App.css';

function handleClick() {
  console.log('Clic sur l\'image');
}

function Plus() {
  return (
    <img className="plus" src={p} onClick={handleClick} />
  );
}

export default Plus;


//http://www.cril.univ-artois.fr/~boussemart/express/chapter02.html