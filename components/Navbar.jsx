"use client"
import Link from 'next/link'
import React, {  useEffect , useRef } from 'react'
import {usePathname, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';



const Navbar = () => {

  const ul_ref = useRef(null)
  const container_ref = useRef(null )
  const pathname = usePathname()


  const handleOpen = ()=>{
    document.querySelector(".open-close").classList.toggle("active")
    ul_ref.current.classList.toggle("active-inner")
    document.querySelector("nav").classList.toggle("fixed")
  }

  useEffect(_=> {
    //! close menu when click on any element
    let li = document.querySelectorAll("nav .inner ul li a")
    li.forEach(ele =>{
      ele.addEventListener("click" , function(e){
        li.forEach(lis => lis.classList.remove("active"))
        ele.classList.add("active")
        document.querySelector(".open-close").classList.remove("active")
        ul_ref.current.classList.remove("active-inner")
        document.querySelector("nav").classList.remove("fixed")
      })
    })

    //! shrink height when scroll down 
    window.addEventListener('scroll', function() {
      if (window.scrollY > 3) container_ref.current?.classList.add('shrink');
      else container_ref.current?.classList.remove('shrink');
      });

  } ,[])

  const router = useRouter()
  const handleWords = async()=>{
    await router.push("/")
    if(document.getElementById("home-add"))
      document.getElementById("home-add").click()
  }

  return (
    <nav>
      <div ref={container_ref} className="container">
        
        <Link href='/' className="logo">  <span> Home </span> </Link>

        <div className="inner" ref={ul_ref} >

            <ul className='main-ul'>
            <li onClick={handleWords} > <Link className={pathname == '/' ? "active" : ""} href='/'> Word <Plus /> </Link> </li>
            <li > <Link className={pathname == '/sentences' ? "active" : ""} href='/sentences'> sentences <Plus /> </Link> </li>

              {/* <li className='dropdown'> 
                  <Link className={pathname == "/sentences" ? "active" : ""} href='/sentences'> sentences </Link> 
                  <ul className="drop-content">
                    <li> <Link href='/words/hard'> Hard </Link> </li>
                    <li> <Link href='/words/medium'> Medium </Link> </li>
                    <li> <Link href='/words/easy'> easy </Link> </li>
                    <li> <Link href='/words/know'> Know </Link> </li>
                  </ul>
              </li> */}

              <li > <Link className={pathname == '/practice' ? "active" : ""} href='/practice'> Practice </Link> </li>

            </ul>
            
      </div>
        

        <div className="open-close" onClick={handleOpen}> <span></span> <span></span> <span></span> </div>
      </div>
    </nav>
  )
}

export default Navbar






