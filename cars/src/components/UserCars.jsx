import React, { useEffect, useState } from 'react'

import axios from 'axios'
import baseurl from '../utils/baseUrl'


// ============================================

import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';

import ReactDOM from 'react-dom';
function UserCars() {
    const Navigate = useNavigate()
    const [updated, setUpdated] = useState(false)
    // =================EXPORT TO CSV==================

    const [mycarname, setMycarname] = useState('')
    const [myCardate, setMyCardate] = useState("");
    const [brands, setBrands] = useState([])
    const [locations, setLocations] = useState([])
    const [myCarbrand, setMyCarbrand] = useState('')
    const [myCarlocation, setMyCarlocation] = useState('')

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`${baseurl}carslist`).then((resp) => {
            console.log("resilt", resp);
            let que = []
            resp.data.carname.map((item)=>{
             let booked =false
             for (let index = 0; index < item.Bookings.length; index++) {
                if (item.Bookings[index].date === myCardate && item.Booking[index].location === myCarlocation) {
                    booked =true
                    break

                }

            }
            item.booked =booked
            que.push(item)
            })
           

            setData(que)
            setUpdated(true)
        })

    }, []
    )
    useEffect(() => {
        axios.get(`${baseurl}brandslist`).then((resp) => {
            console.log("resilt", resp);
            setBrands(resp.data.brands)


        })
        axios.get(`${baseurl}locationlist`).then((resp) => {
            console.log("resilt", resp);
            setLocations(resp.data.location)


        })

    }, []

    )
    function bookcar(id) {
        console.log(myCardate,myCarlocation);
        axios.post(`${baseurl}bookcar/${id}`,{myCardate,myCarlocation}).then((resp) => {
            setUpdated(true)
        alert("Car booked")
        })
    }

    function handlesubmit(e) {
        e.preventDefault()
        axios.get(`${baseurl}carslist`).then((resp) => {
            console.log("resilt", resp);
            let que = resp.data.carname.filter((item) => {
                console.log("helli",item);
                for (let index = 0; index < item.Bookings.length; index++) {
                    if (item.Bookings[index].date === myCardate && item.Bookings[index].location === myCarlocation) {
                        return false

                    }

                }
                return true
            })
            console.log(que);
            setData(que)
            setUpdated(true)
        })

    }



    return (
        <>
            <form onSubmit={handlesubmit} className="addcar" >
              
              
                <select  value={myCarlocation} onChange={(event) => {
                    setMyCarlocation(event.target.value)
                }}>

                    {locations.map(({ _id, name }) => <option value={_id}>{name}</option>


                    )
                    }


                </select>
                <TextField
                    id="date"
                    label="Boooking date"
                    type="date"
                    required pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) => {
                        console.log(e.target.value)
                        setMyCardate(e.target.value)

                    }}
                    value={myCardate}
                    defaultValue="2017-05-24"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <button
                    className='buttonadd' type='submit'>Search</button>


            </form>

            <div className="container">
                <h1 className="title">CAR STATUS TABLE</h1>
                <table>
                    <thead>
                        <tr>
                            <th>SEGMENT</th>
                            <th>
                                NAME
                            </th>
                            <th>BRAND</th>
                            <th>BOOKING STATUS</th>
                            <th>BOOK NOW</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map(({ _id, name, result1,  booked }) => (
                            <tr key={_id}>
                                <td>
                                    {
                                        "SEDAN"
                                    }

                                </td>
                                <td>
                                    {
                                        name
                                    }

                                </td>
                                <td>
                                    {result1[0].name}
                                </td>


                                <td>{booked ? "Booked" : "Available"}</td>
                                <td><button onClick={() => bookcar(_id)}
                                > BookCar</button>
                                </td>



                            </tr>

                        ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default UserCars