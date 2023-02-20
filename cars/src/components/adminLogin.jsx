const { useState} = require("react");

import React from 'react'

function adminLogin() {
 

  return (
    <div>
        <form onSubmit={handleSubmit}  >
            <label>Enter your name</label>
            <input value={name} onChange={(e)=>{
                setName(e.target.value)
            }} type="email" />
            <br />
             <label>Password</label>
            <input value={pass} onChange={(e)=>{
                setPass(e.target.value)
            }} type="password" />
        </form>
    </div>
  )
}

export default adminLogin

