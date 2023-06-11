import { useState } from 'react'
import React from 'react';

function Utilisateur({utilisateurs, updateSelU}) {
    
    const selectedU = useState('');


      return (
      <div>
        <select name="cat" id="cat-select" onChange={(e) => updateSelU(e.target.value)} >
        <option value="">--Filtrer--</option>
        {utilisateurs.map((utilisateurs)=> ( <option key={utilisateurs} value={utilisateurs}>{utilisateurs}</option>))}
         
        </select>
       
      </div>
      )
  }
  
  export default Utilisateur