import '../../App.css'

// Example of a data array that
// you might receive from an API
const data = [
    { gallons: 3, address: '2211 Dalphe St, TX, 77054', date: "06-11-2022", price: 120, due: 450 },
    { gallons: 7, address: '1542 Stanford, TX, 77004', date: "04-02-2022", price: 100, due: 300 },
    { gallons: 11, address: '3457 Richmond, CA, 90211', date: "24-03-2022", price: 90, due: 280 },
    { gallons: 14, address: '19 Washington Square N, NY, 10012', date: "22-12-2022", price: 200, due: 950 },
    ]

export default function HistoryPage() {
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