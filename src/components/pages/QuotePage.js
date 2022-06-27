import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'


export default function QuotePage() {

    const initialValues = { gallons: "", address: " 47 W 13th St, New York, NY 10011 ", suggestedPrice: 50 };
    let [due, setDue] = useState('');
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
        if (Object.keys(formErrors).length !== 0) {
            return false;
        }
        setDue(formValues.gallons * formValues.suggestedPrice);
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
        if (!values.gallons) {
            errors.gallons = "Gallons is required!";
        }
        if (!values.delivery_date) {
            errors.delivery_date = "Date is required!";
        }
        return errors;
    };

    return (
        <div className="quote text-center m-5-auto">
            <h1>Get Quote</h1>
            <form action="">
                <p>
                    <label>Gallons Required</label><br />
                    <input type="number" name="gallons" onChange={handleChange} value={formValues.gallons} placeholder="5" required />
                </p>
                <p className="validation-error">{formErrors.gallons}</p>
                <p>
                    <label>Address</label> <br />
                    <input type="text" name="address" value={formValues.address}  />
                </p>
                <p>
                    <label>Delivery Date</label><br />
                    <input type="date" name="delivery_date" value={formValues.delivery_date} onChange={handleChange} required />
                </p>
                <p className="validation-error">{formErrors.delivery_date}</p>
                <p>
                    <label>Suggested Price</label><br />
                    <input type="text" name="price" value={formValues.suggestedPrice} />
                </p>
                <p>
                    <label>Total Amount Due</label><br />
                    <input disabled type="text" name="due" onChange={handleChange} value={due} />
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={handleSubmit}>Submit</button>
                </p>
            </form>

        </div>
    )
}