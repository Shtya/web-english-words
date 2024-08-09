'use client'
import { BookOpenCheck, X } from 'lucide-react'


import Skeleton_box from "@/components/Skeleton/Skeleton"
import {  Accordion,  AccordionContent,  AccordionItem,  AccordionTrigger,} from "@/components/ui/accordion"
import useSWR  from "swr"
import { Edit,Trash } from "lucide-react"

import { useEffect, useState } from "react"

import Modal       from "@/components/sentence/Modal"
import ModalDelete from "@/components/sentence/ModalDelete"
import { usePutProperty } from '@/hooks/CRUD_sentence'
import NotFound from '../NotFound'

const Finish = () => {

    const [Word , setWord ] = useState(null)

    //! define the fetcher
    const fetcher = (url) => fetch(url).then(res => res.json())
    const {data , error } = useSWR('/api/word' , fetcher)
    const [filter , setfilter] = useState([])
  
  useEffect(_=> {
    if(data){
      setfilter(data?.data?.filter(e => e.type == 'finish'))
    }
  }, [data])

  
  
    //! Edit & Delete
    const handleDelete = ()=>{  document.getElementById('sentence-delete').click()       }
    const handleEdit = ()=>{ document.getElementById('sentence-edit').click()   }

    const [handleSubmit] = usePutProperty()


  return (
    <div className='review-component finish-component'>
        <div className="head">
            <h2> Finish Words </h2>
            <X onClick={_=> document.querySelector(".review").classList.remove("show2")} />
        </div>

        <Accordion type="single" collapsible className="w-full accordion">
      <div className="container">
      {
        data?.success == true 
          ?filter?.length >=1 

            ?filter.map((e,i) => (
                <AccordionItem value={`item-${i}`} className="accordion-content">

                    <div className="action">
                      <Trash onClick={_=> {handleDelete() ; setWord(e) }} /> 
                      <Edit onClick={_=> {handleEdit() ; setWord(e) }}/> 
                      <BookOpenCheck onClick={_ => { handleSubmit(`/api/sentence?id=${e._id}` , {type:""}) }} />
                    </div> 

                    <AccordionTrigger> {e.title_en} </AccordionTrigger>
                    <AccordionContent>  {e.title_ar}  </AccordionContent>
                    
                </AccordionItem> ))

            : <NotFound msg="there are no sentences yet" />
          :  <div className="container skeleton0"> <Skeleton_box /> </div>
      }
    </div>
    
    </Accordion>

    <Modal data={Word} btn_name="sentence-edit" />
    <ModalDelete  data={Word} btn_name="sentence-delete" />


    </div>
  )
}

export default Finish