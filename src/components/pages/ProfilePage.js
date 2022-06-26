import React, { useState, useEffect } from 'react';

import '../../App.css';

export default function ProfilePage() {

    const initialValues = {fullname: "", address1:"",address2:"",city:"",state:"TX",zipcode:null };
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
        const errors = {};
        const regex = /^[0-9]{5}$/;
        if (!values.fullname) {
          errors.fullname = "Full Name is required!";
        }
        if (!values.address1) {
            errors.address1 = "Address is required!";
        }
        if (!values.city) {
            errors.city = "City is required!";
        }
        if (!values.state) {
            errors.state = "state is required!";
        }
        if (!values.zipcode) {
            errors.zipcode = "zipcode is required!";
        }
        else if(regex.test(values.zipcode)===false){
            errors.zipcode = "Invalid zipcode!";

        }
          
        return errors;
      };

    return (
        <div className="profile text-center m-5-auto"> 
            <div className="col-12">
            <h2>Edit Profile</h2>
            <form action="">
                <p>
                    <label>Full name</label><br/>
                    <input type="text" name="fullname" value={formValues.fullname} onChange={handleChange} placeholder="John Doe" maxLength={50} required />
                    <div className="validation-error">{formErrors.fullname}</div>
                </p>
                <p>
                    <label>Address 1</label><br/>
                    <input type="text" name="address1" value={formValues.address1} onChange={handleChange} placeholder=""  maxLength={100} required />
                    <div className="validation-error">{formErrors.address1}</div>
                </p>
                <p>
                    <label>Address 2</label><br/>
                    <input type="text" name="address2" value={formValues.address2} onChange={handleChange} placeholder=""  maxLength={100} required />

                </p>
                <p>
                    <label>City</label><br/>
                    <input type="text" name="city" value={formValues.city} onChange={handleChange} placeholder=""  maxLength={100} required />
                    <div className="validation-error">{formErrors.city}</div>
                </p>
                <p>
                    <label>State</label><br/>
                    <select name="state" onChange={handleChange} value={formValues.state}>
                        <option>TX</option>
                        <option>US</option>
                    </select>
                </p>
                <p>
                    <label>Zipcode</label><br/>
                    <input type="text" name="zipcode" value={formValues.zipcode} onChange={handleChange} pattern="[0-9]{5}" title="Five digit zip code" required/>
                    <div className="validation-error">{formErrors.zipcode}</div>
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={handleSubmit}>Submit</button>
                </p>
            </form>
            </div>
            <div>
                
            </div>

            
        </div>

        
    )
}
