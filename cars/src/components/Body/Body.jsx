import React, { useEffect, useState } from 'react'
import './body.css'
import axios from 'axios'
import baseurl from '../../utils/baseUrl'
import Addcar from '../addcar/Addcar'

// ============================================
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};




function Body() {
 
  const [updated,setUpdated]=useState(false)
  // =================EXPORT TO CSV==================

const downloadFile = ({ data, fileName, fileType }) => {
  const blob = new Blob([data], { type: fileType })

  const a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}



const exportToCsv = e => {
  e.preventDefault()

  // Headers for each column
  let headers = ['Name,Segment,Brand,location']

  // Convert users data to a csv
  let usersCsv =data.reduce((acc, user) => {
    const {  name,segment, result1,result2  } = user
    acc.push([ name,segment, result1[0].name, result2[0].name].join(','))
    return acc
  }, [])

  downloadFile({
    data: [...headers, ...usersCsv].join('\n'),
    fileName: 'Carslist.csv',
    fileType: 'text/csv',
  })
}

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`${baseurl}carslist`).then((resp) => {
      console.log("resilt", resp);
      setData(resp.data.carname)
      setUpdated(false)
    })

  }, [updated]

  )
  function deleteCar(id) {
    axios.delete(`${baseurl}deletecar/${id}`).then((resp) => {
   setUpdated(true)

    })
  }
 
// ===========================eEND




  return (
    <>
    <Addcar setUpdated={setUpdated}/>
    <div className="container">
      <h1 className="title">CAR STATUS TABLE</h1>
      <table>
        <thead>
          <tr>
          <th>SEGMENT</th>
            <th>NAME</th>
            <th>BRAND</th>
            <th>LOCATION</th>
            <th>UPDATE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ _id,segment, name, result1, result2 }) => (
            <tr key={_id}>
               <td>
                {
                 segment
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
              <td>
                {result2[0].name}
              </td>
              <td>
                <Updatecarmodal id={_id} seg={segment} name={name} brand={result1[0]._id} location={result2[0]._id} setUpdate={setUpdated} />
              </td>
              <td><button onClick={() => deleteCar(_id)}
              > delete</button>
              </td>


            </tr>

          ))}
        </tbody>
      </table>
      <button type='button' onClick={exportToCsv}>
          Export to CSV
        </button>
    </div>
    </>
  )
}

// Modal to update car===============================
function Updatecarmodal({ id,seg,name,brand,location ,setUpdate}) {
  const [mycarname,setMycarname]=useState(name)
   
    const [brands, setBrands] = useState([])
    const [segment,setSegment]=useState(seg)
    const [locations, setLocations] = useState([])
    const [myCarbrand,setMyCarbrand]=useState(brand)
    const [myCarlocation,setMyCarlocation]=useState(location)



  const [open, setOpen] = React.useState(false);
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
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function handlesubmit(e){
    console.log("han=deeedwed");
    e.preventDefault()
    let mycar={
        name:mycarname,
        brandId:myCarbrand,
        locationId:myCarlocation


    }

    axios.post(`${baseurl}updatecar/${id}`,{mycar}).then(()=>{
      setOpen(false);
      setUpdate(true);
    })
    };

  return (
    <div>
      <Button onClick={handleOpen}>Update Car</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <form onSubmit={handlesubmit} >
          <input value={segment} type="text" onChange={(e) => {
              setSegment(e.target.value)

            }} />
            <input value={mycarname} type="text" onChange={(e) => {
              setMycarname(e.target.value)

            }} />
            <select value={myCarbrand} onChange={(event) => {
              setMyCarbrand(event.target.value)
            }}>
              {brands.map(({ _id, name }) => <option value={_id}>{name}</option>


              )
              }



            </select>
            <select value={myCarlocation} onChange={(event) => {
              setMyCarlocation(event.target.value)
            }}>

              {locations.map(({ _id, name }) => <option value={_id}>{name}</option>


              )
              }


            </select>

            <Button type='submit'> Update</Button>


          </form>
         
        </Box>
      </Modal>
    </div>
  );
}

export default Body