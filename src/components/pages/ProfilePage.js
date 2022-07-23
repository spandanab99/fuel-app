import React, { useState, useEffect } from 'react';

import '../../App.css';

export default function ProfilePage() {
    const initialValues = { fullName: "", address1: "", address2: "", city: "", state: "TX", zipcode: null };
    const [formValues, setFormValues] = useState({ ...initialValues });
    const [message, setMessage] = useState({ value: "", hide: true, error: false });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isProfile, setIsProfile] = useState(false);

    const getData = async () => {
        try {
            let res = await fetch('http://localhost:8000/profile', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-token': localStorage.getItem('x-token')
                },
            })
            let resJson = await res.json();
            let data = resJson.data;

            if (data != null){
                setIsProfile(true);
            }
            
            if (Object.getOwnPropertyNames(data).length !== 0) {
                setFormValues({ ...data }); 
               
            }
            
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        try {
            let method = "POST"
            if (isProfile){
                method = "PATCH"
            }
            let res = await fetch("http://localhost:8000/profile", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-token': localStorage.getItem('x-token')
                },
                method: method,
                body: JSON.stringify({
                    fullName: formValues.fullName,
                    address1: formValues.address1,
                    address2: formValues.address2,
                    city: formValues.city,
                    state: formValues.state,
                    zipcode: formValues.zipcode,

                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setMessage({ value: "Profile Updated Successfully!", hide: false, error: false });
                setFormValues({ ...resJson.data })
            } else {
                setMessage({ value: resJson.message, hide: false, error: true });
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(()=>{
        getData();
    },[])

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;;
        if (!values.fullName) {
            errors.fullName = "Full Name is required!";
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
        else if (regex.test(values.zipcode) === false) {
            errors.zipcode = "Invalid zipcode!";

        }

        return errors;
    };

    return (
        <div className="profile text-center m-5-auto">
            <div className="col-12">
                <h2>Edit Profile</h2>
                <form action="">
                    {!message.hide ? (<div class={!message.error ? "alert alert-success" : "alert alert-danger"} role="alert">
                        {message.value}
                    </div>) : null}
                    <p>
                        <label>Full name</label><br />
                        <input type="text" name="fullName" value={formValues.fullName} onChange={handleChange} placeholder="John Doe" maxLength={50} required />
                        <div className="validation-error">{formErrors.fullName}</div>
                    </p>
                    <p>
                        <label>Address 1</label><br />
                        <input type="text" name="address1" value={formValues.address1} onChange={handleChange} placeholder="" maxLength={100} required />
                        <div className="validation-error">{formErrors.address1}</div>
                    </p>
                    <p>
                        <label>Address 2</label><br />
                        <input type="text" name="address2" value={formValues.address2} onChange={handleChange} placeholder="" maxLength={100} required />

                    </p>
                    <p>
                        <label>City</label><br />
                        <input type="text" name="city" value={formValues.city} onChange={handleChange} placeholder="" maxLength={100} required />
                        <div className="validation-error">{formErrors.city}</div>
                    </p>
                    <p>
                        <label>State</label><br />
                        <select name="state" onChange={handleChange} value={formValues.state}>

                            <option>AL</option>
                            <option>AK</option>
                            <option>AZ</option>
                            <option>AR</option>
                            <option>CA</option>
                            <option>CO</option>
                            <option>CT</option>
                            <option>DE</option>
                            <option>FL</option>
                            <option>GA</option>
                            <option>HL</option>
                            <option>ID</option>
                            <option>IL</option>
                            <option>IN</option>
                            <option>IA</option>
                            <option>KS</option>
                            <option>KY</option>
                            <option>LA</option>
                            <option>ME</option>
                            <option>MD</option>
                            <option>MA</option>
                            <option>MI</option>
                            <option>MN</option>
                            <option>MO</option>
                            <option>MS</option>
                            <option>MT</option>
                            <option>NE</option>
                            <option>NV</option>
                            <option>NH</option>
                            <option>NJ</option>
                            <option>NM</option>
                            <option>NY</option>
                            <option>NC</option>
                            <option>ND</option>
                            <option>OH</option>
                            <option>OK</option>
                            <option>OR</option>
                            <option>PA</option>
                            <option>RI</option>
                            <option>SC</option>
                            <option>SD</option>
                            <option>TN</option>
                            <option>TX</option>
                            <option>UT</option>
                            <option>VT</option>
                            <option>VA</option>
                            <option>WA</option>
                            <option>WV</option>
                            <option>WI</option>
                            <option>WY</option>
                        </select>
                    </p>
                    <p>
                        <label>Zipcode</label><br />
                        <input type="text" name="zipcode" value={formValues.zipcode} onChange={handleChange} pattern="[0-9]{5}" title="Five digit zip code" required />
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
