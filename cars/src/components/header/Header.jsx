import React from 'react'
import './Header.css'
function Header() {

  return (
    <>

<div className="headerParentDiv">
      <div className="headerChildDiv">
        <div  onClick={()=>{
          
          }} className="brandName">
        
         
        </div>
        <div className="placeSearch">
         
          <input type="text" />
        
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
          
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
        
        </div>
    
        <div className="loginPage">
          <span >Login </span>
          <hr />
        </div>
        <span className="sellMenu"  onClick={()=>{
           
         
          }}></span>

        <div className="sellMenu">
          
          <div className="sellMenuContent">
           
            <span onClick={()=>{
             
            }}>SELL</span>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default Header