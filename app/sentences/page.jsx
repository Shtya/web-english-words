
'use client'

import Skeleton_box from "@/components/Skeleton/Skeleton"
import {  Accordion,  AccordionContent,  AccordionItem,  AccordionTrigger,} from "@/components/ui/accordion"
import { BookOpenCheck, CircleCheckBig, CopyMinus, Edit, SendHorizontal, Trash } from "lucide-react"
import useSWR  from "swr"

import { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react"

import Modal       from "@/components/sentence/Modal"
import ModalDelete from "@/components/sentence/ModalDelete"
import Review from "@/components/sentence/Review"
import Finish from "@/components/sentence/Finish"

import { usePost, usePutProperty } from "@/hooks/CRUD_sentence"
import NotFound from "@/components/NotFound"
import handleTime from "@/utils/handleTime"


export default function Page() {
  const [Word , setWord ] = useState(null)

  //! define the fetcher
  const fetcher = (url) => fetch(url).then(res => res.json())
  const {data  , error } = useSWR('/api/sentence' , fetcher)
  const [filter , setfilter] = useState([])
  const [uniqueDate , setUniqueDate] = useState([])

  useEffect(_=> {
    if(data){
      setfilter(data?.data.filter(e => e.type == ""))
      setUniqueDate([...new Set(data?.data?.map(e => handleTime(e.createdAt)))])
    }
  }, [data])


  //! post 
  const [title_en , setTitle_en] = useState("")
  const [handleSubmitPost] = usePost('/api/sentence' , {title_en , type:""} , setTitle_en )

  //! Edit & Delete
  const handleDelete = ()=>{  document.getElementById('sentence-delete').click()       }
  const handleEdit = ()=>{ document.getElementById('sentence-edit').click()   }

  const [handleSubmit] = usePutProperty()

  const handleCollapse = (selector)=>{
    let div = document.querySelector(selector) ;
      let nextParagraphs = [];
      let sibling = div.nextElementSibling;

      while (sibling && nextParagraphs.length < 10) {
          if (sibling.classList.contains('accordion-content')) {
              nextParagraphs.push(sibling);
          }
          sibling = sibling.nextElementSibling;
      }

      nextParagraphs.forEach(p => p.classList.toggle('hidden1'));
  }
  
  const handleCollapseAll = (selector)=>{

    document.querySelectorAll(selector).forEach((div) => {
          let nextParagraphs = [];
          let sibling = div.nextElementSibling;

          // Collect the next 4 <p> elements
          while (sibling && nextParagraphs.length < 10) {
              if (sibling.classList.contains("accordion-content")) {
                  nextParagraphs.push(sibling);
              }
              sibling = sibling.nextElementSibling;
          }

          // Hide the collected <p> elements
          nextParagraphs.forEach(p => p.classList.toggle('hidden1'));
  });
  }
  
  return (
    
    <main className="home sentence"> 
      <div className="container">
        <div className="textarea">
              <textarea placeholder="Write Your Story" value={title_en} onChange={e=> setTitle_en(e.target.value)} name="" id=""></textarea>
              <SendHorizontal onClick={handleSubmitPost} />
           </div>

          <Accordion type="single" collapsible className="w-full accordion">
            <div className="container" id="container">
              <div className="collapse1"> 
                <div className="label"> <BookOpenCheck         onClick={_=> document.querySelector(".review").classList.add("show")}  /> <h4> Review </h4> </div>
                <div className="label"> <CircleCheckBig        onClick={_=> document.querySelector(".review").classList.add("show2")} /> <h4> Finish </h4> </div>
                <div className="label"> <CopyMinus             onClick={_=> handleCollapseAll(".ten-words")} /> <h4> Collapse </h4> </div>

              </div>
            {
              data?.success == true 
                ?filter?.length >=1 
              
                  ?filter.map((e,i) => (
                    <>
                      {
                        i % 10 == 0 && <div onClick={_ => handleCollapse(`.ten-words${i}`)} className={`ten-words ten-words${i}`}> <span> <p> 10 </p>  sentences </span> <span> {handleTime(e.createdAt)} </span> </div>
                      }

                      <AccordionItem value={`item-${i}`} className={`accordion-content`}>
                        
                          <div className="action">
                            <Trash onClick={_=> {handleDelete() ; setWord(e) }} /> 
                            <Edit onClick={_=> {handleEdit() ; setWord(e) }}/> 
                            <BookOpenCheck onClick={_ => { handleSubmit(`/api/sentence?id=${e._id}` , {type:"review"}) }} />
                          </div> 

                          <AccordionTrigger> sentence {i + 1} </AccordionTrigger>
                          <AccordionContent>  {e.title_en}  </AccordionContent>

                      </AccordionItem> 
                      
                      </>))

                  : <NotFound msg="there are no sentences yet" />
                :  <div className="container skeleton0"> <Skeleton_box /> </div>
            }
          </div>
          
          </Accordion>

          <Modal data={Word} btn_name="sentence-edit" />
          <ModalDelete  data={Word} btn_name="sentence-delete" />

          <div className="review">  
            <Review />
            <Finish />
          </div>
          <Toaster />

    </div>
    </main>
  )
}

