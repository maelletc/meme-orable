import React, { useState } from "react";
import axios from "axios";
import '../styles/popup.css';

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmYxMTU0YjgzZDgwZTcwNTEyN2FlZiIsImlhdCI6MTY4NTAwMDU0OH0.UPkrasCsUM259ZGmsQ6xHqDv-iRJ6sffWb3fQi4RDbg';

const Popup = props => {
  const [textboxValue, setTextboxValue] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("picture", file);
    formData.append("userId", "6475faae93a9ea8ff1cec1cf");
    formData.append("timeEnd", Date.now() + 3 * 60000);
    formData.append("description", textboxValue);
    formData.append("picturePath", file.name);

    setSelectedFile(file);
  };

  const handleDescChange = (event) => {
    setTextboxValue(event.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const descInput = document.getElementById("desc-input");
    if (descInput) {
      setTextboxValue(descInput.value);
    }

    // Perform any necessary actions when the button is clicked
    const formData = new FormData();
    formData.append("picture", selectedFile);
    formData.append("userId", "6475faae93a9ea8ff1cec1cf");
    formData.append("timeEnd", Date.now() + 3 * 60000);
    formData.append("description", textboxValue);
    formData.append("picturePath", selectedFile.name);

    axios
      .post("http://localhost:3001/posts/", formData, {
        headers: {
          Autorization: `Bearer ${authToken}`
        },
      })
      .then((response) => {
        // handle the response
        console.log(response);
      })
      .catch((error) => {
        // handle errors
        console.log(error.response);
      });
  };

  return (
    <div className="popup-box">
      <div className="box">
        <button className="btn-close" onClick={props.handleClose}>x</button>
        {props.content}
        <input type="file" onChange={handleFileUpload} className='fileInput' />
        {selectedFile ? (
          <p>Selected file: {selectedFile.name}</p>
        ) : (
          <p>No file uploaded</p>
        )}
        <form>
          Description<br /><textarea type="text" name="description" className='desc' id="desc-input" onChange={handleDescChange}></textarea><br /><br />
          <button value='upload' className='btn' onClick={handleClick}>Poster</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;