import {React,useState,useEffect} from 'react'
import Body from '../../Body/Body'
import Header from '../../header/Header'
import './Home.css'
import axios from'axios'
import baseurl from '../../../utils/baseUrl'
import Addcar from '../../addcar/Addcar'

function Home() {
 
  return (
    <>
    <Header/>
    
   
     <Body/>

    </>
  )
}

export default Home