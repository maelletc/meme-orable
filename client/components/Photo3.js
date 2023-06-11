import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../styles/App.css';

function Photo3() {

const [photoList, setPhotoList] = useState([]);
const [likeCounts, setLikeCounts] = useState({});
const [isLike, setIsLike] = useState({});



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

localhost:3001

  return (
    <div>
      <p>lala</p>
      {photoList.map(photo => (
        <div key={photo._id}>
          <p>Likes: {likeCounts[photo._id]}</p>
          <p>Is Liked: {isLike[photo._id] ? 'true' : 'false'}</p>
          <p>Likes Count: {Object.keys(photo.likes).length}</p>
          {/* Affichez les autres informations de la photo selon vos besoins */}
        </div>
      ))}
    </div>
  );
  
  

}

export default Photo3;
