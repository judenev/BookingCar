import React, { useEffect, useState } from 'react'
import axios from 'axios';
import baseurl from '../../utils/baseUrl';
import './addcar.css'
import { useNavigate } from 'react-router-dom'


function Addcar({setUpdated}) {
    const Navigate =useNavigate()

    const [mycarname,setMycarname]=useState('')
    const [myCar, setMyCar] = useState("");
    const [brands, setBrands] = useState([])
    const [locations, setLocations] = useState([])
    const [myCarbrand,setMyCarbrand]=useState('')
    const [myCarlocation,setMyCarlocation]=useState('')
    const[mycarnameseg,setMycarnameseg] =useState('')
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

   function handlesubmit(e){

    e.preventDefault()
   
    let mycar={
        segment:mycarnameseg,
        name:mycarname,
        brandId:myCarbrand,
        locationId:myCarlocation


    }

    axios.post(`${baseurl}addcar`,{mycar}).then((resp)=>{
       
    setUpdated(true)
    })

    };

    return (


        <>

        <h1>TO ADD A CAR</h1>
            <form  onSubmit={handlesubmit} className="addcar" >
                <input value={mycarname} placeholder="Enter a Car to Add" type="text" onChange={(e)=>{
                    setMycarname(e.target.value)
                        
                }} required />
                 <input  value={mycarnameseg} placeholder="Enter a Segment to Add" type="text" onChange={(e)=>{
                    setMycarnameseg(e.target.value)
                        
                }} required />
                <select className='select' value={myCarbrand} onChange={(event) => {
                    setMyCarbrand(event.target.value)
                }}>
                    {brands.map(({ _id, name }) => <option value={_id}>{name}</option>


                    )
                    }



                </select>
                <select className='select' value={myCarlocation} onChange={(event) => {
                    setMyCarlocation(event.target.value)
                }}>

                    {locations.map(({ _id, name }) => <option value={_id}>{name}</option>


                    )
                    }


                </select>

                <button 
                   className='buttonadd' type='submit'>Addcar</button>


            </form>
            
            </>

    )
}

export default Addcar