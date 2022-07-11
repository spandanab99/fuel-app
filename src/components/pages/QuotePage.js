import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'


export default function QuotePage() {

    const initialValues = { requestedGallons: 0, address: " 47 W 13th St, New York, NY 10011 ", suggestedPrice: 10, due: null };
    const [due, setDue] = useState(0);
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const getData = async () => {
        try {
            let res = await fetch('http://localhost:8000/quote', {

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-token': localStorage.getItem('x-token')
                },
                method: "POST",
                body: JSON.stringify({
                    requestedGallons: formValues.requestedGallons,
                    deliveryDate: null,
                }),
            })
            let resJson = await res.json();
            let data = resJson.data;
            console.log(data);
            if (Object.getOwnPropertyNames(data).length !== 0) {
                setFormValues({ ...data });
                setDue(data.due);

            }

        }
        catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("requestedGallons is set to ", formValues.requestedGallons);
        setFormValues({ ...formValues, [name]: value });
        setDue(formValues.requestedGallons * formValues.suggestedPrice);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        if (Object.keys(formErrors).length !== 0) {
            return false;
        }
        setIsSubmit(true);
    };

    useEffect(() => {
        getData();
    }, [])
    useEffect(() => {

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // console.log(formValues);
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        if (!values.requestedGallons) {
            errors.requestedGallons = "Gallons is required!";
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
                    <input type="number" name="requestedGallons" onChange={handleChange} value={formValues.requestedGallons} placeholder="5" required />
                </p>
                <p className="validation-error">{formErrors.requestedGallons}</p>
                <p>
                    <label>Address</label> <br />
                    <input type="text" name="address" value={formValues.address} />
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
                    <input type="text" name="due" onChange={handleChange} value={due} />
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={handleSubmit}>Submit</button>
                </p>
            </form>

        </div>
    )
}