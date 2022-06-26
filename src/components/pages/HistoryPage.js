import '../../App.css'

// Example of a data array that
// you might receive from an API
const data = [
    { gallons: 5, address: '14-2 Night House, California, 234533', date: "02-03-2022", price: 100, due: 500 },
    { gallons: 10, address: '9-2 Downtown, Honkong, 232345', date: "02-06-2022", price: 200, due: 2000 },
    { gallons: 19, address: '09-2 Limbon, Ukraine, 123454', date: "14-07-2022", price: 50, due: 9500 },
    { gallons: 6, address: '55-2 Raspo, Namibia, 324231', date: "18-04-2022", price: 100, due: 600 },
    { gallons: 2, address: '19-1 Chikago, US, 343455', date: "21-01-2022", price: 50, due: 100 },
    { gallons: 15, address: '19-5 Hellas, Canada, 746564', date: "20-10-2022", price: 100, due: 1500 },  
]

export default function HistoryPage() {
    return (
        <div className="text-center m-5-auto">
            <h2>Quote History</h2>
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
                    {data.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{val.gallons}</td>
                                <td>{val.address}</td>
                                <td>{val.date}</td>
                                <td>{val.price}</td>
                                <td>{val.due}</td>
                            </tr>
                        )
                    })}

                </tbody>


            </table>
        </div>
    );
}