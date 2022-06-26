import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../App.css'

export default function SignUpPage() {
    const initialValues = {email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormErrors(validate(formValues));
        setFormValues({ ...formValues, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
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
        const regex =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!values.email) {
          errors.email = "Email is required!";
        }
        else if(regex.test(values.email) === false){
            errors.email = "Invalid Email!";
        }
        if (!values.password) {
            errors.password = "Password is required!";
        }
        else if(values.password.length<=6 ||  values.password.length>16){
            errors.password = "Password length must be 6 to 16 characters!";
            

        }
       
        return errors;
      };

    return (
        <div className="text-center m-5-auto">
            <h2>Register an account</h2>
            <form action="">
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" value = {formValues.email} onChange={handleChange} placeholder="joe@email.com" required />
                    <div className="validation-error">{formErrors.email}</div>
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" value = {formValues.password} onChange={handleChange} placeholder="password" required />
                    <div className="validation-error">{formErrors.password}</div>
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p>Already have an account? <Link to="/login">Login</Link>.</p>
            </footer>
        </div>
    )

}