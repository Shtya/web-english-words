
'use client'

import Skeleton_box from "@/components/Skeleton/Skeleton"
import {  Accordion,  AccordionContent,  AccordionItem,  AccordionTrigger,} from "@/components/ui/accordion"
// import ModalEdit from "./writing/ModalEdit"
// import { ModalDelete } from "./writing/ModalDelete"
import useSWR  from "swr"
import { Edit, Star, Trash } from "lucide-react"

import { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react"

import Modal       from "@/components/home/Modal"
import ModalDelete from "@/components/home/ModalDelete"
import ModalAdd    from "@/components/home/ModalAdd"
import Review from "@/components/home/Review"
import { usePutProperty } from "@/hooks/CRUD_home"
import NotFound from "@/components/NotFound"
import handleTime from "@/utils/handleTime"
import Finish from "@/components/home/Finish"


export default function page() {
  const [Word , setWord ] = useState(null)

  //! define the fetcher
  const fetcher = (url) => fetch(url).then(res => res.json())
  const {data  , error } = useSWR('/api/word' , fetcher)
  const [filter , setfilter] = useState([])
  const [uniqueDate , setUniqueDate] = useState([])

  useEffect(_=> {
    if(data){
      setfilter(data?.data?.filter(e => e.type == ''))
      setUniqueDate([...new Set(data?.data?.map(e => handleTime(e.createdAt)))])
    }
  }, [data])


  //! Edit & Delete
  const handleDelete = ()=>{  document.getElementById('home-delete').click()       }
  const handleEdit = ()=>{ document.getElementById('home-edit').click()   }

  const [handleSubmit] = usePutProperty()

  return (
    <main className="home"> 
    <Accordion type="single" collapsible className="w-full accordion">
      <div className="container" id="container">
      {
        data?.success == true 
          ?filter?.length >=1 
        
            ?filter.map((e,i) => (
              <>
                {
                  i % 10 == 0 && <div className={"ten-words ten-words"+(i+10)}> <span> <p> {i + 10}</p>  words </span> <span> {handleTime(e.createdAt)} </span> </div>
                }

                <AccordionItem value={`item-${i}`} className={`accordion-content `}>
                  
                    <div className="action">
                      <Trash onClick={_=> {handleDelete() ; setWord(e) }} /> 
                      <Edit onClick={_=> {handleEdit() ; setWord(e) }}/> 
                      <Star onClick={_ => { handleSubmit(`/api/word?id=${e._id}` , {type:"review"}) }} />
                    </div> 

                    <AccordionTrigger> {e.title_en} </AccordionTrigger>
                    <AccordionContent>  {e.title_ar}  </AccordionContent>

                </AccordionItem> 
                
                </>))

            : <NotFound msg="there are no words yet" />
          :  <div className="container skeleton0"> <Skeleton_box /> </div>
      }
    </div>
    
    </Accordion>

    <Modal data={Word} btn_name="home-edit" />
    <ModalDelete  data={Word} btn_name="home-delete" />
    <ModalAdd btn_name="home-add" />


    <div className="review">  
      <span onClick={_=> document.querySelector(".review").classList.add("show")}> review </span>
      <span onClick={_=> document.querySelector(".review").classList.add("show2")}> Finish </span>
      <Review />
      <Finish />
    </div>
    <Toaster />
    </main>
  )
}

