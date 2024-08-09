'use client'
import { notification } from "@/utils/notification";
import axios from "axios";
import { useEffect, useState } from "react";
import {mutate} from 'swr'


export const usePost =  (url , body , setTitle_en ) => {

  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post(url , body).then(res => {
      mutate("/api/sentence")
      setTitle_en("")
    })

    notification('The sentence has successfully added' , 'success')
  } 
    return [handleSubmit ]
}



export const useGet = (url , type) => {
  const [load , setLoad ] = useState(true)
  const [data , setData ] = useState([]) ;

    useEffect(_=> {
      axios.get(url).then(res =>{
        setData(res.data.data)
        setLoad(false)
      } )
    } ,[])    
    return [ load , data]
  };




export const usePut =  (url , body , id_btn) => {

  const handleSubmit = ()=>{
    axios.put(url , body)
      .then(res => mutate("/api/sentence") )
    notification('The sentence has successfully updated' , 'success')
    document?.getElementById(id_btn)?.click()
  } 
  
  return [handleSubmit ]
}


export const usePutProperty =  () => {

  const handleSubmit = (url , body )=>{
      axios.put(url , body)
      .then(res => { 
        mutate("/api/sentence")
        notification('The sentence has successfully updated' , 'success')
        })
  } 
  return [handleSubmit ]
}


export const useDelete =  (url , id_btn ) => {
  const handleSubmit = (e)=>{
    e.preventDefault() ;

      axios.delete(url )
      .then(res => {
        mutate("/api/sentence")
        notification('The sentence has successfully deleted' , 'success')
        document?.getElementById(id_btn)?.click()
        })
    } 
  
    return [handleSubmit ]
}