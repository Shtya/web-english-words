
'use client'

import Skeleton_box from "@/components/Skeleton/Skeleton"
import {  Accordion,  AccordionContent,  AccordionItem,  AccordionTrigger,} from "@/components/ui/accordion"

import useSWR  from "swr"
import { Edit , Trash } from "lucide-react"

import { Toaster } from "react-hot-toast"
import { useState } from "react"

import Modal       from "@/components/sentence/Modal"
import ModalDelete from "@/components/sentence/ModalDelete"
import { usePost } from "@/hooks/CRUD_sentences"


export default function page() {
  const [Word , setWord ] = useState(null)

  //! define the fetcher
  const fetcher = (url) => fetch(url).then(res => res.json())
  const {data , error } = useSWR('/api/sentence' , fetcher)

  //! handleChange 
  const [title_en , setTitle_en] = useState()
  const [handleSubmit] = usePost('/api/sentence' , {title_en , type:"new"} ,setTitle_en )
  //! Edit & Delete
  const handleDelete = ()=>{  document.getElementById('home-delete').click()       }
  const handleEdit = ()=>{ document.getElementById('home-edit').click()   }


  return (
    <main className="sentences home"> 
    <div className="container">
      <div className="textarea">
          <textarea value={title_en} onChange={e=> setTitle_en(e.target.value)} name="" id=""></textarea>
          <button type="button" onClick={handleSubmit} className="btn1"> Add </button>
      </div>


    <Accordion type="single" collapsible className="w-full accordion">
      <div className="container">
      {
        data?.success == true 
          ?data?.data?.length >=1 

            ?data.data.map((e,i) => (
                <AccordionItem value={`item-${i}`} className="accordion-content">

                    <div className="action">
                      <Trash onClick={_=> {handleDelete() ; setWord(e) }} /> 
                      <Edit onClick={_=> {handleEdit() ; setWord(e) }}/> 
                    </div> 

                    <AccordionTrigger> sentence {i+1} </AccordionTrigger>
                    <AccordionContent>  {e.title_en}  </AccordionContent>
                    
                    

                    {/* <ModalEdit story={e} />
                    <ModalDelete story={e} /> */}

                </AccordionItem> ))

            : <h1> not found stories</h1>
          :  <div className="container skeleton0"> <Skeleton_box /> </div>
      }
    </div>
    
    </Accordion>

    <Modal data={Word} btn_name="home-edit" />
    <ModalDelete  data={Word} btn_name="home-delete" />
    <Toaster />
    </div>
    </main>
  )
}

