'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { usePost } from "@/hooks/CRUD_home";
import { useState } from "react";



export default function ModalAdd({btn_name}) {
    const [body , setBody] = useState({title_ar :"" , title_en:"" })
    
    //! onChange
    const handleChange = (e)=>{
        const {value , name} = e.target
        setBody({...body , [name] : value })
    }

    //! Submit
    const [handleSubmit] = usePost('/api/word' , {type:"" , ...body} , setBody , btn_name )

  return (
    <Dialog  >
      <DialogTrigger asChild>
        <Button id={btn_name} style={{display:"none"}} variant="outline">Edit Profile</Button>
      </DialogTrigger>
      
      <DialogContent className="model-content" >
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
