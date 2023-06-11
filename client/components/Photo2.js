import axios from 'axios';
import React, { useState, useEffect } from 'react';
import coeurr from '../data/coeura.png';
import coeurn from '../data/coeurna.png';
import Utilisateur from './Utilisateur';
import '../styles/App.css';
import Popup from "./popup";

function Photo2() {
  const [photoList, setPhotoList] = useState([]);
  const [selecU, updateSelU] = useState('');
  const[likes2,setLikes2]=useState([])
  const [filteredPhotoList, setFilteredPhotoList] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [isLike, setIsLike] = useState({});
  const storedToken = localStorage.getItem('token');
  const [isOpen, setIsOPen] = useState(false);
  const togglePopup = () => {
      setIsOPen(!isOpen);
  }

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/posts/';
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmYxMTU0YjgzZDgwZTcwNTEyN2FlZiIsImlhdCI6MTY4NTAwMDU0OH0.UPkrasCsUM259ZGmsQ6xHqDv-iRJ6sffWb3fQi4RDbg';
  
    axios.get(apiUrl, {
      headers: {
        Autorization: `Bearer ${authToken}`
      }
    })
    .then(res => {
      const photoListData = res.data;
      setPhotoList(photoListData);
      setLikeCounts(photoListData.reduce((acc, photo) => {
        acc[photo._id] = Object.keys(photo.likes).length;        return acc;
      }, {}));

      setIsLike (
        photoListData.reduce((acc, photo) => {
          acc[photo._id] = false;
          return acc;
        }, {}));
      

    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }, []);
  
  

  useEffect(() => {
    const updatedList = photoList.map((photo) => {
      const timeEnd = photo;
      const timeValue = new Date(timeEnd);
      const currentDate = new Date();

      return {
        ...photo,
        afficher: timeValue > currentDate,
      };
    });

    const filteredList = updatedList.filter((photo) =>
      selecU ? photo.pseudo === selecU : true
    );

    setFilteredPhotoList(filteredList);
  }, [selecU, photoList]);

  const utilisateurs = photoList.reduce(
    (acc, elem) =>
      acc.includes(elem.pseudo) ? acc : acc.concat(elem.pseudo),
    []
  );

  function handleClick(_id, likes,userId) {
    if (isLike[_id] === false) {
      setLikeCounts((prevLikeCounts) => ({
        ...prevLikeCounts,
        [_id]: prevLikeCounts[_id] + 1,
      }));
      isLike[_id] = true;
      setLikes2([...likes2, _id]);

      
    } else {
      setLikeCounts((prevLikeCounts) => ({
        ...prevLikeCounts,
        [_id]: prevLikeCounts[_id] - 1,
      }));
      isLike[_id] = false;
      setLikes2(likes2.filter((id) => id !== _id));
    }
  
    const apiUrl = 'http://localhost:3001/posts/' + _id + '/like';
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmYxMTU0YjgzZDgwZTcwNTEyN2FlZiIsImlhdCI6MTY4NTAwMDU0OH0.UPkrasCsUM259ZGmsQ6xHqDv-iRJ6sffWb3fQi4RDbg';

    axios.patch(apiUrl, {userId}, {
      headers: {
        Autorization: `Bearer ${authToken}`,
        Body: { "userId": userId }
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
    
    
  }
  



  return (
    <div>
           <div className="App">

<button onClick={togglePopup}>Click to open popup</button>
{isOpen && <Popup 
handleClose={togglePopup}
content={<div>
    <h2>Title</h2>
    <p>This is sample content for my pop.</p>
</div>}
/>}
</div>
      {storedToken}
      <Utilisateur utilisateurs={utilisateurs} updateSelU={updateSelU} />
      <div className="container">
        <div className="content-wrapper">
          {filteredPhotoList.length > 0 ? (
            filteredPhotoList.map(({ _id, picturePath, pseudo, description ,likes,userId}, index) => (
              <div className="instagram-photo" key={picturePath}>
                <div className="username">{pseudo}</div>
                <img src={`http://localhost:3001/assets/${picturePath}`} className="App-logo" alt="logo" />
                <div className="Aime" onClick={() => handleClick(_id, likes,userId)}>
                  <img
                    src={likeCounts[_id] > 0 ? coeurr : coeurn}
                    alt="aime"
                  />
                  {Object.keys(likes)}

                 
                  <div className="like-count">{likeCounts[_id]}</div>
                  <div className="comm">{description}</div>
                  
                </div>
              </div>
            ))
          ) : (
            <p>lala</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Photo2;
