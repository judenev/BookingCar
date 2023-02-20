import { React, useState, use } from 'react'
import './Login.css'
import axios from 'axios'
import baseurl from '../../../utils/baseUrl'
import { useNavigate } from 'react-router-dom'
function Login() {
  const Navigate = useNavigate()
  const [login, setLogin] = useState(false)
  const [mail, setMail] = useState("")
  const [pass, setPass] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault()

    let admin = {
      email: mail,
      password: pass
    }

    await axios.post(`${baseurl}adminlogin`, { admin }).then((response) => {
      // console.log(response);
      let adminData = response
      localStorage.setItem('adminToken',
        JSON.stringify({ adminData }))
        ;
      console.log(localStorage.getItem('adminToken'));
      let data = localStorage.getItem('adminToken')
   
      console.log(JSON.parse(data));
      let k = JSON.parse(data)
      console.log(k.adminData.data.token);
      if (k.adminData.data.token) {
        Navigate('/admin')
        setLogin(true)
        console.log("logged in");
      }
      else {
        setLogin('Not valid')
        console.log("not valid");
  
      }
    })





  }


  return (
    <>
      <div className="login-form-bd">
        <div className="form-wrapper" style={{maxHeight:'70vh'}}>
          <div className="form-container">
            <h1> Please Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label> Email</label>
                <input autoComplete='off' value={mail} onChange={(e) => {
                  setMail(e.target.value)
                }} type="email" required />
              </div>

              <div className="form-control">

                <label> Password</label>
                <input autoComplete='off' value={pass} onChange={(e) => {

                  setPass(e.target.value)

                }} type="password" required />
              </div>
              <button className="login-btn">Login</button>
              {login ?<div>Invalid</div> : ""  }
            

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login