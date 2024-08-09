'use client'
import { usePut } from "@/hooks/CRUD_home";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";


export default function Modal ({data , btn_name}) {

    const [body , setBody] = useState({title_ar :"" , title_en:"" })

    //! post data in inputs 
    useEffect(_=> setBody({title_ar:data?.title_ar , title_en : data?.title_en }) ,[data])
    
    //! onChange
    const handleChange = (e)=>{
        const {value , name} = e.target
        setBody({...body , [name] : value })
    }

    //! onSubmit
    const [handleSubmit ] = usePut('/api/word?id='+data?._id , body , btn_name)

  return ( 
    <Dialog >
        <DialogTrigger asChild>
            <Button id={btn_name} style={{display:"none"}} variant="outline">Edit the word</Button>
        </DialogTrigger>
        
      
        <DialogContent Description="desc"  className="model-content" >
            <DialogHeader> <DialogTitle className="title" >Edit the word</DialogTitle>  </DialogHeader>
            <form onSubmit={e => e.preventDefault()}>
                <input  name="title_en" placeholder="the word in english"  value={body.title_en} onChange={handleChange} />
                <input  name="title_ar" placeholder="الكلمة بالعربيه"  value={body.title_ar} onChange={handleChange} />
                <button className="btn1" onClick={handleSubmit} > Send </button>
            </form>
        </DialogContent>
    </Dialog>
  );
}
