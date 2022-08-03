import React, { useState, useEffect } from 'react'
import '../../App.css'

export default function QuotePage() {

    const date = new Date();
    const defaultDate = date.toLocaleDateString('en-CA');
    const initialValues = { requestedGallons: null, deliveryAddress: "", suggestedPrice: null, due: null,deliveryDate:defaultDate };
    const [due, setDue] = useState(null);
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState({ value: "", hide: true, error: false });

    const submitData = async (route) => {
        try {
            let res = await fetch(`http://localhost:8000/${route}`, {

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-token': localStorage.getItem('x-token')
                },
                method: "POST",
                body: JSON.stringify({
                    requestedGallons: Number(formValues.requestedGallons),
                    deliveryDate: formValues.deliveryDate,
                }),
            })
            let resJson = await res.json();
            let data = resJson.data;

            if (res.status === 200) {
                let hideMessage = route == "quote" ? false : true;
                setMessage({ value: "Quote submitted Successfully!", hide: hideMessage, error: false });
                if (Object.getOwnPropertyNames(data).length !== 0) {
                    setFormValues({...formValues,suggestedPrice:data.suggestedPrice});
                    setDue(data.totalDue);
    
                }
            } else {
                setMessage({ value: resJson.message, hide: false, error: true });
            }
            

        }
        catch (err) {
            console.log(err);
        }
    }

    const getProfile = async () => {
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
            setFormValues({...formValues,deliveryAddress:data.address1});            

        }
        catch (err) {
            console.log(err);
        }
    }



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        // setDue(formValues.requestedGallons * formValues.suggestedPrice);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitData('quote');
        setFormErrors(validate(formValues));
        if (Object.keys(formErrors).length !== 0) {
            return false;
        }
        setIsSubmit(true);
    };

    const handleGetQuote = (e) => {
        e.preventDefault();
        submitData('quote/get-quote');
        setFormErrors(validate(formValues));
        if (Object.keys(formErrors).length !== 0) {
            return false;
        }
        setIsSubmit(true);
    };

    useEffect(()=>{
        getProfile();
    },[])

    

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
        return errors;
    };

    return (
        <div className="quote text-center m-5-auto">
            <h1>Get Quote</h1>
            <form action="">
                    {!message.hide ? (<div class={!message.error ? "alert alert-success" : "alert alert-danger"} role="alert">
                        {message.value}
                    </div>) : null}
                <p>
                    <label>Gallons Required</label><br />
                    <input type="number" name="requestedGallons" onChange={handleChange} value={formValues.requestedGallons} placeholder="5" required />
                </p>
                <p className="validation-error">{formErrors.requestedGallons}</p>
                <p>
                    <label>Address</label> <br />
                    <input type="text" name="deliveryAddress" value={formValues.deliveryAddress} />
                </p>
                <p>
                    <label>Delivery Date</label><br />
                    <input type="date" name="deliveryDate" value={formValues.deliveryDate} onChange={handleChange} defaultValue={defaultDate} required />
                </p>
                <p className="validation-error">{formErrors.deliveryDate}</p>
                
                <p>
                    <button id="sub_btn" type="submit" disabled={!formValues.requestedGallons} onClick={handleGetQuote}>Get Quote</button>
                </p>
                <p>
                    <button id="sub_btn" type="submit" disabled={!formValues.requestedGallons} onClick={handleSubmit}>Submit</button>
                </p>

                <hr/>

                <p>
                    <label>Suggested Price</label><br />
                    <input type="text" name="price" value={formValues.suggestedPrice} />
                </p>

                <p>
                    <label>Total Amount Due</label><br />
                    <input type="text" name="due"  value={due} />
                </p>
            </form>

        </div>
    )
}