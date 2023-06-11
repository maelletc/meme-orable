import React, { useState, useEffect } from 'react';
import logo from '../data/logo.svg';
import coeurr from '../data/coeura.png';
import coeurn from '../data/coeurna.png';
import plus from '../data/plus.png';
import Utilisateur from './Utilisateur';
import Plus from './Plus';
import '../styles/App.css';
import { photoList } from '../data/photoList';

function Photo() {
  
  const [selecU, updateSelU] = useState('');
  const [filteredPhotoList, setFilteredPhotoList] = useState([]);
  const [likeCounts, setLikeCounts] = useState(
    photoList.reduce((acc, photo) => {
      acc[photo.id] = 0;
      return acc;
    }, {})
  );
    useEffect(() => {
    const storedLikeCounts = localStorage.getItem('likeCounts');
    if (storedLikeCounts) {
      setLikeCounts(JSON.parse(storedLikeCounts));
    } else {
      const initialLikeCounts = photoList.map(() => 0);
      setLikeCounts(initialLikeCounts);
      localStorage.setItem('likeCounts', JSON.stringify(initialLikeCounts));
    }
  }, []);

  useEffect(() => {
    const updatedList = photoList.map((photo) => {
      const { time, spend } = photo;
      const spendValue = parseInt(spend);
      const timeValue = new Date(time);

      if (spend.endsWith('m')) {
        timeValue.setMinutes(timeValue.getMinutes() + spendValue);
      } else if (spend.endsWith('s')) {
        timeValue.setSeconds(timeValue.getSeconds() + spendValue);
      } else {
        console.log('Format spend non valide.');
      }

      const currentDate = new Date();

      return {
        ...photo,
        afficher: timeValue > currentDate,
      };
    });

    const filteredList = updatedList.filter((photo) =>
    selecU ? photo.utilisateur === selecU : true
  );

  setFilteredPhotoList(filteredList);
}, [selecU, photoList]);

function handleClick(id) {
  const updatedLikeCounts = { ...likeCounts };
  updatedLikeCounts[id] = updatedLikeCounts[id] === 0 ? 1 : 0;
  setLikeCounts(updatedLikeCounts);
  localStorage.setItem('likeCounts', JSON.stringify(updatedLikeCounts));
 
}

  const utilisateurs = photoList.reduce(
    (acc, elem) =>
      acc.includes(elem.utilisateur) ? acc : acc.concat(elem.utilisateur),
    []
  );

  return (
    <div>
      <Plus/>
      <Utilisateur utilisateurs={utilisateurs} updateSelU={updateSelU} />
      <div className="container">
        <div className="content-wrapper">
          {filteredPhotoList.map(({ id,lien, utilisateur,description, afficher }, index) => {
            if (afficher) {
              return (
                <div className="instagram-photo" key={lien}>
                  <div className="username">{utilisateur}</div>
                  <img src={lien} className="App-logo" alt="logo" />
                  <div className="Aime" onClick={() => handleClick(id)}>
                    <img
                      src={likeCounts[id] > 0 ? coeurr : coeurn}
                      alt="aime"
                    />
                    <div className="like-count">{likeCounts[id]}</div>
                    <div className="comm">{description}</div> 
                  </div>
                </div>
              );
            } else {
              return <p>lala</p>;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Photo;
