'use client'
import { BookmarkCheck, BookOpenCheck, CircleCheckBig, HousePlus, X } from 'lucide-react'


import Skeleton_box from "@/components/Skeleton/Skeleton"
import {  Accordion,  AccordionContent,  AccordionItem,  AccordionTrigger,} from "@/components/ui/accordion"
import useSWR  from "swr"
import { Edit, Star, Trash } from "lucide-react"

import { useEffect, useState } from "react"

import Modal       from "@/components/home/Modal"
import ModalDelete from "@/components/home/ModalDelete"
import { usePutProperty } from '@/hooks/CRUD_home'
import NotFound from '../NotFound'

const Review = () => {

    const [Word , setWord ] = useState(null)

    //! define the fetcher
    const fetcher = (url) => fetch(url).then(res => res.json())
    const {data , error } = useSWR('/api/word' , fetcher)
    const [filter , setfilter] = useState([])
  
  useEffect(_=> {
    if(data){
      setfilter(data?.data?.filter(e => e.type == 'review'))
    }
  }, [data])

  
  
    //! Edit & Delete
    const handleDelete = ()=>{  document.getElementById('home-delete').click()       }
    const handleEdit = ()=>{ document.getElementById('home-edit').click()   }

    const [handleSubmit] = usePutProperty()


  return (
    <div className='review-component review-component-diff'>
        <div className="head">
            <h2> Review Words </h2>
            <X onClick={_=> document.querySelector(".review").classList.remove("show")} />
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
                      <HousePlus onClick={_ => { handleSubmit(`/api/word?id=${e._id}` , {type:""}) }} />
                      <CircleCheckBig onClick={_ => { handleSubmit(`/api/word?id=${e._id}` , {type:"finish"}) }} />
                    </div> 

                    <AccordionTrigger> {e.title_en} </AccordionTrigger>
                    <AccordionContent>  {e.title_ar}  </AccordionContent>
                    
                </AccordionItem> ))

            : <NotFound msg="there are no words yet" />
          :  <div className="container skeleton0"> <Skeleton_box /> </div>
      }
    </div>
    
    </Accordion>

    <Modal data={Word} btn_name="home-edit" />
    <ModalDelete  data={Word} btn_name="home-delete" />


    </div>
  )
}

export default Review