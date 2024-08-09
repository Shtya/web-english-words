import toast  from "react-hot-toast"


export function notification (msg , type ){
  if(type == "success" ){
      toast.success( msg ,{
        position:"top-center",
        duration : 2000 ,
        style:{ background : "black"  , color:"white", width:"fit-content" } })
    }
  else{
      toast.error( msg ,{
        position:"top-center",
        duration : 2000 ,
        style:{ background : "red" , color:"white", width:"fit-content" } })
    }

  }