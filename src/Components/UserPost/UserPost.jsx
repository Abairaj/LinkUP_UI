import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'
import axios, { all } from 'axios'
import Cookies from 'js.cookie'

export default function UserPost() {
    const [allPost,setAllPost] = useState([])
    const API_URL = import.meta.env.VITE_API_URL

    useEffect(()=>{
        fetchAllPost();

    },[])

    const fetchAllPost = ()=>{
        axios.get(`${API_URL}/post/all_posts/`,{headers:{Authorization:`Bearer ${Cookies.get("token")}`}}).then((response)=>{
            if(response){
                setAllPost(response.data.data)
            }
    
        }).catch(error=>{
            alert(error)
        })
    }
  return (
<>
<Post post={allPost}/>
</>
  )
}
