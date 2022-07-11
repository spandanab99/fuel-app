import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../App.css'

export default function SignUpPage() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [message, setMessage] = useState({value:"",hide:true,error:false});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    try {
      let res = await fetch("http://localhost:8000/register", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setMessage({value:resJson.data,hide:false,error:false});
      } else {
        setMessage({value:resJson.message,hide:false,error:true});
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    }
    else if (regex.test(values.email) === false) {
      errors.email = "Invalid Email!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    else if (values.password.length <= 6 || values.password.length > 16) {
      errors.password = "Password length must be 6 to 16 characters!";


    }

    return errors;
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Register an account</h2>
      <form action="">
        {!message.hide? (<div class={!message.error?"alert alert-success":"alert alert-danger"} role="alert">
          {message.value}
        </div>) : null}
        <p>
          <label>Email address</label><br />
          <input type="email" name="email" value={formValues.email} onChange={handleChange} placeholder="joe@email.com" required />
          <div className="validation-error">{formErrors.email}</div>
        </p>
        <p>
          <label>Password</label><br />
          <input type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="password" required />
          <div className="validation-error">{formErrors.password}</div>
        </p>
        <p>
          <button id="sub_btn" type="submit" onClick={handleSubmit}>Register</button>
        </p>
      </form>
      <footer>
        <p>Already have an account? <Link to="/login">Login</Link>.</p>
      </footer>
    </div>
  )

}