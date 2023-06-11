import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { pink } from "@material-ui/core/colors";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const OrangeCheckbox = withStyles({
  root: {
    color: pink[600],
    "&$checked": {
      color: pink[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);

const ColoredTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#f50057"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#f50057"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#f50057"
      }
    }
  }
})(TextField);

const SigninForm = (props) => {
  const navigate = useNavigate();

  // State
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Please fill in all form fields."
  );

  const submitForm = async (e) => {
    e.preventDefault();

    // Reset state
    setShowAlert(false);

    let isValid = false;

    // Form Validation
    if (email !== "" && password !== "" && pseudo !=="") {
      if (isEmail(email) && password.length >= 6) isValid = true;
      else if (!isEmail(email)) setErrorMessage("Invalid email address.");
      else if (password.length < 6)
        setErrorMessage("Password must be at least 6 symbols.");
      else setErrorMessage("Incorrect email or password.");
    } else {
      setErrorMessage("Please fill in all form fields");
    }

    // Save credentials in local storage
    // if(isChecked){
    //   localStorage.setItem('email', email);
    // }

    // Update state
    if (isValid) {
      try {
        const response = await axios.post("http://localhost:3001/auth/register", { pseudo,email, password });

        // Handle the response from the server
        if (response.status === 201) {
          // Login successful
          setIsFormValid(true);
          navigate('/page1'); // Naviguer vers la page 1
        } else {
          // Login failed
          setErrorMessage("Incorrect email or password.");
          setIsFormValid(false);
        }
      } catch (error) {
        // Handle any error that occurred during the request
        setErrorMessage("An error occurred during signin.");
        setIsFormValid(false);
      }
    } else {
      setIsFormValid(false);
    }

    setShowAlert(true);
  };

  // Change alert messages on invalid form
  let alert = (
    <Alert style={{ marginBottom: "15px" }} severity="error">
      {errorMessage}
    </Alert>
  );

  // Change alert messages on valid form
  if (isFormValid) {
    alert = (
      <Alert style={{ marginBottom: "15px" }} severity="success">
        Successfully logged in.
      </Alert>
    );
  }

  return (
    <div className="login-container">
      <form onSubmit={(e) => submitForm(e)} className="login-form">
        <h1 className="form-heading">Memorable</h1>

        {/* Alert */}
        {showAlert && alert}

        <div className="form-controls">
            <ColoredTextField
            className="form-field"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            id="email-field"
            label="Pseudo"
            variant="outlined"
            size="small"
          />
          <ColoredTextField
            className="form-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email-field"
            label="Email"
            variant="outlined"
            size="small"
          />
          <ColoredTextField
            className="form-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password-field"
            label="Password"
            variant="outlined"
            size="small"
          />
          <div className="checkbox">
            <FormControlLabel
              control={
                <OrangeCheckbox
                  checked={isChecked}
                  title="checkbox"
                  onChange={(e) => setIsChecked(e.target.checked)}
                  name="checkbox"
                  id="checkbox"
                />
              }
              label="Remember me "
            />
          </div>
        </div>

        <Button
          id="submit-button"
          type="submit"
          className="submit-button"
          variant="outlined"
          color="primary"
          fullWidth
          size="large"
        >
          Sign in
        </Button>

        
      </form>
    </div>
  );
};

const isEmail = (email) => {
  let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEmail.test(email)) {
    return false;
  } else {
    return true;
  }
};

export default SigninForm;
