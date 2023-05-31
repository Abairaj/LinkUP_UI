import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import axios from 'axios';
import Cookies from 'js.cookie';
import './explore.scss'


export default function Explore() {
    const API_URL = import.meta.env.VITE_API_URL
    const [explore,setExplore] = useState([])
    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = ()=>{
        axios.get(`${API_URL}/post/all_posts`,{headers:{Authorization:`Bearer ${Cookies.get("token")}`}}).then(response=>{
            setExplore(response.data.data)
            console.log(response.data)
        }).catch(error=>{
            alert(error)
        })
    }
  return (
    <div className='explore'>
       <Post post={explore} />
    </div>
  )
}
