import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router";
import '../../App.css'

export default function LoginPage() {

  const history = useHistory();
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState({ value: "", hide: true, error: false });
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
      let res = await fetch("http://localhost:8000/login", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setMessage({ value: '', hide: true, error: false });
        localStorage.setItem('x-token', resJson.data);
        history.push("/profile")
      } else {
        console.log(resJson);
        setMessage({ value: resJson.message, hide: false, error: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    console.log(values);
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
      <h2>Sign in</h2>
      <form action="">
        {!message.hide ? (<div class={!message.error ? "alert alert-success" : "alert alert-danger"} role="alert">
          {message.value}
        </div>) : null}
        <p>
          <label>Email address</label><br />
          <input type="email" name="email" value={formValues.email} onChange={handleChange} placeholder="joe@email.com" required />
          <div className="validation-error">{formErrors.email}</div>
        </p>
        <p>
          <label>Password</label> <br />
          <input type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="password" required />
          <div className="validation-error">{formErrors.password}</div>
        </p>
        <p>
          <button id="sub_btn" type="submit" onClick={handleSubmit}>Login</button>
        </p>
      </form>
      <footer>
        <p>Not yet registered? <Link to="/register">Create an account</Link>.</p>
      </footer>
    </div>
  )
}