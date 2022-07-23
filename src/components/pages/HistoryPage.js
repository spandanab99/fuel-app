import '../../App.css'
import React, { useState, useEffect } from 'react';
import moment from 'moment';

// Example of a data array that
// you might receive from an API


export default function HistoryPage() {
    const [data,setData] = useState([{}]);
    const getData = async () => {
        try {
            let res = await fetch('http://localhost:8000/quote/history', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-token': localStorage.getItem('x-token')
                },
            })
            let resJson = await res.json();
            let data = resJson.data;
            setData(data);

            
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getData();
    },[])
    return (
        <div className="text-center m-5-auto">
            <h1>Quote History</h1>
            <table className="quotes">
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Gallons Requested</th>
                        <th>Delivery Address</th>
                        <th>Delivery Date</th>
                        <th>Suggested Price per Gallon</th>
                        <th>Total Amount Due</th>

                    </tr>
                </thead>
                <tbody>
                    {[...data].reverse().map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{val.requestedGallons}</td>
                                <td>{val.deliveryAddress}</td>
                                <td>{moment.utc(val.deliveryDate).format('MM-DD-YYYY')}</td>
                                <td>{val.suggestedPrice}</td>
                                <td>{val.totalDue}</td>
                            </tr>
                        )
                    })}

                </tbody>


            </table>
        </div>
    );
}